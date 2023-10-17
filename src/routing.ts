import { allTags, CTag } from './tag.js';

const { div, a } = allTags;

type RouteBuilder = (router: Router<any>) => CTag;
type Route = RouteBuilder | string;

type RouterOptions<T extends Record<string, Route> = {}> = {
  rootParent: CTag;
  routes: T;
  initialRoute: string;
  fallbackRoute?: string;
  noRoot?: RouteBuilder;
  window?: Window & typeof globalThis;
};

export class Router<T extends Record<string, Route> = {}> {
  private _options: RouterOptions<T>;
  private _routes: Record<string, CTag> = {};
  private _window: Window & typeof globalThis;
  private _location: Location;
  private _history: History;
  private _currentRoute?: string;
  private _currentRouteTag?: CTag;
  private _rootParent: CTag;

  public rootNames: keyof T;

  public get currentRoute(): string {
    return this._currentRoute;
  }

  constructor(options: RouterOptions<T>) {
    this._options = options;
    this._rootParent = options.rootParent;
    this._window = options.window ?? window;
    this._location = this._window.location;
    this._history = this._window.history;

    this._modifyPushState();
    this._listenEvents();

    this.navigate(this._options.initialRoute);
  }

  public navigate(path: string) {
    console.debug(`[Router] -> Navigate to ${path}`);
    if (path != this._currentRoute) {
      this._history.pushState('data', '', path);
    }
  }

  private async _setRoute() {
    console.debug(`[Router] -> _setRoute ${this._currentRoute}`);

    if (this._currentRouteTag) {
      await this._currentRouteTag.hide();
    }

    const route = this._getRoute();
    this._rootParent.append(route);
    this._currentRouteTag = route;
  }

  private _getRoute() {
    console.debug(`[Router] -> _getRoute ${this._currentRoute}`);

    let effectiveRoute = this._currentRoute;
    let maxCalls = 10000;

    while (
      typeof this._options.routes[effectiveRoute] === 'string' &&
      maxCalls--
    ) {
      let alias = this._options.routes[effectiveRoute];
      if (typeof alias === 'string') {
        console.debug(
          `[Router] -> _getRoute ${effectiveRoute} is alias for ${alias}`,
        );
        effectiveRoute = alias;
      } else {
        break;
      }
    }

    if (!(effectiveRoute in this._options.routes)) {
      console.debug(
        `[Router] -> _getRoute ${effectiveRoute} not found, fallback to ${this._options.fallbackRoute}`,
      );
      effectiveRoute = this._options.fallbackRoute;
    }

    if (!(effectiveRoute in this._options.routes)) {
      console.debug(
        `[Router] -> _getRoute ${effectiveRoute} not found in the router, fallback to "noRoot" or default error`,
      );
      return this._options.noRoot
        ? this._options.noRoot(this)
        : div('No route found for: ' + effectiveRoute);
    }

    // If the route is already built before, just return that
    if (this._routes[effectiveRoute]) {
      console.debug(
        `[Router] -> _getRoute ${effectiveRoute} is cached, using that`,
      );
      this._routes[effectiveRoute].show();
      return this._routes[effectiveRoute];
    }

    let routeBuilder = this._options.routes[effectiveRoute];
    if (typeof routeBuilder !== 'function') {
      throw new Error('Can find route builder for ' + this._currentRoute);
    }
    console.debug(
      `[Router] -> _getRoute ${effectiveRoute} is not cached, creating new one`,
    );
    return (this._routes[effectiveRoute] = routeBuilder(this));
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
      this._window.dispatchEvent(new Event('pushstate'));
    };
  }
}

export let router: Router<any> | undefined;

export function makeRouter<T extends Record<string, Route> = {}>(
  opts: RouterOptions<T>,
) {
  router = new Router<T>(opts);
  return router as Router<T>;
}

export function Link(child: string | CTag, path) {
  return a(child)
    .addAttr('href', 'javascript:;')
    .setStyle({ margin: '0 8px 0 0' })
    .clicked(() => {
      if (!router) {
        throw new Error('Link can\t navigate, there is no router available');
      }

      router.navigate(path);
    });
}

export default {};
