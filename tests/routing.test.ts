import { createDomMock } from './__mocks__/client';
import { Link, makeRouter } from '../src/routing/routing';
import { tag, allTags, init } from '../src/tag';
const { div } = allTags;

describe('Routing', () => {
  it('router basic shows correct route', async () => {
    createDomMock();

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

    expect(Array.from(document.body.children)).toContain(home.element);
    router.navigate('/about');
    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.element);
    expect(Array.from(document.body.children)).toContain(about.element);

    router.navigate('/home');
    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).toContain(home.element);
    expect(Array.from(document.body.children)).not.toContain(about.element);
    expect(HomeRoute).toBeCalledTimes(1);
  });

  it('router basic shows correct route for alias', async () => {
    createDomMock();

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

    expect(Array.from(document.body.children)).toContain(home.element);
  });

  it('router shows fallback route', async () => {
    createDomMock();

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

    expect(Array.from(document.body.children)).toContain(home.element);
    router.navigate('/not-exists');

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.element);
    expect(Array.from(document.body.children)).not.toContain(about.element);
    expect(Array.from(document.body.children)).toContain(fallback.element);
  });

  it('router shows noRouteBuilder if no route and no fallback', async () => {
    createDomMock();

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

    expect(Array.from(document.body.children)).toContain(home.element);
    router.navigate('/not-exists');

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.element);
    expect(Array.from(document.body.children)).not.toContain(about.element);
    expect(Array.from(document.body.children)).toContain(fallback.element);
  });

  it('router shows error if it has no fallback or noRouteBuilder defined', async () => {
    createDomMock();

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

    expect(Array.from(document.body.children)).toContain(home.element);
    router.navigate('/not-exists');

    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(Array.from(document.body.children)).not.toContain(home.element);
    expect(Array.from(document.body.children)).not.toContain(about.element);
    expect(Array.from(document.body.children)[0].textContent).toEqual(
      'No route found for: /not-exists',
    );
  });

  it('router basic shows correct route', async () => {
    createDomMock();

    const home = div('Home');
    const about = div('About');
    const link = Link('Test', '/about');

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

    init().append(link);

    link.element.dispatchEvent(new window.Event('click'));
    await new Promise((r) => setTimeout(r, 100)); // Wait a bit before showing, otherwise it does have time to register changes

    expect(Array.from(document.body.children)).toContain(about.element);
  });

  it('router params work', async () => {
    createDomMock();

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
    expect(Array.from(document.body.children)).toContain(home.element);
  });

  it('query params work', async () => {
    createDomMock();

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
