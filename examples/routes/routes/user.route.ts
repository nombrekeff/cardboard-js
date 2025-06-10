import {
  allTags,
  withLifecycle,
} from '../../../dist/cardboard.js';
import { router } from '../../../dist/ext/routing.js';

const { div, h3, p } = allTags;

export const UserRoute = () => {
  console.log(router);
  return withLifecycle(
    div(
      h3('User Page'),
      p('Welcome to the Cardboard Routing User page'),
      p(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ),
    ),
    {
      // mounted(tag) {
      //   console.debug('User is: ', router.params.id, router);
      //   tweenTag(tag, fadeOut);
      // },
      // beforeUnmounted(tag) {
      //   return new Promise((resolve) =>
      //     tweenTag(tag, fadeIn, () => resolve(true)),
      //   );
      // },
    },
  );
};
