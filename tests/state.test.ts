import { state } from '../src/state';

describe('State', () => {
  it('basic state', async () => {
    const s = state({});
    expect(s).toBeDefined();
  });

  it('state has same properties', async () => {
    const so = { count: 0, name: 'test' };
    const s = state(so);

    for (const key in so) {
      expect(key in s).toBeDefined();
      expect(s[key]).toBe(so[key]);
    }
  });

  it('state array works', async () => {
    const s = state({ list: ['a'] });
    expect(s.list).toBeInstanceOf(Array);

    s.list.push('aaa');
    expect(s.list[1]).toBe('aaa');
    s.list.splice(1, 1);
    expect(s.list[0]).toBe('a');
    expect(s.list[1]).toBeUndefined();
  });

  it('state nested object works', async () => {
    const s = state({ data: { list: [] } });
    expect(s.data).toBeInstanceOf(Object);
  });

  it('state.changed works', async () => {
    const fn = jest.fn();
    const s = state({ count: 0 });
    s.changed(fn);
    s.count = 2;

    expect(fn).toHaveBeenCalled();
  });

  it('state.count.changed works', async () => {
    const fn = jest.fn();
    const s = state({ count: 0 });
    s.count.changed!(fn);
    s.count = 2;

    expect(fn).toHaveBeenCalled();
  });

  it('state.object.changed works', async () => {
    const fn = jest.fn();
    const s = state({ data: { name: 'test' } });
    s.data.changed!(fn);
    s.data.name += 'Heyyyy';

    expect(fn).toHaveBeenCalled();
  });

  it('One event does not call others', async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    let testState = state({ hide: true, disable: true });
    testState.hide.changed!(fn1);
    testState.disable.changed!(fn2);

    testState.disable = !testState.disable;
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });

  // it('state not', async () => {
  //   const fn1 = jest.fn();
  //   let testState = state({ hide: true });
  //   expect(fn1).toHaveBeenCalledWith(false);
  // });
});
