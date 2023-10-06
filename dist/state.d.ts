export type Consumable<T = any> = T & Partial<{
    changed: (callback: (newValue: T) => void) => void;
}>;
export type State<T extends Record<string, any>> = {
    [K in keyof T]: Consumable<T[K]>;
};
export declare function state<T extends {}>(content: T): State<T>;
