/** @jest-environment jsdom */

import { Link, makeRouter } from '../src/ext/routing';
import { tag } from '../src/tag';
import { allTags, init } from '../src/cardboard';
const { div } = allTags;

describe('Routing', () => {
  beforeAll(() => {
    init({ selector: 'body' });
  });
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('router basic shows correct route', async () => {
    const home = div('Home');
    const about = div('About');

    const HomeRoute = jest.fn(() => home);
    const AboutRoute = jest.fn(() => about);

    const router = makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/home': HomeRoute,
        '/about': AboutRoute,
      },
      initialRoute: '/home',
    });

    expect(Array.from(document.body.children)).toContain(home.el);
    router.navigate('/about');
    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.el);
    expect(Array.from(document.body.children)).toContain(about.el);

    router.navigate('/home');
    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).toContain(home.el);
    expect(Array.from(document.body.children)).not.toContain(about.el);
    expect(HomeRoute).toBeCalledTimes(1);
  });

  it('router basic shows correct route for alias', async () => {
    const home = div('Home');
    const about = div('About');

    const HomeRoute = () => home;
    const AboutRoute = () => about;

    const router = makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/': HomeRoute,
        '/home': '/',
        '/about': AboutRoute,
      },
      initialRoute: '/home',
    });

    expect(Array.from(document.body.children)).toContain(home.el);
  });

  it('router shows fallback route', async () => {
    const home = div('Home');
    const about = div('About');
    const fallback = div('Fallback');

    const HomeRoute = () => home;
    const AboutRoute = () => about;
    const FallbackRoute = () => fallback;

    const router = makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/home': HomeRoute,
        '/about': AboutRoute,
        '/fallback': FallbackRoute,
      },
      initialRoute: '/home',
      fallbackRoute: '/fallback',
    });

    expect(Array.from(document.body.children)).toContain(home.el);
    router.navigate('/not-exists');

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.el);
    expect(Array.from(document.body.children)).not.toContain(about.el);
    expect(Array.from(document.body.children)).toContain(fallback.el);
  });

  it('router shows noRouteBuilder if no route and no fallback', async () => {
    const home = div('Home');
    const about = div('About');
    const fallback = div('Fallback');

    const HomeRoute = () => home;
    const AboutRoute = () => about;

    const router = makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/home': HomeRoute,
        '/about': AboutRoute,
      },
      noRouteBuilder(router) {
        return fallback;
      },
      initialRoute: '/home',
    });

    expect(Array.from(document.body.children)).toContain(home.el);
    router.navigate('/not-exists');

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.el);
    expect(Array.from(document.body.children)).not.toContain(about.el);
    expect(Array.from(document.body.children)).toContain(fallback.el);
  });

  it('router shows error if it has no fallback or noRouteBuilder defined', async () => {
    const home = div('Home');
    const about = div('About');

    const HomeRoute = () => home;
    const AboutRoute = () => about;

    const router = makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/home': HomeRoute,
        '/about': AboutRoute,
      },
      initialRoute: '/home',
    });

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).toContain(home.el);
    router.navigate('/not-exists');

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.el);
    expect(Array.from(document.body.children)).not.toContain(about.el);
    expect(Array.from(document.body.children)[0].textContent).toEqual(
      'No route found for: /not-exists',
    );
  });

  it('router basic shows correct route', async () => {
    const home = div('Home');
    const about = div('About');

    const HomeRoute = jest.fn(() => home);
    const AboutRoute = jest.fn(() => about);

    makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/home': HomeRoute,
        '/about': AboutRoute,
      },
      initialRoute: '/home',
    });

    const link = Link('Test', '/about');
    init().append(link);

    link.el.dispatchEvent(new window.Event('click'));
    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes

    expect(Array.from(document.body.children)).toContain(about.el);
  });

  it('router params work', async () => {

    const home = div('Home');
    const about = div('About');
    const HomeRoute = jest.fn(() => home);
    const AboutRoute = jest.fn(() => about);

    makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/home/:id': HomeRoute,
        '/about': AboutRoute,
      },
      initialRoute: '/home/123',
    });

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).toContain(home.el);
  });

  it('query params work', async () => {

    const home = div('Home');
    const about = div('About');
    const HomeRoute = jest.fn(() => home);
    const AboutRoute = jest.fn(() => about);

    const router = makeRouter({
      rootParent: tag('(body)'),
      routes: {
        '/home/:id': HomeRoute,
        '/about': AboutRoute,
      },
      initialRoute: '/home/123',
    });

    router.navigate('/about', { q: '123' });

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(window.location.search).toEqual('?q=123');
  });
});
