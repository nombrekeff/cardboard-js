/// <reference types="@tweenjs/tween.js" />
export * as tween from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
import type { CTag } from '../tag.js';
import type { Easing, Tween } from '../../node_modules/@tweenjs/tween.js/dist/tween.js';
export type { Easing, Tween, } from '../../node_modules/@tweenjs/tween.js/dist/tween.js';
export type TweenOptions<T> = {
    from: T;
    to: T;
    duration: number;
    repeat?: number;
    easing?: typeof Easing;
    update?: (value: T, t: typeof Tween) => void;
};
/**
 * {@see https://github.com/nombrekeff/cardboard-js/wiki/Tweening}
 */
export declare function makeTween<T extends {}>(opts: TweenOptions<T>): Tween<T>;
/**
 * {@see https://github.com/nombrekeff/cardboard-js/wiki/Tweening}
 */
export declare function tweenTag(tag: CTag, tween: (tag: CTag) => Tween<any>, onComplete?: () => void): CTag;
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Tweening
 */
export declare function tweenTagAsync(tag: CTag, tween: (tag: CTag) => Tween<any>): Promise<CTag>;
