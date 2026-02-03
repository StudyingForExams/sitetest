const BASE = '/hvtrs-proxy';

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith(`${BASE}/school/service/`)) {
    event.respondWith(handleProxy(event.request));
  }
});

function decodeHVTR(hvtr) {
  return (
    'https://' +
    hvtr
      .replace('hvtr:-//', '')
      .replace(/,/g, '.')
      .replace(/-/g, '/')
  );
}

async function handleProxy(request) {
  const hvtr = request.url.split('/school/service/')[1];
  const target = decodeHVTR(hvtr);

  return fetch(
    `https://worker.lilryftlol.workers.dev/?url=${encodeURIComponent(target)}`,
    {
      method: request.method,
      headers: request.headers,
      redirect: 'follow'
    }
  );
}
