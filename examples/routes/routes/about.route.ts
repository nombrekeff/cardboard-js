import {
  allTags,
  withLifecycle,
} from '../node_modules/cardboard-js/dist/cardboard.js';

const { div, h3, p } = allTags;

export const AboutRoute = () => {
  console.debug('About Route');
  return withLifecycle(
    div(
      h3('About Page'),
      p('Welcome to the Cardboard Routing about page'),
      p(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ),
    ),
    {
      // start(tag) {
      //   console.log('start');
      //   tweenTag(tag, fadeOut);
      // },
      // beforeRemove(tag) {
      //   return new Promise((resolve) =>
      //     tweenTag(tag, fadeIn, () => resolve(true)),
      //   );
      // },
    },
  );
};
