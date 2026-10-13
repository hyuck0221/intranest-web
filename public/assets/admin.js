import { setupChatActions } from './chat-actions.js';
import { ApiError, apiRequest, connectServer, displayError, formatDate, language, normalizeServerAddress, serverAddressForInput, t, applyLanguage, toggleLanguage } from './common.js';

import { subscribe, synchronize, compareMessages } from './realtime.js';

if (new URLSearchParams(location.search).has('embedded')) document.body.dataset.embedded = 'true';

const $ = (selector) => document.querySelector(selector);
const state = { server: '', name: '', subscription: null, snapshotPending: false, pendingMessages: [], pendingChatChanges: [], seenMessages: new Set(), links: [], files: [] };
const serverStorageKey = 'intranest.serverUrl';
const nameStorageKey = 'intranest.displayName';

applyLanguage();
$('[data-language-toggle]').addEventListener('click', () => { toggleLanguage(); if (state.server) { renderFilteredLinks(); void syncFiles(); } });
$('#server-address').value = serverAddressForInput(localStorage.getItem(serverStorageKey) || '');
$('#display-name').value = localStorage.getItem(nameStorageKey) || '';
$('#profile-name').value = localStorage.getItem(nameStorageKey) || t('admin.name.placeholder');
sessionStorage.removeItem('intranest.accessKey');

function setConnectStatus(message = '', kind = '', loading = false) {
  const status = $('#connect-status');
  const loader = status.querySelector('[data-status-loader]');
  if (loader) loader.hidden = !loading;
  status.querySelector('[data-status-message]').textContent = message;
  status.className = 'form-status' + (kind ? ' is-' + kind : '');
}

function setButtonBusy(button, busy, key) {
  button.disabled = busy;
  button.setAttribute('aria-busy', String(busy));
  button.classList.toggle('is-busy', busy);
  const loader = button.querySelector('[data-button-loader]');
  if (loader) loader.hidden = !busy;
  const label = button.querySelector('[data-i18n]') || button;
  label.textContent = busy ? t('admin.checking') : t(key);
}

function createBrandLoading(message = t('common.loading'), tagName = 'div') {
  const wrapper = document.createElement(tagName);
  wrapper.className = 'brand-loading';
  wrapper.setAttribute('role', 'status');
  const loader = document.createElement('span');
  loader.className = 'brand-loader';
  loader.setAttribute('aria-hidden', 'true');
  const mark = document.createElement('img');
  mark.src = '/assets/brand/intranest-mark-64.png';
  mark.alt = '';
  const label = document.createElement('span');
  label.textContent = message;
  loader.append(mark);
  wrapper.append(loader, label);
  return wrapper;
}

function setConnected(server, name) {
  state.subscription?.();
  if (state.server !== server) {
    state.links = []; state.files = []; state.seenMessages.clear();
    $('#links-list').replaceChildren(); $('#files-list').replaceChildren(); $('#chat-log').replaceChildren();
  }
  state.server = server;
  state.name = name;
  $('#connect-panel').hidden = true;
  $('#workspace').hidden = false;
  $('#server-label').textContent = t('workspace.team');
  $('#profile-name').value = name;
  void loadWorkspace();
  state.subscription = subscribe(server, {
    onReady: loadWorkspace,
    onStatus: (status) => {
      for (const label of document.querySelectorAll('[data-live-status]')) {
        label.dataset.i18n = 'live.' + status;
        label.textContent = t(label.dataset.i18n);
      }
    },
    onEvent: (event) => {
      if (event.type === 'message') {
        if (state.snapshotPending) state.pendingMessages.push(event.message);
        renderMessage(event.message, false, nearLatest());
      } else if (event.resource === 'messages' && ['updated', 'deleted'].includes(event.action)) {
        applyChatChange(event);
      } else {
        const loaders = { links: syncLinks, files: syncFiles, settings: syncSettings, messages: syncMessages };
        void loaders[event.resource]?.();
      }
    }
  });
}

function showConnect(message = '') {
  state.server = '';
  state.subscription?.();
  state.subscription = null;
  $('#workspace').hidden = true;
  $('#connect-panel').hidden = false;
  setConnectStatus(message, message ? 'error' : '');
}

