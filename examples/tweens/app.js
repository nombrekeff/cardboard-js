import { init, allTags, withLifecycle } from '../../dist/cardboard.js';
import { makeTween, tweenTag, tween } from '../../dist/ext/tween.js';
const { div, br } = allTags;
const sizeEnd = { w: 350, h: 350 };
const sizeStart = { w: 0, h: 0 };
const sharedOpts = { duration: 300, easing: tween.Easing.Quadratic.InOut };
const updateTag = (tag, value) => tag.setStyle({ width: `${value.w}px`, height: `${value.h}px` });
const bounceOut = (tag) => makeTween(Object.assign(Object.assign({ from: Object.assign({}, sizeEnd), to: Object.assign({}, sizeStart) }, sharedOpts), { update: updateTag.bind(this, tag) }));
const bounceIn = (tag) => makeTween(Object.assign(Object.assign({ from: Object.assign({}, sizeStart), to: Object.assign({}, sizeEnd) }, sharedOpts), { update: updateTag.bind(this, tag) }));
const Box = () => {
    return withLifecycle(div().setStyle({
        width: `${sizeEnd.w}px`,
        height: `${sizeEnd.h}px`,
        background: '#f3f3f3',
        borderRadius: '8px',
        display: 'inline-block',
    }), {
        start(tag) {
            tweenTag(tag, bounceIn);
            return true;
        },
        beforeRemove(tag) {
            return new Promise((resolve) => tweenTag(tag, bounceOut, () => resolve(true)));
        },
    });
};
let box;
init()
    .append((box = Box()), br())
    .clicked((_) => {
    if (box.element.parentElement)
        box.hide();
    else
        box.show();
})
    .setStyle({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    margin: '0',
});
