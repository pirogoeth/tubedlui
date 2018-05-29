export function calculateNextState(previousState, updateState) {
  return { ...previousState, ...updateState };
};

export function cloneState(state, ...merge) {
  return Object.assign({}, state, ...merge);
};
