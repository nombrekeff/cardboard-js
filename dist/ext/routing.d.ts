import { CTag } from '../tag.js';
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
export declare class Router<T extends Record<string, Route> = {}> {
    private _options;
    private _routes;
    private _window;
    private _location;
    private _history;
    private _currentRoute?;
    private _currentTag?;
    private _rootParent;
    private _routeMatchers;
    params: Record<string, string>;
    query: URLSearchParams;
    get currentRoute(): string;
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
export declare let router: Router<any> | undefined;
export declare function makeRouter<T extends Record<string, Route> = {}>(opts: RouterOptions<T>): Router<T>;
export declare function Link(child: string | CTag, path: any, query?: Record<string, string>): CTag;
