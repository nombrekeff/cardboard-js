import { RouteMatcher, routeMatcher } from './route-matcher.js';
import { allTags, type CTag, onLifecycle, withLifecycle } from '../cardboard.js';

const { div, a } = allTags;

export type RouteBuilder = (router: Router<any>) => CTag;
export type Route = RouteBuilder | string;

export interface RouterOptions<
  T extends Record<string, Route> = Record<string, Route>,
> {
  rootParent: CTag;
  routes: T;
  initialRoute: string;
  fallbackRoute?: string;
  noRouteBuilder?: RouteBuilder;
  window?: Window & typeof globalThis;
  mounted?: (route: CTag) => Promise<boolean> | boolean;
  unmounted?: (route: CTag) => void;
  beforeUnmounted?: (route: CTag) => Promise<boolean> | boolean;
}

/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Routing
 */
export class Router<T extends Record<string, Route> = Record<string, Route>> {
  private readonly _options: RouterOptions<T>;
  private _routes: Record<string, CTag> = {};
  private readonly _window: Window & typeof globalThis;
  private readonly _location: Location;
  private readonly _history: History;
  private _currentRoute?: string;
  private _currentTag?: CTag;
  private readonly _rootParent: CTag;
  private readonly _routeMatchers: Array<{
    matcher: RouteMatcher;
    key: string;
  }> = [];

  public params: Record<string, string> = {};
  public query: URLSearchParams = new URLSearchParams();

  public get currentRoute(): string | undefined {
    return this._currentRoute;
  }

  constructor(options: RouterOptions<T>) {
    this._options = options;
    this._rootParent = options.rootParent;
    this._window = options.window ?? window;
    this._location = this._window.location;
    this._history = this._window.history;

    this._initRouteMatchers();
    this._modifyPushState();
    this._listenEvents();

    this.navigate(this._options.initialRoute);
  }

  /**
   * Navigate to a {@link route} with optional {@link query} parameters.
   * @see https://github.com/nombrekeff/cardboard-js/wiki/Routing
   */
  public navigate(route: string, query?: Record<string, string>) {
    const querySearch = new URLSearchParams(query),
      queryStr = querySearch.toString(),
      cQuery = this.query.toString();

    if (route !== this._currentRoute || queryStr !== cQuery) {
      this.query = querySearch;
      this._history.pushState(
        'data',
        '',
        route + (queryStr ? '?' + queryStr : ''),
      );
    }
  }

  private async _setRoute() {
    if (this._currentTag) {
      await this._currentTag.hide();
    }

    const route = this._getRoute();

    if (route.parent) {
      await route.show();
    }
    else {
      this._hookLifecycle(route);
      this._rootParent.append(route);
    }

    this._currentTag = route;
  }

  private _hookLifecycle(route: CTag) {
    const options = this._options;
    if (!options.unmounted && !options.mounted) return;
    withLifecycle(
      route,
      {
        mounted: options.mounted,
        unmounted: options.unmounted,
        beforeUnmounted: options.beforeUnmounted,
      }
    );

    onLifecycle(route, options.mounted, options.unmounted, options.beforeUnmounted);
  }

  // Follow aliases until a valid route is found
  private _getEffectiveRoute() {
    if (!this._currentRoute) {
      return undefined;
    }

    let effectiveRoute = this._currentRoute,
      maxCalls = 10000,
      alias;

    while (
      typeof (alias = this._options.routes[effectiveRoute]) === 'string' &&
      maxCalls--
    ) {
      if (typeof alias === 'string') {
        effectiveRoute = alias;
      }
      else break;
    }

    return effectiveRoute;
  }

  private _getRoute() {
    const navigatedRoute = this._getEffectiveRoute(),
      opts = this._options;
    let route: any = navigatedRoute,
      matched = false;

    this.query = new URLSearchParams(this._location.search);

    // Find matcher
    for (const { matcher, key } of this._routeMatchers) {
      const params = matcher.parse(route);
      if (params) {
        this.params = params;
        route = key;
        matched = true;
        break;
      }
    }

    if (!matched) {
      route = opts.fallbackRoute;
    }

    if (!(route in opts.routes)) {
      return opts.noRouteBuilder
        ? opts.noRouteBuilder(this)
        : div('No route found for: ' + navigatedRoute);
    }

    // If the route is already built before, just return that
    if (this._routes[route]) {
      void this._routes[route].show();
      return this._routes[route];
    }

    const builder = opts.routes[route];
    if (typeof builder !== 'function') {
      throw new Error('Can\'t find route builder for ' + this._currentRoute);
    }

    return (this._routes[route] = builder(this));
  }

  private _setCurrentRoute() {
    if (this.currentRoute === this._location.pathname) return;
    this._currentRoute = this._location.pathname;
    void this._setRoute();
  }

  private _listenEvents() {
    this._window.addEventListener('popstate', this._setCurrentRoute.bind(this));
    this._window.addEventListener(
      'pushstate',
      this._setCurrentRoute.bind(this),
    );
  }

  private _modifyPushState() {
    const pushState = this._history.pushState;
    this._history.pushState = (...args) => {
      pushState.call(this._history, ...args);
      this._window.dispatchEvent(new window.Event('pushstate'));
    };
  }

  private _initRouteMatchers() {
    for (const matcherStr in this._options.routes) {
      this._routeMatchers.push({
        key: matcherStr,
        matcher: routeMatcher(matcherStr),
      });
    }
  }
}

// TODO(nombrekeff): Should we export this like this? Maybe add to cardboard context?
export let router: Router<any> | undefined;

export const makeRouter = <T extends Record<string, Route> = Record<string, Route>>(opts: RouterOptions<T>) => {
  return (router = new Router<T>(opts));
};

export const Link = (
  child: string | CTag,
  path,
  query?: Record<string, string>,
) => {
  return a(child)
    .addAttr('href', 'javascript:;')
    .setStyle({ margin: '0 8px 0 0' })
    .clicked(() => {
      if (!router) {
        throw new Error('Link can\t navigate, there is no router available');
      }

      router.navigate(path, query);
    });
};