$('#connect-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = $('#connect-button');
  setButtonBusy(button, true, 'admin.connect');
  setConnectStatus('', '', true);
  try {
    const address = normalizeServerAddress($('#server-address').value);
    const name = $('#display-name').value.trim() || t('admin.name.placeholder');
    const server = await connectServer(address);
    localStorage.setItem(serverStorageKey, server);
    localStorage.setItem(nameStorageKey, name);
    setConnected(server, name);
  } catch (error) {
    setConnectStatus(displayError(error), 'error');
  } finally {
    setButtonBusy(button, false, 'admin.connect');
  }
});

$('#disconnect-button').addEventListener('click', () => {
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
    await apiRequest(state.server, '/links', { method: 'POST', body: JSON.stringify(payload) });
    $('#link-form').reset();
    $('#link-form').hidden = true;
    $('#link-status').textContent = '';
    await syncLinks();
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
      await apiRequest(state.server, '/links/' + encodeURIComponent(link.id), { method: 'DELETE' });
      await syncLinks();
      toast(t('links.deleted'));
    } catch (error) {
      toast(displayError(error), true);
      remove.disabled = false;
    }
  });
  const tile = document.createElement('span');
  tile.className = 'managed-icon';
  tile.append(createIcon('link'));
  row.append(tile, text, remove);
  return row;
}

async function loadLinks() {
  const list = $('#links-list');
  const server = state.server;
  if (!server) return;
  try {
    const links = await apiRequest(server, '/links');
    if (state.server !== server) return;
    state.links = links;
    renderFilteredLinks();
  } catch (error) {
    toast(displayError(error), true);
    return false;
  }
}

function renderFilteredLinks() {
  const links = state.links;
  $('#links-list').replaceChildren(...links.map(addLinkRow));
  const empty = $('#links-empty');
  empty.hidden = links.length > 0;
  empty.dataset.i18n = 'links.empty';
  empty.textContent = t(empty.dataset.i18n);
}

const messageActions = setupChatActions({ apiRequest, t, server: () => state.server, onMutation: applyChatChange, showError: displayError });
function applyChatChange(event) {
  if (state.snapshotPending) state.pendingChatChanges.push(event);
  const row = [...$('#chat-log').querySelectorAll('[data-message-id]')].find(row => row.dataset.messageId === event.id);
  if (event.action === 'deleted') { row?.remove(); state.seenMessages.delete(event.id); }
  else if (event.action === 'updated' && event.message && row) renderMessage(event.message, false, false);
  if (!$('#chat-log').querySelector('.chat-message')) {
    $('#chat-log').replaceChildren(); const empty = document.createElement('p'); empty.className = 'empty-state'; empty.dataset.i18n = 'chat.empty'; empty.textContent = t('chat.empty'); $('#chat-log').append(empty);
  }
}
function renderMessage(message, prepend = false, scrollToLatest = true) {
  const existing = [...$('#chat-log').querySelectorAll('[data-message-id]')].find(row => row.dataset.messageId === message.id);
  state.seenMessages.add(message.id);
  const empty = $('#chat-log').querySelector('.empty-state');
  if (empty) empty.remove();
  const entry = document.createElement('article');
  entry.className = 'chat-message';
  entry.classList.toggle('own-message', message.author === state.name);
  entry.dataset.messageId = message.id;
  const meta = document.createElement('div');
  meta.className = 'chat-message-meta';
  const author = document.createElement('strong');
  author.textContent = message.author;
  const date = document.createElement('time');
  date.dateTime = message.createdAt;
  date.textContent = formatDate(message.createdAt);
  if (message.author !== state.name) meta.append(author);
  meta.append(date);
  const content = document.createElement('p');
  content.textContent = message.content;
  const bubble = document.createElement('div'); bubble.className = 'message-bubble';
  bubble.append(content, messageActions(message));
  entry.append(meta, bubble);
  const log = $('#chat-log');
  if (existing) existing.replaceWith(entry);
  else if (prepend) log.prepend(entry);
  else log.append(entry);
  if (scrollToLatest && !prepend) log.scrollTop = log.scrollHeight;
}

