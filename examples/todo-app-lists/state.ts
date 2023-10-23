import { fromJson, state, toJson } from '../../dist/cardboard.js';

export const appState = state(
  new Array(50).fill('').map((_, index) => `Item ${index}`),
  // (newState) => {
  //   localStorage.setItem('TODOS', fromJson([...newState]));
  // }, //
);
