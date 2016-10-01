import fetch from './utils/fetch';
import config from '../config';

export function getRules() {
  return fetch(`${config.api.path}/rules`);
}

export function saveConfiguration(ruleName, configuration, idToken) {
  const headers = idToken ? { token: idToken } : {};
  return fetch(`${config.api.path}/rules/${encodeURIComponent(ruleName)}/configurations`, {
    method: 'POST',
    headers,
    body: configuration,
  });
}
