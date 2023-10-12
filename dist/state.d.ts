export type Consumable<T> = T & Partial<{
    changed: (callback: (newValue: T) => void) => void;
}>;
export type State<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Record<string, any> ? State<T[K]> : Consumable<T[K]>;
} & {
    changed: (callback: (newValue: T) => void) => void;
};
export declare function state<T extends {}>(content: T, callback?: (newValue: T) => void): State<T>;
