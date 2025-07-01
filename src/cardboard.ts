import * as _context from './context.js';
import * as _tag from './tag.js';
import * as _state from './state.js';
import * as _css from './css-generator.js';
import * as _util from './util.js';
import * as _text from './text.js';
import * as _events from './events.js';
import * as _lifecycle from './lifecycle.js';
import * as _observables from './observables.js';
import * as _alltags from './all-tags.js';
import * as _styles from './style-manager.js';

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
export * from './all-tags.js';
export type * from './types';


/**
 * It initializes the framework & makes the body tag the mount point ({@link mountPoint}).
 * You can pass in a selector for an element you want to be the default tag ("body" by default).
 */
export const init = (options: { selector: string } = { selector: 'body' }) => {
  _context.context.initialized = true;
  _context.context.observer = _context.createGlobalObserver();
  _context.context.styleManager = new _styles.StyleManager();
  
  const tag = new _tag.CTag(`(${options.selector})`);
  return _context.mountPoint(tag);
};

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
  ..._alltags,
  ..._styles,
  init,
  version: '0.0.6',
};
