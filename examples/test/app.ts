import { init, allTags, state, getMountPoint, CTag, each } from '../../dist/cardboard.js';

const { div, button, input, ul, li, hr, style } = allTags;
const root = init();

console.log('Cardboard.js - each example');

const randomStrings = Array.from({ length: 20 }, () =>
    Math.random().toString(36).substring(2, 10)
);
const randomList = () => Array.from({ length: 50 }, () =>
    ul(
        each(randomStrings, (item) => li(item)),
    )
);

root.append(
    ...randomList()
);