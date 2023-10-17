var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { allTags } from '../tag.js';
import { routeMatcher } from './route-matcher.js';
const { div, a } = allTags;
export class Router {
    get currentRoute() {
        return this._currentRoute;
    }
    constructor(options) {
        var _a;
        this._routes = {};
        this._routeMatchers = [];
        this.params = {};
        this.query = new URLSearchParams();
        this._options = options;
        this._rootParent = options.rootParent;
        this._window = (_a = options.window) !== null && _a !== void 0 ? _a : window;
        this._location = this._window.location;
        this._history = this._window.history;
        this._initRouteMatchers();
        this._modifyPushState();
        this._listenEvents();
        this.navigate(this._options.initialRoute);
    }
    navigate(path, query) {
        const querySearch = new URLSearchParams(query);
        const queryStr = querySearch.toString();
        const cQuery = this.query.toString();
        console.debug(`[Router] -> Navigate to ${path}`, { queryStr, cQuery });
        if (path != this._currentRoute || queryStr !== cQuery) {
            this.query = querySearch;
            this._history.pushState('data', '', path + (queryStr ? '?' + queryStr : ''));
        }
    }
    _setRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug(`[Router] -> _setRoute ${this._currentRoute}`);
            if (this._currentRouteTag) {
                yield this._currentRouteTag.hide();
            }
            const route = this._getRoute();
            if (route.parent)
                route.show();
            else {
                this._rootParent.append(route);
            }
            this._currentRouteTag = route;
        });
    }
    // Follow aliases until a valid route is found
    _getEffectiveRoute() {
        let effectiveRoute = this._currentRoute;
        let maxCalls = 10000;
        while (typeof this._options.routes[effectiveRoute] === 'string' &&
            maxCalls--) {
            let alias = this._options.routes[effectiveRoute];
            if (typeof alias === 'string') {
                console.debug(`[Router] -> _getRoute ${effectiveRoute} is alias for ${alias}`);
                effectiveRoute = alias;
            }
            else {
                break;
            }
        }
        return effectiveRoute;
    }
    _getRoute() {
        console.debug(`[Router] -> _getRoute ${this._currentRoute}`);
        let navigatedRoute = this._getEffectiveRoute();
        let effectiveRoute = navigatedRoute;
        this.query = new URLSearchParams(this._location.search);
        // Find matcher
        let matched = false;
        for (let matcher of this._routeMatchers) {
            const params = matcher.matcher.parse(effectiveRoute);
            if (params) {
                effectiveRoute = matcher.key;
                this.params = params;
                matched = true;
                break;
            }
        }
        if (!matched) {
            console.debug(`[Router] -> _getRoute ${navigatedRoute} not found, fallback to ${this._options.fallbackRoute}`);
            effectiveRoute = this._options.fallbackRoute;
        }
        if (!(effectiveRoute in this._options.routes)) {
            console.debug(`[Router] -> _getRoute ${navigatedRoute} not found in the router, fallback to "noRoot" or default error`);
            return this._options.noRouteBuilder
                ? this._options.noRouteBuilder(this)
                : div('No route found for: ' + navigatedRoute);
        }
        // If the route is already built before, just return that
        if (this._routes[effectiveRoute]) {
            console.debug(`[Router] -> _getRoute ${effectiveRoute} is cached, using that`);
            this._routes[effectiveRoute].show();
            return this._routes[effectiveRoute];
        }
        let routeBuilder = this._options.routes[effectiveRoute];
        if (typeof routeBuilder !== 'function') {
            throw new Error('Can find route builder for ' + this._currentRoute);
        }
        console.debug(`[Router] -> _getRoute ${effectiveRoute} is not cached, creating new one`);
        return (this._routes[effectiveRoute] = routeBuilder(this));
    }
    _setCurrentRoute() {
        if (this.currentRoute == this._location.pathname)
            return;
        this._currentRoute = this._location.pathname;
        this._setRoute();
    }
    _listenEvents() {
        this._window.addEventListener('popstate', this._setCurrentRoute.bind(this));
        this._window.addEventListener('pushstate', this._setCurrentRoute.bind(this));
    }
    _modifyPushState() {
        const pushState = this._history.pushState;
        this._history.pushState = (...args) => {
            pushState.call(this._history, ...args);
            this._window.dispatchEvent(new window.Event('pushstate'));
        };
    }
    _initRouteMatchers() {
        for (let matcherStr in this._options.routes) {
            this._routeMatchers.push({
                key: matcherStr,
                matcher: routeMatcher(matcherStr),
            });
        }
    }
}
export let router;
export function makeRouter(opts) {
    router = new Router(opts);
    return router;
}
export function Link(child, path, query) {
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
export default {};
//# sourceMappingURL=routing.js.map