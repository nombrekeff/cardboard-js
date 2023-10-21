export * from './tag.js';
export * from './state.js';
export * from './css-generator.js';
export * from './util.js';
export * from './text.js';
export * from './events.js';
export * from './ext/routing.js';


import * as _tag from './tag.js';
import * as _state from './state.js';
import * as _css from './css-generator.js';
import * as _util from './util.js';
import * as _text from './text.js';
import * as _events from './events.js';
import * as _routing from './ext/routing.js';

export const Cardboard = {
  ..._tag,
  ..._state,
  ..._css,
  ..._util,
  ..._text,
  ..._events,
  ..._routing,
};
