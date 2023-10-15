import { CTag } from '../tag.js';
export * as tween from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
import * as TWEEN from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
import type {
  Easing,
  Tween,
} from '../../node_modules/@tweenjs/tween.js/dist/tween.js';

export type {
  Easing,
  Tween,
} from '../../node_modules/@tweenjs/tween.js/dist/tween.js';

export type TweenOptions<T> = {
  from: T;
  to: T;
  duration: number;
  repeat?: number;
  easing?: typeof Easing;
  update?: (value: T, t: typeof Tween) => void;
};

export function makeTween<T extends {}>(opts: TweenOptions<T>): Tween<T> {
  return (new TWEEN.Tween(opts.from) as Tween<T>)
    .to(opts.to, opts.duration)
    .repeat(opts.repeat ?? 0)
    .onUpdate(function () {
      if (opts.update) opts.update(opts.from, this);
    })
    .easing(opts.easing ?? TWEEN.Easing.Quadratic.InOut);
}

export function tweenTag(
  tag: CTag,
  tween: (tag: CTag) => Tween<any>,
  onComplete?: () => void,
): CTag {
  const tweenInstance = tween(tag);
  tweenInstance.start();

  function animate(time) {
    const id = requestAnimationFrame(animate);
    const result = tweenInstance.update(time);

    if (!result) {
      cancelAnimationFrame(id);
      if (onComplete) onComplete();
    }
  }
  requestAnimationFrame(animate);

  return tag as any;
}

export function tweenTagAsync(
  tag: CTag,
  tween: (tag: CTag) => Tween<any>,
): Promise<CTag> {
  return new Promise((resolve) => tweenTag(tag, tween, () => resolve(tag)));
}
