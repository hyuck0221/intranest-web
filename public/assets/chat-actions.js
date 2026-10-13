// Editing stays in a dialog so realtime list updates never erase a draft.
export function setupChatActions({ apiRequest, t, server, onMutation, showError, demo = () => false }) {
  const dialog = document.querySelector('#message-edit-dialog');
  const form = dialog.querySelector('form');
  const input = dialog.querySelector('textarea');
  const status = dialog.querySelector('[role="status"]');
  const save = dialog.querySelector('[type="submit"]');
  const cancel = dialog.querySelector('[data-edit-cancel]');
  let target = null;
  let busy = false;
  cancel.addEventListener('click', () => dialog.close());
  dialog.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const content = input.value.trim();
    if (!content || busy || !target) return;
    const connection = server();
    busy = true; save.disabled = true; cancel.disabled = true; input.disabled = true;
    status.textContent = '';
    try {
      const message = demo() ? { ...target, content } : await apiRequest(connection, '/messages/' + encodeURIComponent(target.id), { method: 'PUT', body: JSON.stringify({ content }) });
      if (connection === server()) onMutation({ type: 'change', resource: 'messages', action: 'updated', id: message.id, message });
      dialog.close();
    } catch (error) { status.textContent = showError(error); }
    finally { busy = false; save.disabled = false; cancel.disabled = false; input.disabled = false; }
  });
  function button(icon, label) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'icon-button'; button.setAttribute('aria-label', label); button.title = label;
    const glyph = document.createElement('span'); glyph.className = 'icon icon-' + icon; glyph.setAttribute('aria-hidden', 'true'); button.append(glyph);
    return button;
  }
  return message => {
    const actions = document.createElement('div'); actions.className = 'message-actions';
    const edit = button('edit', t('chat.edit'));
    edit.addEventListener('click', () => { target = message; input.value = message.content; status.textContent = ''; dialog.showModal(); input.focus(); });
    const remove = button('trash', t('chat.delete'));
    remove.addEventListener('click', async () => {
      if (!window.confirm(t('chat.deleteConfirm'))) return;
      const connection = server(); remove.disabled = true;
      try {
        if (!demo()) await apiRequest(connection, '/messages/' + encodeURIComponent(message.id), { method: 'DELETE' });
        if (connection === server()) onMutation({ type: 'change', resource: 'messages', action: 'deleted', id: message.id });
      } catch (error) { document.querySelector('#chat-status').textContent = showError(error); }
      finally { remove.disabled = false; }
    });
    actions.append(edit, remove); return actions;
  };
}
