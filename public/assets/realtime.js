// One persistent subscription for all views; reconnects reconcile missed changes.
export function subscribe(server, { onEvent, onReady, onStatus = () => {} }) {
  let socket;
  let timer;
  let disposed = false;
  let attempts = 0;
  const endpoint = new URL(server);
  endpoint.protocol = endpoint.protocol === 'https:' ? 'wss:' : 'ws:';
  endpoint.pathname = '/api/v2/chat/ws';
  endpoint.search = '';
  endpoint.hash = '';
  function connect() {
    if (disposed || socket?.readyState === WebSocket.OPEN || socket?.readyState === WebSocket.CONNECTING) return;
    clearTimeout(timer);
    onStatus('connecting');
    const current = new WebSocket(endpoint.href);
    socket = current;
    current.addEventListener('open', () => {
      if (disposed || socket !== current) return;
      attempts = 0;
      onStatus('live');
      void onReady();
    });
    current.addEventListener('message', (event) => {
      if (disposed || socket !== current) return;
      try {
        const payload = JSON.parse(event.data);
        if (payload?.type === 'message' || payload?.type === 'change') onEvent(payload);
      } catch { /* Ignore unsupported server events. */ }
    });
    current.addEventListener('close', () => {
      if (disposed || socket !== current) return;
      socket = null;
      onStatus('reconnecting');
      const delay = Math.min(15000, 800 * 2 ** attempts++) + Math.random() * 400;
      timer = setTimeout(connect, delay);
    });
    current.addEventListener('error', () => current.close());
  }
  function wake() {
    if (document.visibilityState === 'visible' || navigator.onLine) connect();
  }
  window.addEventListener('online', wake);
  document.addEventListener('visibilitychange', wake);
  connect();
  return () => {
    disposed = true;
    clearTimeout(timer);
    window.removeEventListener('online', wake);
    document.removeEventListener('visibilitychange', wake);
    socket?.close();
    socket = null;
  };
}

// Serialize snapshots and queue a second fetch when a change arrives in flight.
export function synchronize(load) {
  let running = null;
  let dirty = false;
  let retry;
  let failures = 0;
  return function sync() {
    clearTimeout(retry);
    dirty = true;
    if (!running) {
      running = (async () => {
        try {
          while (dirty) {
            dirty = false;
            if (await load() === false) {
              retry = setTimeout(sync, Math.min(30000, 1500 * 2 ** failures++));
            } else {
              clearTimeout(retry);
              failures = 0;
            }
          }
        } finally { running = null; }
      })();
    }
    return running;
  };
}

// Go emits RFC3339 UTC timestamps with a variable number of fractional digits.
// Pad them before comparing so messages within the same millisecond stay ordered.
export function compareMessages(a, b) {
  const key = message => message.createdAt.replace(/(?:\.(\d+))?Z$/, (_, fraction = '') => '.' + fraction.padEnd(9, '0') + 'Z');
  return key(a).localeCompare(key(b)) || a.id.localeCompare(b.id);
}
