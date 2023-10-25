import { fromJson, state, toJson } from '../../dist/cardboard.js';

export const appState = state(
  [...(toJson(localStorage.getItem('TODOS')) || [])],

).changed((newState) => {
  localStorage.setItem('TODOS', fromJson([...newState]));
});
