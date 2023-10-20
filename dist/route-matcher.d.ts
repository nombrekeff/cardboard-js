export type RouteMatcher = {
    parse(str: any): Record<string, string> | null;
    stringify(obj: object): string;
};
export declare const routeMatcher: (route: string | RegExp, rules?: {
    [k: string]: RegExp | ((value: any) => boolean);
}) => RouteMatcher;
