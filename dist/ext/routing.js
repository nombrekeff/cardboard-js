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
import { onLifecycle } from '../lifecycle.js';
const { div, a } = allTags;
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Routing
 */
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
    /**
     * Navigate to a {@link route} with optional {@link query} parameters.
     * @see https://github.com/nombrekeff/cardboard-js/wiki/Routing
     */
    navigate(route, query) {
        const querySearch = new URLSearchParams(query), queryStr = querySearch.toString(), cQuery = this.query.toString();
        if (route !== this._currentRoute || queryStr !== cQuery) {
            this.query = querySearch;
            this._history.pushState('data', '', route + (queryStr ? '?' + queryStr : ''));
        }
    }
    _setRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._currentTag) {
                yield this._currentTag.hide();
            }
            const route = this._getRoute();
            if (route.parent) {
                yield route.show();
            }
            else {
                this._hookLifecycle(route);
                this._rootParent.append(route);
            }
            this._currentTag = route;
        });
    }
    _hookLifecycle(route) {
        const options = this._options;
        if (!options.remove && !options.start)
            return;
        onLifecycle(route, options.start, options.remove, options.beforeRemove);
    }
    // Follow aliases until a valid route is found
    _getEffectiveRoute() {
        if (!this._currentRoute) {
            return undefined;
        }
        let effectiveRoute = this._currentRoute, maxCalls = 10000, alias;
        while (typeof (alias = this._options.routes[effectiveRoute]) === 'string' &&
            maxCalls--) {
            if (typeof alias === 'string') {
                effectiveRoute = alias;
            }
            else
                break;
        }
        return effectiveRoute;
    }
    _getRoute() {
        const navigatedRoute = this._getEffectiveRoute(), opts = this._options;
        let route = navigatedRoute, matched = false;
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
    _setCurrentRoute() {
        if (this.currentRoute === this._location.pathname)
            return;
        this._currentRoute = this._location.pathname;
        void this._setRoute();
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
        for (const matcherStr in this._options.routes) {
            this._routeMatchers.push({
                key: matcherStr,
                matcher: routeMatcher(matcherStr),
            });
        }
    }
}
export let router;
export const makeRouter = (opts) => {
    return (router = new Router(opts));
};
export const Link = (child, path, query) => {
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
//# sourceMappingURL=routing.js.map