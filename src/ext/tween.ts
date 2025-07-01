import { type CTag } from '../cardboard.js';
import * as TWEEN from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
import type {
  Easing,
  Tween,
} from '../../node_modules/@tweenjs/tween.js/dist/tween.js';
export * as tween from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
export type {
  Easing,
  Tween,
} from '../../node_modules/@tweenjs/tween.js/dist/tween.js';

export interface TweenOptions<T> {
  from: T;
  to: T;
  duration: number;
  repeat?: number;
  easing?: typeof Easing;
  update?: (value: T, t: typeof Tween) => void;
}

/**
 * {@see https://github.com/nombrekeff/cardboard-js/wiki/Tweening}
 */
export function makeTween<T extends Record<string, unknown>>(opts: TweenOptions<T>): Tween<T> {
  // This is done to remove flickering the first time the tween is run
  // This will set properties to the initial value.
  // This way when the tween is run, it will start with the correct properties.
  if (opts.update) opts.update(opts.from, this);

  return (new TWEEN.Tween(opts.from) as Tween<T>)
    .to(opts.to, opts.duration)
    .repeat(opts.repeat ?? 0)
    .onUpdate(function () {
      if (opts.update) opts.update(opts.from, this);
    })
    .easing(opts.easing ?? TWEEN.Easing.Quadratic.InOut);
}

/**
 * {@see https://github.com/nombrekeff/cardboard-js/wiki/Tweening}
 */
export const tweenTag = (
  tag: CTag,
  tween: (tag: CTag) => Tween<any>,
  onComplete?: () => void,
): CTag => {
  const tweenInstance = tween(tag);
  tweenInstance.start();

  const animate = (time) => {
    const id = requestAnimationFrame(animate);
    const result = tweenInstance.update(time);

    if (!result) {
      cancelAnimationFrame(id);
      if (onComplete) onComplete();
    }
  };
  requestAnimationFrame(animate);

  return tag as any;
};

/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Tweening
 */
export const tweenTagAsync = async (
  tag: CTag,
  tween: (tag: CTag) => Tween<any>,
): Promise<CTag> => {
  return await new Promise((resolve) => tweenTag(tag, tween, () => {
    resolve(tag);
  }));
};
