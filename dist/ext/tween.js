import * as tween_1 from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
export { tween_1 as tween };
import * as TWEEN from '../../node_modules/@tweenjs/tween.js/dist/tween.esm.js';
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
export function tweenTag(tag, tween, onComplete) {
    const tweenInstance = tween(tag);
    tweenInstance.start();
    function animate(time) {
        const id = requestAnimationFrame(animate);
        const result = tweenInstance.update(time);
        if (!result) {
            cancelAnimationFrame(id);
            if (onComplete)
                onComplete();
        }
    }
    requestAnimationFrame(animate);
    return tag;
}
export function tweenTagAsync(tag, tween) {
    return new Promise((resolve) => tweenTag(tag, tween, () => resolve(tag)));
}
//# sourceMappingURL=tween.js.map