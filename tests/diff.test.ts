/** @jest-environment jsdom */

import { DiffState, diffList } from '../src/cardboard.js';

describe('diff string array', () => {
    it('adds all if no old data', async () => {
        const oldData = [];
        const newData = ['a', 'b', 'c'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'a', index: 0, state: DiffState.added },
            { entry: 'b', index: 1, state: DiffState.added },
            { entry: 'c', index: 2, state: DiffState.added },
        ]);
    });

    it('removes all if no new data', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = [];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'a', index: 0, state: DiffState.removed },
            { entry: 'b', index: 1, state: DiffState.removed },
            { entry: 'c', index: 2, state: DiffState.removed },
        ]);
    });

    it('adds at start', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['0', 'a', 'b', 'c'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: '0', index: 0, state: DiffState.added },
        ]);
    });

    it('adds at end', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['a', 'b', 'c', '0'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: '0', index: 3, state: DiffState.added },
        ]);
    });

    it('adds at index', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['a', 'b', '0', 'c'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: '0', index: 2, state: DiffState.added },
        ]);
    });

    it('removes at start', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['b', 'c'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'a', index: 0, state: DiffState.removed },
        ]);
    });

    it('removes at end', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['a', 'b'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'c', index: 2, state: DiffState.removed },
        ]);
    });

    it('removes at index', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['a', 'c'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'b', index: 1, state: DiffState.removed },
        ]);
    });

    it('one item moved', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['c', 'b', 'a'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'c', index: 2, state: DiffState.swap, targetIndex: 0, targetEntry: 'a' },
        ]);
    });

    it('two items moved', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['c', 'a', 'b'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            {
                entry: 'c',
                index: 2,
                state: 'swap',
                targetEntry: 'a',
                targetIndex: 0,
            },
            {
                entry: 'a',
                index: 2,
                state: 'swap',
                targetEntry: 'b',
                targetIndex: 1,
            },
        ]);
    });

    it('two items added at different places', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['a', 'a1', 'b', 'c', 'd'];
        const diff = diffList(newData, oldData);
        console.log(diff);

        expect(diff).toEqual([
            { entry: 'a1', index: 1, state: DiffState.added },
            { entry: 'd', index: 4, state: DiffState.added },
        ]);
    });

    it('two items removed at different places', async () => {
        const oldData = ['a', 'a1', 'b', 'c', 'd'];
        const newData = ['a', 'b', 'd'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'a1', index: 1, state: DiffState.removed },
            { entry: 'c', index: 3, state: DiffState.removed },
        ]);
    });

    it('1 item removed 1 added and 1 moved', async () => {
        const oldData = ['a', 'b', 'c'];
        const newData = ['a', 'c', 'd'];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 'b', index: 1, state: DiffState.removed },
            { entry: 'd', index: 2, state: DiffState.added },
        ]);
    });
});

describe('diff int array', () => {
    it('adds all if no old data', async () => {
        const oldData = [];
        const newData = [1, 2, 3];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 1, index: 0, state: DiffState.added },
            { entry: 2, index: 1, state: DiffState.added },
            { entry: 3, index: 2, state: DiffState.added },
        ]);
    });

    it('removes all if no new data', async () => {
        const oldData = [1, 2, 3];
        const newData = [];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 1, index: 0, state: DiffState.removed },
            { entry: 2, index: 1, state: DiffState.removed },
            { entry: 3, index: 2, state: DiffState.removed },
        ]);
    });

    it('adds at index', async () => {
        const oldData = [1, 2, 3];
        const newData = [1, 2, 0, 3];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 0, index: 2, state: DiffState.added },
        ]);
    });

    it('removes at index', async () => {
        const oldData = [1, 2, 3];
        const newData = [1, 3];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 2, index: 1, state: DiffState.removed },
        ]);
    });

    it('two items moved', async () => {
        const oldData = [1, 2, 3];
        const newData = [3, 1, 2];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            {
                entry: 3,
                index: 2,
                state: 'swap',
                targetEntry: 1,
                targetIndex: 0,
            },
            {
                entry: 1,
                index: 2,
                state: 'swap',
                targetEntry: 2,
                targetIndex: 1,
            },
        ]);
    });

    it('two items added at different places', async () => {
        const oldData = [1, 2, 3];
        const newData = [1, 5, 2, 3, 4];
        const diff = diffList(newData, oldData);
        console.log(diff);

        expect(diff).toEqual([
            { entry: 5, index: 1, state: DiffState.added },
            { entry: 4, index: 4, state: DiffState.added },
        ]);
    });

    it('two items removed at different places', async () => {
        const oldData = [1, 5, 2, 3, 4];
        const newData = [1, 2, 4];
        const diff = diffList(newData, oldData);

        expect(diff).toEqual([
            { entry: 5, index: 1, state: DiffState.removed },
            { entry: 3, index: 3, state: DiffState.removed },
        ]);
    });
});

// describe('diff object array', () => {
//     it('two items added at different places', async () => {
//         const oldData = [1, 2, 3];
//         const newData = [1, 5, 2, 3, 4];
//         const diff = diffList(newData, oldData);
//         console.log(diff);

//         expect(diff).toEqual([
//             { entry: 5, index: 1, state: DiffState.added },
//             { entry: 4, index: 4, state: DiffState.added },
//         ]);
//     });

//     it('two items removed at different places', async () => {
//         const oldData = [1, 5, 2, 3, 4];
//         const newData = [1, 2, 4];
//         const diff = diffList(newData, oldData);

//         expect(diff).toEqual([
//             { entry: 5, index: 1, state: DiffState.removed },
//             { entry: 3, index: 3, state: DiffState.removed },
//         ]);
//     });
// });