const BASE = '/sitetest';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${BASE}/math.js`, {
    scope: `${BASE}/`
  });
}

function encodeHVTR(url) {
  return (
    'hvtr:-//' +
    url
      .replace(/^https?:\/\//, '')
      .replace(/\./g, ',')
      .replace(/\//g, '-')
  );
}

document.getElementById('proxyForm').addEventListener('submit', e => {
  e.preventDefault();

  let url = document.getElementById('urlInput').value.trim();
  if (!url.startsWith('http')) url = 'https://' + url;

  const encoded = encodeHVTR(url);
  window.location.href = `${BASE}/school/service/?hvtr=${encodeURIComponent(encoded)}`;
});
