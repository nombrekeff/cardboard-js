import { State } from './types.js';
export declare function state<T extends object>(content: T, callback?: (newValue: T) => void): State<T>;
