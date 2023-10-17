import {
  init,
  allTags,
  tag,
} from './node_modules/cardboard-js/dist/cardboard.js';
import { makeRouter } from './node_modules/cardboard-js/dist/routing.js';

import { Header } from './components/header.js';
import { AboutRoute } from './routes/about.route.js';
import { HomeRoute } from './routes/home.route.js';

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
    '/404': (router) => div('404: Route not found: ' + router.currentRoute),
  },
  initialRoute: '/',
  fallbackRoute: '/404',
});

console.debug(myRouter);
// myRouter.navigate('/about');

// setTimeout(() => myRouter.navigate('/home'), 2000);