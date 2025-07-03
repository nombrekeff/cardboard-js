import * as _context from './context.js';
import * as _tag from './tag.js';
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
  _context.context.init = true;
  _context.context.obs = _context.createGlobalObserver();
  _context.context.styleManager = new _styles.StyleManager();

  const tag = new _tag.CTag(`(${options.selector})`);
  return _context.mountPoint(tag);
};

export const version = '0.1.0'; // This should be replaced with the actual version from package.json during the build process
