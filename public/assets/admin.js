import { ApiError, apiRequest, checkServer, displayError, formatDate, language, normalizeServerAddress, t, applyLanguage, toggleLanguage } from './common.js';

const $ = (selector) => document.querySelector(selector);
const state = { server: '', key: '', name: '', socket: null, seenMessages: new Set() };
const serverStorageKey = 'intranest.serverUrl';
const keyStorageKey = 'intranest.accessKey';
const nameStorageKey = 'intranest.displayName';

applyLanguage();
$('[data-language-toggle]').addEventListener('click', toggleLanguage);
$('#server-address').value = localStorage.getItem(serverStorageKey) || '';
$('#display-name').value = localStorage.getItem(nameStorageKey) || '';
$('#chat-name').value = localStorage.getItem(nameStorageKey) || t('admin.name.placeholder');

function setConnectStatus(message, kind = '') {
  const status = $('#connect-status');
  status.textContent = message;
  status.className = 'form-status' + (kind ? ' is-' + kind : '');
}

function setButtonBusy(button, busy, key) {
  button.disabled = busy;
  const label = button.querySelector('[data-i18n]') || button;
  label.textContent = busy ? t('admin.checking') : t(key);
}

function setConnected(server, key, name) {
  state.server = server;
  state.key = key;
  state.name = name;
  $('#connect-panel').hidden = true;
  $('#workspace').hidden = false;
  $('#server-label').textContent = new URL(server).host;
  $('#connected-address').textContent = server;
  renderConnectionIndicator(true);
  $('#chat-name').value = name;
  loadWorkspace();
}

function renderConnectionIndicator(connected) {
  const indicator = $('#connection-indicator');
  const dot = document.createElement('span');
  dot.className = 'status-dot' + (connected ? '' : ' status-dot-muted');
  dot.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.dataset.i18n = connected ? 'admin.online' : 'admin.tag';
  label.textContent = t(label.dataset.i18n);
  indicator.replaceChildren(dot, label);
}

function showConnect(message = '') {
  state.server = '';
  state.key = '';
  if (state.socket) {
    state.socket.close();
    state.socket = null;
  }
  $('#workspace').hidden = true;
  $('#connect-panel').hidden = false;
  renderConnectionIndicator(false);
  if (message) setConnectStatus(message, 'error');
}

$('#connect-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = $('#connect-button');
  setButtonBusy(button, true, 'admin.connect');
  setConnectStatus('');
  try {
    const server = normalizeServerAddress($('#server-address').value);
    const key = $('#access-key').value.trim();
    const name = $('#display-name').value.trim() || t('admin.name.placeholder');
    if (!key) throw new Error('bad_key');
    await checkServer(server, key);
    localStorage.setItem(serverStorageKey, server);
    localStorage.setItem(nameStorageKey, name);
    sessionStorage.setItem(keyStorageKey, key);
    setConnected(server, key, name);
  } catch (error) {
    if (error?.code === 'bad_key') setConnectStatus(t('admin.badKey'), 'error');
    else setConnectStatus(displayError(error), 'error');
  } finally {
    setButtonBusy(button, false, 'admin.connect');
  }
});

$('#disconnect-button').addEventListener('click', () => {
  sessionStorage.removeItem(keyStorageKey);
  $('#access-key').value = '';
  showConnect();
});

$('#show-link-form').addEventListener('click', () => {
  $('#link-form').hidden = false;
  $('#link-title').focus();
});
$('#cancel-link-form').addEventListener('click', () => {
  $('#link-form').reset();
  $('#link-form').hidden = true;
  $('#link-status').textContent = '';
});
$('#link-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  try {
    const payload = { title: $('#link-title').value.trim(), url: $('#link-url').value.trim() };
    await apiRequest(state.server, state.key, '/links', { method: 'POST', body: JSON.stringify(payload) });
    $('#link-form').reset();
    $('#link-form').hidden = true;
    $('#link-status').textContent = '';
    await loadLinks();
    toast(t('links.saved'));
  } catch (error) {
    $('#link-status').textContent = displayError(error);
  } finally {
    button.disabled = false;
  }
});

function createIcon(name) {
  const icon = document.createElement('span');
  icon.className = 'icon icon-' + name;
  icon.setAttribute('aria-hidden', 'true');
  return icon;
}

function addLinkRow(link) {
  const row = document.createElement('article');
  row.className = 'managed-row';
  const text = document.createElement('div');
  text.className = 'managed-copy';
  const title = document.createElement('a');
  title.className = 'managed-title';
  title.href = link.url;
  title.target = '_blank';
  title.rel = 'noreferrer';
  title.textContent = link.title;
  const address = document.createElement('span');
  address.className = 'managed-subtitle';
  try { address.textContent = new URL(link.url).host; } catch { address.textContent = link.url; }
  text.append(title, address);
  const remove = document.createElement('button');
  remove.className = 'icon-button danger-button';
  remove.type = 'button';
  remove.setAttribute('aria-label', t('links.delete'));
  remove.title = t('links.delete');
  remove.append(createIcon('trash'));
  remove.addEventListener('click', async () => {
    if (!window.confirm(t('common.removeConfirm'))) return;
    remove.disabled = true;
    try {
      await apiRequest(state.server, state.key, '/links/' + encodeURIComponent(link.id), { method: 'DELETE' });
      await loadLinks();
      toast(t('links.deleted'));
    } catch (error) {
      toast(displayError(error), true);
      remove.disabled = false;
    }
  });
  row.append(text, remove);
  return row;
}

