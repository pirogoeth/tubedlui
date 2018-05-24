export function calculateNextState(store, updateState) {
  return Object.assign({}, store.__store, updateState);
}