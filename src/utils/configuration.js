export function isDisabled(configuration) {
  return configuration[0] === 'off';
}

export function isEnabled(configuration) {
  return configuration[0] === 'alert';
}