function nearLatest() {
  const log = $('#chat-log');
  return log.scrollHeight - log.clientHeight - log.scrollTop < 64;
}
async function loadMessages() {
  const server = state.server;
  if (!server) return;
  const log = $('#chat-log');
  const follow = nearLatest();
  const previousTop = log.scrollTop;
  state.snapshotPending = true;
  state.pendingMessages = [];
  state.pendingChatChanges = [];
  try {
    const messages = await apiRequest(server, '/messages?limit=100');
    if (server !== state.server) return;
    const merged = new Map([...messages, ...state.pendingMessages].map(item => [item.id, item]));
    for (const event of state.pendingChatChanges) {
      if (event.action === 'deleted') merged.delete(event.id);
      else if (event.action === 'updated' && event.message && merged.has(event.id)) merged.set(event.id, event.message);
    }
    state.seenMessages.clear();
    log.replaceChildren();
    [...merged.values()].sort(compareMessages).forEach(message => renderMessage(message, false, false));
    if (!merged.size) {
      const empty = document.createElement('p');
      empty.className = 'empty-state'; empty.dataset.i18n = 'chat.empty'; empty.textContent = t('chat.empty'); log.append(empty);
    }
    log.scrollTop = follow ? log.scrollHeight : previousTop;
    $('#load-older-messages').hidden = messages.length < 100;
    $('#chat-status').textContent = '';
  } catch (error) {
    $('#chat-status').textContent = displayError(error);
    return false;
  } finally {
    if (state.server === server) { state.snapshotPending = false; state.pendingMessages = []; state.pendingChatChanges = []; }
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
    const older = await apiRequest(state.server, '/messages?limit=100&before=' + encodeURIComponent(firstMessage.dataset.messageId));
    for (const message of [...older].reverse()) renderMessage(message, true, false);
    if (older.length) log.scrollTop = previousTop + log.scrollHeight - previousHeight;
    button.hidden = older.length < 100;
  } catch (error) {
    $('#chat-status').textContent = displayError(error);
  } finally {
    button.disabled = false;
  }
});

$('#chat-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = $('#chat-message');
  const button = event.submitter;
  const content = input.value.trim();
  if (!content) return;
  button.disabled = true;
  try {
    const author = state.name || t('settings.namePlaceholder');
    localStorage.setItem(nameStorageKey, author);
    const message = await apiRequest(state.server, '/messages', { method: 'POST', body: JSON.stringify({ author, content }) });
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
    const response = await fetch(state.server + '/api/v2/files/' + encodeURIComponent(item.id) + '/download', {
      cache: 'no-store', credentials: 'omit', targetAddressSpace: 'local'
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
      await apiRequest(state.server, '/files/' + encodeURIComponent(item.id), { method: 'DELETE' });
      await syncFiles();
    } catch (error) {
      toast(displayError(error), true);
      remove.disabled = false;
    }
  });
  actions.append(download, remove);
  const tile = document.createElement('span');
  tile.className = 'managed-icon file-icon';
  tile.append(createIcon('file'));
  row.append(tile, copy, actions);
  return row;
}

function renderFiles() {
  updateFileSelection();
  const query = $('#files-search').value.trim().toLocaleLowerCase();
  const files = state.files.filter(file => file.name.toLocaleLowerCase().includes(query));
  $('#files-list').replaceChildren(...files.map(addFileRow));
  const empty = $('#files-empty');
  empty.hidden = files.length > 0;
  empty.dataset.i18n = query ? 'files.noResults' : 'files.empty';
  empty.textContent = t(empty.dataset.i18n);
}

async function loadFiles() {
  const list = $('#files-list');
  const server = state.server;
  if (!server) return;
  try {
    const files = await apiRequest(server, '/files');
    if (state.server !== server) return;
    state.files = files;
    renderFiles();
  } catch (error) {
    $('#file-status').textContent = displayError(error);
    return false;
  }
}

