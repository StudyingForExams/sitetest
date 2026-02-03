const BASE = '/hvtrs-proxy';

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname === `${BASE}/school/service/` && url.searchParams.has('hvtr')) {
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
  const url = new URL(request.url);
  const hvtr = url.searchParams.get('hvtr');
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
