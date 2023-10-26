import { createDomMock } from './__mocks__/client';
import { allTags, each, init, state } from '../src/cardboard.js';
const { div, p } = allTags;

describe('each', () => {
    it('works with non-consumable', async () => {
        let dom = createDomMock();
        init();

        const items = ['1', '2', '3'];
        const t = div.attach(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');
    });

    it('works with consumable', async () => {
        let dom = createDomMock();
        init();

        const items = state(['1', '2', '3']);
        const t = div.attach(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c123d');
    });


    it('works with consumable same data', async () => {
        createDomMock();
        init();

        const items = state(['1', '2', '3']);
        const t = div.attach(
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


    it('item added works with consumable', async () => {
        createDomMock();
        init();

        const items = state(['1', '2', '3']);
        const t = div.attach(
            'c',
            each(items, (item) => p(item)),
            'd',
        );

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        items.value = [...items.value, '4'];

        await new Promise((r) => setTimeout(r, 5)); // Wait a bit before showing, otherwise it does have time to register changes
        expect(t.text()).toEqual('c1234d');
    });

    it('item removed works with consumable', async () => {
        createDomMock();
        init();

        const items = state(['1', '2', '3']);
        const t = div.attach(
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

    it('item swap works with consumable', async () => {
        createDomMock();
        init();

        const items = state(['1', '2', '3']);
        const t = div.attach(
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

    it('item moved works with consumable', async () => {
        createDomMock();
        init();

        const items = state(['1', '2', '3']);
        const t = div.attach(
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
});