$('#files-search').addEventListener('input', renderFiles);
let selectedFiles = [];
function showUploadScreen(open) {
  $('#file-browser').closest('[data-view], [data-popup-view]').classList.toggle('is-uploading', open);
  $('#file-browser').hidden = open;
  $('#file-upload-screen').hidden = !open;
  if (open) { $('#upload-status').textContent = ''; $('#upload-heading').focus(); }
  else $('#open-upload').focus();
}
$('#open-upload').addEventListener('click', () => showUploadScreen(true));
$('#upload-back').addEventListener('click', () => showUploadScreen(false));
function setSelectedFiles(files) {
  selectedFiles = files;
  const selection = new DataTransfer(); files.forEach(file => selection.items.add(file));
  $('#file-input').files = selection.files;
  updateFileSelection();
}
function addSelectedFiles(files) {
  if ($('#file-input').disabled) return;
  const merged = [...selectedFiles];
  for (const file of files) {
    if (!merged.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) merged.push(file);
  }
  setSelectedFiles(merged);
}
function updateFileSelection() {
  const files = [...$('#file-input').files];
  $('#file-picker-label').textContent = t('files.selected').replace('{count}', files.length);
  $('#submit-upload').disabled = !files.length || $('#file-input').disabled;
  $('#selected-files').replaceChildren(...files.map((file, index) => {
    const row = document.createElement('li');
    const copy = document.createElement('div');
    const name = document.createElement('strong'); name.textContent = file.name;
    const size = document.createElement('small'); size.textContent = humanSize(file.size);
    copy.append(name, size);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'icon-button';
    remove.setAttribute('aria-label', t('files.removeSelected') + ': ' + file.name);
    remove.disabled = $('#file-input').disabled;
    const icon = document.createElement('span'); icon.className = 'icon icon-trash'; icon.setAttribute('aria-hidden', 'true'); remove.append(icon);
    remove.addEventListener('click', () => setSelectedFiles(files.filter((_, itemIndex) => itemIndex !== index)));
    row.append(copy, remove); return row;
  }));
}
$('#file-input').addEventListener('change', () => addSelectedFiles([...$('#file-input').files]));
const dropzone = $('#upload-dropzone');
for (const type of ['dragenter', 'dragover']) dropzone.addEventListener(type, event => {
  event.preventDefault(); if (!$('#file-input').disabled) dropzone.classList.add('is-dragging');
});
dropzone.addEventListener('dragleave', event => { if (!dropzone.contains(event.relatedTarget)) dropzone.classList.remove('is-dragging'); });
dropzone.addEventListener('drop', event => { event.preventDefault(); dropzone.classList.remove('is-dragging'); addSelectedFiles([...event.dataTransfer.files]); });
// Dropping outside the target must never navigate away from the workspace.
for (const type of ['dragover', 'drop']) $('#file-upload-screen').addEventListener(type, event => event.preventDefault());
$('#file-form').addEventListener('submit', async event => {
  event.preventDefault();
  const input = $('#file-input');
  const files = [...input.files];
  if (!files.length) return;
  const server = state.server;
  const button = event.submitter || $('#file-form button[type="submit"]');
  button.disabled = true; input.disabled = true; $('#upload-back').disabled = true; updateFileSelection(); button.setAttribute('aria-busy', 'true');
  $('#upload-status').classList.remove('is-error', 'is-success');
  $('#upload-status').textContent = t('files.uploading').replace('{done}', 0).replace('{total}', files.length);
  let done = 0;
  const failed = [];
  try {
    // At most three uploads run together; each file keeps its own API request.
    for (let offset = 0; offset < files.length; offset += 3) {
      if (state.server !== server) { failed.push(...files.slice(offset)); break; }
      await Promise.all(files.slice(offset, offset + 3).map(async file => {
        try {
          const form = new FormData(); form.append('file', file, file.name);
          await apiRequest(server, '/files', { method: 'POST', body: form, timeout: 120000 });
        } catch (error) { failed.push(file); }
        finally {
          done += 1;
          if (state.server === server) $('#upload-status').textContent = t('files.uploading').replace('{done}', done).replace('{total}', files.length);
        }
      }));
    }
    // Retain only failed selections, so retry never duplicates successful uploads.
    setSelectedFiles(failed);
    if (state.server === server) {
      if (!failed.length) $('#files-search').value = '';
      const refreshed = await syncFiles();
      $('#upload-status').textContent = failed.length
        ? t('files.batchFailed').replace('{done}', files.length - failed.length).replace('{failed}', failed.length)
        : t('files.batchDone').replace('{count}', files.length);
      $('#upload-status').classList.toggle('is-error', failed.length > 0);
      $('#upload-status').classList.toggle('is-success', failed.length === 0);
      if (!failed.length) {
        if (refreshed !== false) {
          $('#file-status').textContent = $('#upload-status').textContent;
          $('#file-status').classList.remove('is-error');
          $('#file-status').classList.add('is-success');
        }
        showUploadScreen(false);
      }
    }
  } catch (error) {
    $('#upload-status').textContent = displayError(error);
  } finally {
    input.disabled = false; $('#upload-back').disabled = false; button.removeAttribute('aria-busy'); updateFileSelection();
  }
});
async function loadSettings() {
  const server = state.server;
  if (!server) return;
  try {
    const settings = await apiRequest(server, '/settings');
    if (state.server !== server) return;
    $('#retention-days').value = settings.chatRetentionDays;
    $('#settings-status').textContent = '';
  } catch (error) {
    $('#settings-status').textContent = displayError(error);
    return false;
  }
}

