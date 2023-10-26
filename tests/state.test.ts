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
            expect(s.value[key] == so[key]).toEqual(true);
        }
    });

    it('state array works', async () => {
        const s = state(['a']);
        expect(s.value).toBeInstanceOf(Array);

        s.value.push('aaa');
        expect(s.value[1]).toBe('aaa');
        s.value.splice(1, 1);
        expect(s.value[0]).toBe('a');
        expect(s.value[1]).toBeUndefined();
    });

    it('state nested object works', async () => {
        const s = state({ list: [] });
        expect(s.value).toBeInstanceOf(Object);
    });

    it('state.changed works', async () => {
        const fn = jest.fn();
        const s = state({ count: 0 });
        s.changed(fn);
        s.value.count = 2;

        expect(fn).toHaveBeenCalled();
    });

    it('One event does not call others', async () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();

        let testState = state({ hide: true, disable: true });
        testState.changed!(fn1);
        testState.changed!(fn2);

        testState.value.disable = !testState.value.disable;
        expect(fn1).toHaveBeenCalled();
        expect(fn2).toHaveBeenCalled();
    });

    // it('state not', async () => {
    //   const fn1 = jest.fn();
    //   let testState = state({ hide: true });
    //   expect(fn1).toHaveBeenCalledWith(false);
    // });
});
