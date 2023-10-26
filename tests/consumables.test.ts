import { createConsumable, greaterThan, intersectMulti, lessThan, isEmpty, greaterThanOr, lessThanOr, equalTo, notEqualTo, notEmpty } from '../src/consumables.js';

describe('Consumables', () => {
  it('createConsumable', async () => {
    const cons = createConsumable(2);
    expect(cons.value).toEqual(2);
  });

  it('prev works', async () => {
    const cons = createConsumable(2);
    cons.value = 123;

    expect(cons.value).toEqual(123);
    expect(cons.prev).toEqual(2);
  });

  it('valueOf works', async () => {
    const cons = createConsumable(2);

    expect((cons as any) == 2).toEqual(true);
  });

  it('createConsumable change works', async () => {
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

  it('greaterThanOr intersector works', async () => {
    const cons = createConsumable(2);
    const gt = greaterThanOr(cons, 5);

    expect(gt.value).toEqual(false);
    cons.dispatch!(6);
    expect(gt.value).toEqual(true);
    cons.dispatch!(2);
    expect(gt.value).toEqual(false);
    cons.dispatch!(5);
    expect(gt.value).toEqual(true);
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

  it('lessThanOr intersector works', async () => {
    const cons = createConsumable(2);
    const gt = lessThanOr(cons, 5);

    expect(gt.value).toEqual(true);
    cons.dispatch!(6);
    expect(gt.value).toEqual(false);
    cons.dispatch!(2);
    expect(gt.value).toEqual(true);
    cons.dispatch!(5);
    expect(gt.value).toEqual(true);
  });

  it('equalTo intersector works', async () => {
    const cons = createConsumable('123');
    const empty = equalTo(cons, '123');

    expect(empty.value).toEqual(true);

    cons.dispatch!('');
    expect(empty.value).toEqual(false);

    cons.dispatch!('123');
    expect(empty.value).toEqual(true);
  });

  it('notEqualTo intersector works', async () => {
    const cons = createConsumable('123');
    const empty = notEqualTo(cons, '123');

    expect(empty.value).toEqual(false);

    cons.dispatch!('');
    expect(empty.value).toEqual(true);

    cons.dispatch!('123');
    expect(empty.value).toEqual(false);
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

  it('notEmpty intersector works', async () => {
    const cons = createConsumable('123');
    const filled = notEmpty(cons);

    expect(filled.value).toEqual(true);

    cons.dispatch!('');
    expect(filled.value).toEqual(false);

    cons.dispatch!('123');
    expect(filled.value).toEqual(true);
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

  it('intersectors work with default param', async () => {
    const cons = createConsumable(2);
    const gt0 = greaterThan(cons);
    const lt0 = lessThan(cons);
    const gte0 = greaterThanOr(cons);
    const lte0 = lessThanOr(cons);

    expect(gt0.value).toEqual(true);
    expect(lt0.value).toEqual(false);
    expect(gte0.value).toEqual(true);
    expect(lte0.value).toEqual(false);
  });
});
