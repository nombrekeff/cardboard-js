import { CTag } from './tag.js';
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
export declare class Router<T extends Record<string, Route> = {}> {
    private _options;
    private _routes;
    private _window;
    private _location;
    private _history;
    private _currentRoute?;
    private _currentRouteTag?;
    private _rootParent;
    rootNames: keyof T;
    get currentRoute(): string;
    constructor(options: RouterOptions<T>);
    navigate(path: string): void;
    private _setRoute;
    private _getRoute;
    private _setCurrentRoute;
    private _listenEvents;
    private _modifyPushState;
}
export declare let router: Router<any> | undefined;
export declare function makeRouter<T extends Record<string, Route> = {}>(opts: RouterOptions<T>): Router<T>;
export declare function Link(child: string | CTag, path: any): CTag;
declare const _default: {};
export default _default;
//# sourceMappingURL=routing.d.ts.map