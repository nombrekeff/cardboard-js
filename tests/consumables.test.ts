import { createConsumable, greaterThan, intersectMulti, lessThan, isEmpty } from '../src/consumables.js';

describe('Consumables', () => {
  it('createConsumable', async () => {
    const cons = createConsumable(2);
    expect(cons.value).toEqual(2);
  });

  it('makeConsumable change works', async () => {
    const fn = jest.fn();
    const cons = createConsumable(2);

    cons.changed!(fn);
    cons.dispatch!(3);

    expect(cons.value).toEqual(3);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it('greaterThan intersector works', async () => {
    const fn = jest.fn();
    const cons = createConsumable(2);
    const gt = greaterThan(cons, 5);

    gt.changed!(fn);

    expect(gt.value).toEqual(false);
    cons.dispatch!(6);
    expect(fn).toHaveBeenCalledWith(true);
    cons.dispatch!(2);
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('lessThan intersector works', async () => {
    const fn = jest.fn();
    const cons = createConsumable(2);
    const gt = lessThan(cons, 5);

    gt.changed!(fn);

    expect(gt.value == true).toEqual(true);

    cons.dispatch!(6);
    expect(fn).toHaveBeenCalledWith(false);

    cons.dispatch!(3);
    expect(fn).toHaveBeenCalledWith(false);
  });

  it('isEmpty intersector works with string', async () => {
    const cons = createConsumable('');
    const empty = isEmpty(cons);

    expect(empty.value).toEqual(true);

    cons.dispatch!('');
    expect(empty.value).toEqual(true);

    cons.dispatch!('aaaa');
    expect(empty.value).toEqual(false);
  });

  it('isEmpty intersector works with array', async () => {
    const cons = createConsumable<string[]>([]);
    const empty = isEmpty(cons);

    expect(empty.value).toEqual(true);

    cons.dispatch!([]);
    expect(empty.value).toEqual(true);

    cons.dispatch!(['aaaa']);
    expect(empty.value).toEqual(false);
  });


  it('lessThan with 2 intersectors works', async () => {
    const fn = jest.fn();
    const cons = createConsumable(2);
    const cons2 = createConsumable(5);

    const isLess = lessThan(cons, cons2);

    isLess.changed!(fn);

    expect(isLess.value).toEqual(true);

    cons.dispatch!(6);
    expect(isLess.value).toEqual(false);
    expect(fn).toHaveBeenCalledWith(false);

    cons2.dispatch(6);
    cons.dispatch!(5);

    expect(isLess.value).toEqual(true);
    expect(fn).toHaveBeenCalledWith(true);
  });

  it('intersect multi', async () => {
    const fn = jest.fn();
    const cons = createConsumable(2);
    const cons2 = createConsumable(2);

    const areEqual = intersectMulti([cons, cons2], (a, b) => a == b);

    areEqual.changed!(fn);

    expect(areEqual.value == true).toEqual(true);

    cons.dispatch!(6);
    expect(areEqual.value).toEqual(false);

    cons2.dispatch!(6);
    expect(areEqual.value).toEqual(true);
  });
});
