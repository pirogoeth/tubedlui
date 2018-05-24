export function calculateNextState(previousState, updateState) {
  return { ...previousState, ...updateState };
}