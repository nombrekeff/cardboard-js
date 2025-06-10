import * as _context from './context.js';
import * as _tag from './tag.js';
import * as _state from './state.js';
import * as _css from './css-generator.js';
import * as _util from './util.js';
import * as _text from './text.js';
import * as _events from './events.js';
import * as _lifecycle from './lifecycle.js';
import * as _observables from './observables.js';

export * from './context.js';
export * from './tag.js';
export * from './state.js';
export * from './css-generator.js';
export * from './util.js';
export * from './text.js';
export * from './events.js';
export * from './each.js';
export * from './lifecycle.js';
export * from './observables.js';
export type * from './types';

// Import the version from package.json

export const Cardboard = {
  ..._tag,
  ..._state,
  ..._css,
  ..._util,
  ..._text,
  ..._events,
  ..._observables,
  ..._lifecycle,
  ..._context,
  version: '0.0.4',
};
