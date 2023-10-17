import { CTag } from '../tag.js';
type RouteBuilder = (router: Router<any>) => CTag;
type Route = RouteBuilder | string;
type RouterOptions<T extends Record<string, Route> = {}> = {
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
export declare class Router<T extends Record<string, Route> = {}> {
    private _options;
    private _routes;
    private _window;
    private _location;
    private _history;
    private _currentRoute?;
    private _currentRouteTag?;
    private _rootParent;
    private _routeMatchers;
    params: Record<string, string>;
    query: URLSearchParams;
    get currentRoute(): string;
    constructor(options: RouterOptions<T>);
    navigate(path: string, query?: Record<string, string>): void;
    private _setRoute;
    private _hookLifecycle;
    private _getEffectiveRoute;
    private _getRoute;
    private _setCurrentRoute;
    private _listenEvents;
    private _modifyPushState;
    _initRouteMatchers(): void;
}
export declare let router: Router<any> | undefined;
export declare function makeRouter<T extends Record<string, Route> = {}>(opts: RouterOptions<T>): Router<T>;
export declare function Link(child: string | CTag, path: any, query?: Record<string, string>): CTag;
export {};