$('#settings-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  $('#settings-status').textContent = '';
  try {
    const chatRetentionDays = Number($('#retention-days').value);
    await apiRequest(state.server, '/settings', { method: 'PUT', body: JSON.stringify({ chatRetentionDays }) });
    $('#settings-status').textContent = t('settings.saved');
  } catch (error) {
    $('#settings-status').textContent = displayError(error);
  } finally {
    button.disabled = false;
  }
});

const syncLinks = synchronize(loadLinks);
const syncFiles = synchronize(loadFiles);
const syncSettings = synchronize(loadSettings);
const syncMessages = synchronize(loadMessages);
async function loadWorkspace() {
  await Promise.all([syncLinks(), syncFiles(), syncSettings(), syncMessages()]);
}

function selectView(view) {
  if (!['links', 'chat', 'files', 'settings'].includes(view)) return;
  document.querySelectorAll('[data-tab]').forEach((item) => {
    const active = item.dataset.tab === view;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-current', active ? 'page' : 'false');
  });
  document.querySelectorAll('[data-view]').forEach((panel) => { panel.hidden = panel.dataset.view !== view; });
  if (view === 'chat') $('#chat-log').scrollTop = $('#chat-log').scrollHeight;
}
for (const tab of document.querySelectorAll('[data-tab]')) {
  tab.addEventListener('click', () => {
    const view = tab.dataset.tab;
    history.replaceState(null, '', '#' + view);
    selectView(view);
  });
}
window.addEventListener('hashchange', () => selectView(location.hash.slice(1)));
selectView(location.hash.slice(1) || 'links');

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
if (savedServer) {
  const address = serverAddressForInput(savedServer);
  $('#server-address').value = address;
  $('#display-name').value = localStorage.getItem(nameStorageKey) || '';
  setConnectStatus('', '', true);
  connectServer(address).then((server) => {
    localStorage.setItem(serverStorageKey, server);
    setConnected(server, localStorage.getItem(nameStorageKey) || t('admin.name.placeholder'));
  }).catch((error) => showConnect(displayError(error)));
}

window.addEventListener('pagehide', () => state.subscription?.());

window.addEventListener('intranest-language-change', () => {
  renderFilteredLinks();
  if (state.server) void syncFiles();
});

function applyDisplayName(name) {
  state.name = name || t('settings.namePlaceholder');
  $('#profile-name').value = state.name;
  $('#display-name').value = state.name;
}
$('#profile-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('#profile-name').value.trim();
  if (!name) { $('#profile-status').textContent = t('settings.nameRequired'); return; }
  localStorage.setItem(nameStorageKey, name);
  applyDisplayName(name);
  $('#profile-status').textContent = t('settings.nameSaved');
  window.dispatchEvent(new CustomEvent('intranest-profile-saved', { detail: { name } }));
});
window.addEventListener('intranest-profile-change', event => applyDisplayName(event.detail.name));
window.addEventListener('storage', event => { if (event.key === nameStorageKey) applyDisplayName(event.newValue); });

window.addEventListener('pageshow', event => { if (event.persisted && state.server) setConnected(state.server, state.name); });
