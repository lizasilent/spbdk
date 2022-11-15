export function parseUrlParam(paramName) {
  const parsedUrl = new URL(window.location.href);
  const parsedParam = parsedUrl.searchParams.get(paramName);

  return parsedParam;
}

export function prepareCardId(nomenId) {
  return nomenId.slice(2);
}
