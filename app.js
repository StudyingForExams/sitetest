function hvtrsDecode(hvtrs) {
  hvtrs = decodeURIComponent(hvtrs);

  hvtrs = hvtrs
    .replace(/^hvtrs8-/, '')
    .replace(/,/g, '.')
    .replace(/;/g, ':');

  return 'https://' + hvtrs;
}

function getHVTRS() {
  // get everything after /Learning/
  let path = location.pathname.split('/Learning/')[1];

  if (path && path.startsWith('hvtrs')) {
    return path;
  }

  return prompt("Paste HVTRS link:");
}

const hvtrs = getHVTRS();

if (hvtrs) {
  const decodedURL = hvtrsDecode(hvtrs);

  const duckduckgo =
    "https://duckduckgo.com/html/?q=" +
    encodeURIComponent(decodedURL);

  window.location.replace(duckduckgo);
}
