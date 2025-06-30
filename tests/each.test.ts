/** @jest-environment jsdom */
import { createDomMock } from './__mocks__/client';
import { allTags, each, init, state } from '../src/cardboard.js';
const { div, p } = allTags;

describe('each', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('works with non-observable', async () => {
        init();

        const items = ['1', '2', '3'];
        const t = div.mount(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');
    });

    it('works with observable', async () => {
        init();

        const items = state(['1', '2', '3']);
        const t = div.mount(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');
    });


    it('works with observable same data', async () => {
        init();

        const items = state(['1', '2', '3']);
        const t = div.mount(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');

        items.value = [...items.value];
        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');
    });


    it('item added works with observable', async () => {
        init();

        const items = state(['1', '2', '3']);
        const t = div.mount(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        items.value = [...items.value, '4'];

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c1234d');
    });

    it('item removed works with observable', async () => {
        init();

        const items = state(['1', '2', '3']);
        const t = div.mount(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');

        items.value = items.value.filter(el => el != '2');

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c13d');
    });

    it('item swap works with observable', async () => {
        init();

        const items = state(['1', '2', '3']);
        const t = div.mount(
            'c',
            each(items, (item) => p(item)),
            'd',
        );
        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');

        items.value = ['2', '1', '3'];
        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c213d');
    });

    it('item moved works with observable', async () => {
        init();

        const items = state(['1', '2', '3']);
        const t = div.mount(
            'c',
            each(items, (item) => p(item)),
            'd',
        );
        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');

        items.value = ['4', '1', '2', '3'];
        await new Promise((r) => setTimeout(r, 10)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c4123d');
    });

    it('renders a randomized list of 10 items correctly', async () => {
        init();

        // Generate 10 random strings
        const randomItems = Array.from({ length: 10 }, () =>
            Math.random().toString(36).substring(2, 10)
        );

        const t = div.mount(
            'start',
            each(randomItems, (item) => p(item)),
            'end',
        );

        await new Promise((r) => setTimeout(r, 5));
        expect(t.text()).toEqual('start' + randomItems.join('') + 'end');
    });
});