async function loadLinks() {
  const list = $('#links-list');
  list.replaceChildren();
  try {
    const links = await apiRequest(state.server, state.key, '/links');
    $('#links-empty').hidden = links.length > 0;
    for (const link of links) list.append(addLinkRow(link));
  } catch (error) {
    toast(displayError(error), true);
  }
}

function renderMessage(message, prepend = false, scrollToLatest = true) {
  if (state.seenMessages.has(message.id)) return;
  state.seenMessages.add(message.id);
  const empty = $('#chat-log').querySelector('.empty-state');
  if (empty) empty.remove();
  const entry = document.createElement('article');
  entry.className = 'chat-message';
  entry.dataset.messageId = message.id;
  const meta = document.createElement('div');
  meta.className = 'chat-message-meta';
  const author = document.createElement('strong');
  author.textContent = message.author;
  const date = document.createElement('time');
  date.dateTime = message.createdAt;
  date.textContent = formatDate(message.createdAt);
  meta.append(author, date);
  const content = document.createElement('p');
  content.textContent = message.content;
  entry.append(meta, content);
  const log = $('#chat-log');
  if (prepend) log.prepend(entry);
  else log.append(entry);
  if (scrollToLatest && !prepend) log.scrollTop = log.scrollHeight;
}

async function loadMessages() {
  try {
    const messages = await apiRequest(state.server, state.key, '/messages?limit=100');
    state.seenMessages.clear();
    $('#chat-log').replaceChildren();
    if (!messages.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = t('chat.empty');
      $('#chat-log').append(empty);
    }
    messages.forEach((message) => renderMessage(message));
    $('#load-older-messages').hidden = messages.length < 100;
  } catch (error) {
    $('#chat-status').textContent = displayError(error);
  }
}

$('#load-older-messages').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const firstMessage = $('#chat-log .chat-message');
  if (!firstMessage) return;
  button.disabled = true;
  const log = $('#chat-log');
  const previousHeight = log.scrollHeight;
  const previousTop = log.scrollTop;
  try {
    const older = await apiRequest(state.server, state.key, '/messages?limit=100&before=' + encodeURIComponent(firstMessage.dataset.messageId));
    for (const message of [...older].reverse()) renderMessage(message, true, false);
    if (older.length) log.scrollTop = previousTop + log.scrollHeight - previousHeight;
    button.hidden = older.length < 100;
  } catch (error) {
    $('#chat-status').textContent = displayError(error);
  } finally {
    button.disabled = false;
  }
});

async function openChatSocket() {
  if (!state.server || state.socket?.readyState === WebSocket.OPEN || state.socket?.readyState === WebSocket.CONNECTING) return;
  try {
    const result = await apiRequest(state.server, state.key, '/chat/ticket', { method: 'POST' });
    const target = new URL(state.server);
    target.protocol = target.protocol === 'https:' ? 'wss:' : 'ws:';
    target.pathname = '/api/v1/chat/ws';
    target.search = '?ticket=' + encodeURIComponent(result.ticket);
    const socket = new WebSocket(target.toString());
    state.socket = socket;
    socket.addEventListener('message', (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'message') renderMessage(payload.message);
      } catch { /* Ignore malformed messages from an incompatible server. */ }
    });
    socket.addEventListener('close', () => {
      if (state.socket !== socket) return;
      state.socket = null;
      if (state.server && document.querySelector('[data-tab].is-active')?.dataset.tab === 'chat') {
        setTimeout(() => {
          if (!state.server || state.socket) return;
          void loadMessages().then(openChatSocket);
        }, 1500);
      }
    });
  } catch (error) {
    $('#chat-status').textContent = displayError(error);
  }
}

$('#chat-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = $('#chat-message');
  const button = event.submitter;
  const content = input.value.trim();
  if (!content) return;
  button.disabled = true;
  try {
    const author = $('#chat-name').value.trim() || t('admin.name.placeholder');
    localStorage.setItem(nameStorageKey, author);
    const message = await apiRequest(state.server, state.key, '/messages', { method: 'POST', body: JSON.stringify({ author, content }) });
    renderMessage(message);
    input.value = '';
    $('#chat-status').textContent = '';
  } catch (error) {
    $('#chat-status').textContent = displayError(error);
  } finally {
    button.disabled = false;
    input.focus();
  }
});

function humanSize(size) {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / (1024 * 1024)).toFixed(1) + ' MB';
}

