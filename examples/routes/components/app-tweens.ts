import { CTag } from '../node_modules/cardboard-js/dist/cardboard.js';
import {
  makeTween,
  tween,
} from '../node_modules/cardboard-js/dist/ext/tween.js';

const opacityEnd = { opacity: 1 };
const opacityStart = { opacity: 0 };

export const fadeIn = (tag: CTag) =>
  makeTween({
    from: { ...opacityEnd },
    to: { ...opacityStart },
    duration: 350,
    easing: tween.Easing.Quadratic.InOut,
    update: (value) => tag.setStyle({ opacity: `${value.opacity}` }),
  });

export const fadeOut = (tag: CTag) =>
  makeTween({
    from: { ...opacityStart },
    to: { ...opacityEnd },
    duration: 350,
    easing: tween.Easing.Quadratic.InOut,
    update: (value) => tag.setStyle({ opacity: `${value.opacity}` }),
  });
