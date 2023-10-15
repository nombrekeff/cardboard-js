import { init, allTags, CTag, withLifecycle } from '../../dist/cardboard.js';
import { makeTween, tweenTag, tween } from '../../dist/ext/tween.js';

const { div, br } = allTags;

const sizeEnd = { w: 350, h: 350 };
const sizeStart = { w: 0, h: 0 };

const bounceOut = (tag: CTag) =>
  makeTween({
    from: { ...sizeEnd },
    to: { ...sizeStart },
    duration: 300,
    easing: tween.Easing.Quadratic.InOut,
    update: (value) =>
      tag.setStyle({ width: `${value.w}px`, height: `${value.h}px` }),
  });

const bounceIn = (tag: CTag) =>
  makeTween({
    from: { ...sizeStart },
    to: { ...sizeEnd },
    duration: 1000,
    easing: tween.Easing.Elastic.InOut,
    update: (value) =>
      tag.setStyle({ width: `${value.w}px`, height: `${value.h}px` }),
  });

const Box = () => {
  return withLifecycle(
    div().setStyle({
      width: `${sizeEnd.w}px`,
      height: `${sizeEnd.h}px`,
      background: '#f3f3f3',
      scale: '.6',
      borderRadius: '8px',
      display: 'inline-block',
    }),
    {
      start(tag) {
        tweenTag(tag, bounceIn);
      },
      beforeRemove(tag) {
        return new Promise((resolve) =>
          tweenTag(tag, bounceOut, () => resolve(true)),
        );
      },
    },
  );
};

let box: CTag;
init()
  .append((box = Box()), br())
  .clicked((self) => {
    if (box.element.parentElement) box.hide();
    else box.show();
  })
  .setStyle({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    margin: '0',
  });
