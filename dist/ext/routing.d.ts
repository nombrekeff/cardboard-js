import { CTag } from '../cardboard.js';

type RouteBuilder = (router: Router<any>) => CTag;
type Route = RouteBuilder | string;
interface RouterOptions<T extends Record<string, Route> = Record<string, Route>> {
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
declare class Router<T extends Record<string, Route> = Record<string, Route>> {
    private readonly _options;
    private _routes;
    private readonly _window;
    private readonly _location;
    private readonly _history;
    private _currentRoute?;
    private _currentTag?;
    private readonly _rootParent;
    private readonly _routeMatchers;
    params: Record<string, string>;
    query: URLSearchParams;
    get currentRoute(): string | undefined;
    constructor(options: RouterOptions<T>);
    /**
     * Navigate to a {@link route} with optional {@link query} parameters.
     * @see https://github.com/nombrekeff/cardboard-js/wiki/Routing
     */
    navigate(route: string, query?: Record<string, string>): void;
    private _setRoute;
    private _hookLifecycle;
    private _getEffectiveRoute;
    private _getRoute;
    private _setCurrentRoute;
    private _listenEvents;
    private _modifyPushState;
    private _initRouteMatchers;
}
declare let router: Router<any> | undefined;
declare const makeRouter: <T extends Record<string, Route> = Record<string, Route>>(opts: RouterOptions<T>) => Router<T>;
declare const Link: (child: string | CTag, path: any, query?: Record<string, string>) => CTag;

export { Link, type Route, type RouteBuilder, Router, type RouterOptions, makeRouter, router };