async function downloadFile(item) {
  try {
    const response = await fetch(state.server + '/api/v1/files/' + encodeURIComponent(item.id) + '/download', {
      headers: { Authorization: 'Bearer ' + state.key }, cache: 'no-store', credentials: 'omit', targetAddressSpace: 'local'
    });
    if (!response.ok) throw new ApiError(response.status, 'download_failed', displayError({ status: response.status }));
    const objectURL = URL.createObjectURL(await response.blob());
    const anchor = document.createElement('a');
    anchor.href = objectURL;
    anchor.download = item.name;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectURL), 60_000);
  } catch (error) {
    toast(displayError(error), true);
  }
}

function addFileRow(item) {
  const row = document.createElement('article');
  row.className = 'managed-row';
  const copy = document.createElement('div');
  copy.className = 'managed-copy';
  const name = document.createElement('strong');
  name.className = 'managed-title';
  name.textContent = item.name;
  const meta = document.createElement('span');
  meta.className = 'managed-subtitle';
  meta.textContent = humanSize(item.size) + ' · ' + formatDate(item.createdAt);
  copy.append(name, meta);
  const actions = document.createElement('div');
  actions.className = 'row-actions';
  const download = document.createElement('button');
  download.className = 'icon-button';
  download.type = 'button';
  download.title = t('files.download');
  download.setAttribute('aria-label', t('files.download'));
  download.append(createIcon('download'));
  download.addEventListener('click', () => downloadFile(item));
  const remove = document.createElement('button');
  remove.className = 'icon-button danger-button';
  remove.type = 'button';
  remove.title = t('files.delete');
  remove.setAttribute('aria-label', t('files.delete'));
  remove.append(createIcon('trash'));
  remove.addEventListener('click', async () => {
    if (!window.confirm(t('common.removeConfirm'))) return;
    remove.disabled = true;
    try {
      await apiRequest(state.server, state.key, '/files/' + encodeURIComponent(item.id), { method: 'DELETE' });
      await loadFiles();
    } catch (error) {
      toast(displayError(error), true);
      remove.disabled = false;
    }
  });
  actions.append(download, remove);
  row.append(copy, actions);
  return row;
}

async function loadFiles() {
  const list = $('#files-list');
  list.replaceChildren();
  try {
    const files = await apiRequest(state.server, state.key, '/files');
    $('#files-empty').hidden = files.length > 0;
    files.forEach((item) => list.append(addFileRow(item)));
  } catch (error) {
    $('#file-status').textContent = displayError(error);
  }
}

$('#file-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = $('#file-input').files[0];
  if (!file) return;
  const button = event.submitter;
  button.disabled = true;
  $('#file-status').textContent = t('common.loading');
  try {
    const form = new FormData();
    form.append('file', file, file.name);
    await apiRequest(state.server, state.key, '/files', { method: 'POST', body: form, timeout: 120000 });
    $('#file-form').reset();
    $('#file-status').textContent = '';
    await loadFiles();
    toast(t('files.uploaded'));
  } catch (error) {
    $('#file-status').textContent = displayError(error);
  } finally {
    button.disabled = false;
  }
});

async function loadSettings() {
  try {
    const settings = await apiRequest(state.server, state.key, '/settings');
    $('#retention-days').value = settings.chatRetentionDays;
  } catch (error) {
    $('#settings-status').textContent = displayError(error);
  }
}

$('#settings-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  $('#settings-status').textContent = '';
  try {
    const chatRetentionDays = Number($('#retention-days').value);
    await apiRequest(state.server, state.key, '/settings', { method: 'PUT', body: JSON.stringify({ chatRetentionDays }) });
    $('#settings-status').textContent = t('settings.saved');
  } catch (error) {
    $('#settings-status').textContent = displayError(error);
  } finally {
    button.disabled = false;
  }
});

async function loadWorkspace() {
  await Promise.all([loadLinks(), loadFiles(), loadSettings(), loadMessages()]);
}

for (const tab of document.querySelectorAll('[data-tab]')) {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach((item) => item.classList.toggle('is-active', item === tab));
    document.querySelectorAll('[data-view]').forEach((view) => { view.hidden = view.dataset.view !== tab.dataset.tab; });
    if (tab.dataset.tab === 'chat') void loadMessages().then(openChatSocket);
  });
}

let toastTimer;
function toast(message, error = false) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.toggle('is-error', error);
  element.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3000);
}

const savedServer = localStorage.getItem(serverStorageKey);
const savedKey = sessionStorage.getItem(keyStorageKey);
if (savedServer && savedKey) {
  $('#server-address').value = savedServer;
  $('#access-key').value = savedKey;
  $('#display-name').value = localStorage.getItem(nameStorageKey) || '';
  checkServer(savedServer, savedKey).then(() => setConnected(savedServer, savedKey, localStorage.getItem(nameStorageKey) || t('admin.name.placeholder')))
    .catch((error) => showConnect(displayError(error)));
} else if (savedServer) {
  $('#server-address').value = savedServer;
}
