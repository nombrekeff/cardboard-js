import { allTags, CTag, onLifecycle } from '../tag.js';
import { RouteMatcher, routeMatcher } from '../route-matcher.js';

const { div, a } = allTags;

export type RouteBuilder = (router: Router<any>) => CTag;
export type Route = RouteBuilder | string;

export type RouterOptions<T extends Record<string, Route> = {}> = {
  rootParent: CTag;
  routes: T;
  initialRoute: string;
  fallbackRoute?: string;
  noRouteBuilder?: RouteBuilder;
  window?: Window & typeof globalThis;
  start?: (route: CTag) => Promise<boolean> | boolean;
  remove?: (route: CTag) => Promise<boolean> | boolean;
  beforeRemove?: (route: CTag) => Promise<boolean> | boolean;
};

/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Routing
 */
export class Router<T extends Record<string, Route> = {}> {
  private _options: RouterOptions<T>;
  private _routes: Record<string, CTag> = {};
  private _window: Window & typeof globalThis;
  private _location: Location;
  private _history: History;
  private _currentRoute?: string;
  private _currentTag?: CTag;
  private _rootParent: CTag;
  private _routeMatchers: { matcher: RouteMatcher; key: string }[] = [];

  public params: Record<string, string> = {};
  public query: URLSearchParams = new URLSearchParams();

  public get currentRoute(): string {
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

    if (route != this._currentRoute || queryStr !== cQuery) {
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
    } //
    else {
      this._hookLifecycle(route);
      this._rootParent.append(route);
    }

    this._currentTag = route;
  }

  private _hookLifecycle(route: CTag) {
    const options = this._options;
    if (!options.remove && !options.start) return;

    onLifecycle(
      route,
      options.start ? options.start : null,
      options.remove ? options.remove : null,
      options.beforeRemove ? options.beforeRemove : null,
    );
  }

  // Follow aliases until a valid route is found
  private _getEffectiveRoute() {
    let effectiveRoute = this._currentRoute,
      maxCalls = 10000,
      alias;

    while (
      typeof (alias = this._options.routes[effectiveRoute]) === 'string' &&
      maxCalls--
    ) {
      if (typeof alias === 'string') {
        effectiveRoute = alias;
      } else break;
    }

    return effectiveRoute;
  }

  private _getRoute() {
    let navigatedRoute = this._getEffectiveRoute(),
      route = navigatedRoute,
      matched = false,
      opts = this._options;

    this.query = new URLSearchParams(this._location.search);

    // Find matcher
    for (let { matcher, key } of this._routeMatchers) {
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
      this._routes[route].show();
      return this._routes[route];
    }

    let builder = opts.routes[route];
    if (typeof builder !== 'function') {
      throw new Error('Can find route builder for ' + this._currentRoute);
    }
    return (this._routes[route] = builder(this));
  }

  private _setCurrentRoute() {
    if (this.currentRoute == this._location.pathname) return;

    this._currentRoute = this._location.pathname;
    this._setRoute();
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
    for (let matcherStr in this._options.routes) {
      this._routeMatchers.push({
        key: matcherStr,
        matcher: routeMatcher(matcherStr),
      });
    }
  }
}

export let router: Router<any> | undefined;

export function makeRouter<T extends Record<string, Route> = {}>(
  opts: RouterOptions<T>,
) {
  return (router = new Router<T>(opts));
}

export function Link(
  child: string | CTag,
  path,
  query?: Record<string, string>,
) {
  return a(child)
    .addAttr('href', 'javascript:;')
    .setStyle({ margin: '0 8px 0 0' })
    .clicked(() => {
      if (!router) {
        throw new Error('Link can\t navigate, there is no router available');
      }

      router.navigate(path, query);
    });
}
