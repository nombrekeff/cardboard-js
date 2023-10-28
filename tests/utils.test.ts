import { arraysEqual, removeFromList, swapItems } from '../src/util';

describe('Utils', () => {
    it('swapItems', async () => {
        let arr = [1, 2];
        swapItems(arr, 0, 1);
        expect(arr).toEqual([2, 1]);
    });

    it('removeFromList', async () => {
        let arr = [1, 2];
        removeFromList(1, arr);
        expect(arr).toEqual([2]);
    });

    it('arraysEqual', async () => {
        let a = [1, 2, 3]
        expect(arraysEqual(a, a)).toEqual(true);
        expect(arraysEqual([123], [123])).toEqual(true);
        expect(arraysEqual(a, undefined)).toEqual(false);
        expect(arraysEqual([123], [123, 123])).toEqual(false);
        expect(arraysEqual(['aa'], [123])).toEqual(false);
    });
});