import fetch from 'isomorphic-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function doFetch(url, opts) {
  const headers = (opts && opts.headers) || {};

  return fetch(url, {
    ...opts,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: opts && opts.body && JSON.stringify(opts.body),
  })
  .then(checkStatus)
  .then((res) => res.json());
}
