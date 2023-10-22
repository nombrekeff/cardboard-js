import { createConsumable, greaterThan, lessThan } from '../src/consumables.js';

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

  it(' greaterThan intersector works', async () => {
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

  it(' lessThan intersector works', async () => {
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
});
