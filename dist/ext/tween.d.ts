import { CTag } from '../cardboard.js';
import { Easing, Tween } from '../../node_modules/@tweenjs/tween.js/dist/tween.js';
export { Easing, Tween } from '../../node_modules/@tweenjs/tween.js/dist/tween.js';
import * as tween_esm_js from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
export { tween_esm_js as tween };

interface TweenOptions<T> {
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
declare function makeTween<T extends Record<string, unknown>>(opts: TweenOptions<T>): Tween<T>;
/**
 * {@see https://github.com/nombrekeff/cardboard-js/wiki/Tweening}
 */
declare const tweenTag: (tag: CTag, tween: (tag: CTag) => Tween<any>, onComplete?: () => void) => CTag;
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Tweening
 */
declare const tweenTagAsync: (tag: CTag, tween: (tag: CTag) => Tween<any>) => Promise<CTag>;

export { type TweenOptions, makeTween, tweenTag, tweenTagAsync };
