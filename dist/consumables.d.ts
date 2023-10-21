import { CEvent } from './events.js';
interface IConsumable<T> {
    changed(callback: (newValue: T) => void): any;
    dispatch(val: T): any;
    updateVal(value: T): any;
    value: T;
}
declare class Consumable<T> extends CEvent<T> implements IConsumable<T> {
    _value: T;
    get value(): T;
    constructor(val?: T);
    valueOf(): T;
    toString(): string;
    changed(callback: (newValue: T) => void): void;
    dispatch(val: T): void;
    updateVal(value: T): void;
}
export declare function createConsumable<T>(val: T): Consumable<T>;
export declare function intersect<T, K>(consumable: IConsumable<T>, intersector: (ogVal: T) => K): Consumable<K>;
export declare function greaterThan(consumable: IConsumable<number>, val: number): Consumable<boolean>;
export declare function lessThan(consumable: IConsumable<number>, val: number): Consumable<boolean>;
export declare function equalTo<T>(consumable: IConsumable<T>, val: T): Consumable<boolean>;
export declare function notEqualTo<T>(consumable: IConsumable<T>, val: T): Consumable<boolean>;
export {};
