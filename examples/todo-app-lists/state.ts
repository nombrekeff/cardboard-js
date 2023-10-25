import { fromJson, state, toJson } from '../../dist/cardboard.js';

export const appState = state(
  [...new Array(100).fill('').map((_, index) => `Item ${index}`).sort(() => Math.random() > .5 ? 1 : -1)],

);
