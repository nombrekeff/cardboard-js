var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as TWEEN from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
import * as tween_1 from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
export { tween_1 as tween };
/**
 * {@see https://github.com/nombrekeff/cardboard-js/wiki/Tweening}
 */
export function makeTween(opts) {
    var _a, _b;
    // This is done to remove flickering the first time the tween is run
    // This will set properties to the initial value.
    // This way when the tween is run, it will start with the correct properties.
    if (opts.update)
        opts.update(opts.from, this);
    return new TWEEN.Tween(opts.from)
        .to(opts.to, opts.duration)
        .repeat((_a = opts.repeat) !== null && _a !== void 0 ? _a : 0)
        .onUpdate(function () {
        if (opts.update)
            opts.update(opts.from, this);
    })
        .easing((_b = opts.easing) !== null && _b !== void 0 ? _b : TWEEN.Easing.Quadratic.InOut);
}
/**
 * {@see https://github.com/nombrekeff/cardboard-js/wiki/Tweening}
 */
export const tweenTag = (tag, tween, onComplete) => {
    const tweenInstance = tween(tag);
    tweenInstance.start();
    const animate = (time) => {
        const id = requestAnimationFrame(animate);
        const result = tweenInstance.update(time);
        if (!result) {
            cancelAnimationFrame(id);
            if (onComplete)
                onComplete();
        }
    };
    requestAnimationFrame(animate);
    return tag;
};
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Tweening
 */
export const tweenTagAsync = (tag, tween) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => tweenTag(tag, tween, () => {
        resolve(tag);
    }));
});
//# sourceMappingURL=tween.js.map