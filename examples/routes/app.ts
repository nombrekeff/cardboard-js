import {
  init,
  allTags,
  tag,
} from './node_modules/cardboard-js/dist/cardboard.js';
import {
  tweenTag,
  tweenTagAsync,
} from './node_modules/cardboard-js/dist/ext/tween.js';
import { makeRouter } from './node_modules/cardboard-js/dist/routing/routing.js';

import { Header } from './components/header.js';
import { AboutRoute } from './routes/about.route.js';
import { HomeRoute } from './routes/home.route.js';
import { UserRoute } from './routes/user.route.js';
import { fadeIn, fadeOut } from './components/app-tweens.js';

const { div } = allTags;

tag('(html)').setStyle({ overflow: 'hidden' });

const root = init().setStyle({
  height: '100vh',
  margin: '0',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Arial',
});

root.append(Header());

const appWell = div().setId('app-well').setStyle({
  backgroundColor: 'smokeewhite',
  border: '1px solid #ddd',
  padding: '12px',
  flex: '1 1 auto',
});
root.append(appWell);

const myRouter = makeRouter({
  rootParent: appWell,
  routes: {
    '/home': '/', // Alias from /home to /
    '/': (_) => HomeRoute(),
    '/about': (_) => AboutRoute(),
    '/user/:id': (_) => UserRoute(),
    '/404': (router) => div('404: Route not found: ' + router.currentRoute),
  },
  initialRoute: '/',
  fallbackRoute: '/404',
  async start(route) {
    await tweenTagAsync(route, fadeOut);
    return true;
  },
  async beforeRemove(route) {
    await tweenTagAsync(route, fadeIn);
    return true;
  },
});

const pageSequence = [
  '/',
  '/about',
  '/user/123',
  '/home',
  '/about',
  '/',
  '/about',
  '/user/123',
  '/user/234',
  '/home',
  '/about',
];
let index = 0;
let interval = setInterval(() => {
  if (index < pageSequence.length - 1) {
    myRouter.navigate(pageSequence[index++]);
  } else {
    clearInterval(interval);
  }
}, 500);
