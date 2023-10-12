import { tag, attach, attached, detachAll, detach, init, CTag, allTags } from '../src/tag';
import { allKnownTags } from '../src/tag-names';
import { createDomMock } from './__mocks__/client';

describe('Tag functions', () => {
  it('attach', async () => {
    createDomMock();
    const c = tag('div');
    attach(c);

    expect(attached()).toBe(c);
  });

  it('multiple attach', async () => {
    createDomMock();
    detachAll();

    const c = tag('div');
    attach(c);
    expect(attached()).toBe(c);

    const c1 = tag('div');
    attach(c1);
    expect(attached()).toBe(c1);

    detach();
    expect(attached()).toBe(c);

    detach();
    expect(attached()).toBe(null);
  });

  it('attached', async () => {
    createDomMock();
    const c = tag('div');
    attach(c);

    expect(attached()).toBe(c);
  });

  it('init default', async () => {
    createDomMock();
    init();

    expect(attached()).toBeInstanceOf(CTag);
    expect(attached().element.tagName).toBe('BODY');
  });

  it('init with root', async () => {
    createDomMock('<div id="root"></div>');
    init({ root: '#root' });

    expect(attached()).toBeInstanceOf(CTag);
    expect(attached().element.tagName).toBe('DIV');
    expect(attached().element.id).toBe('root');
  });

  it('allTags', async () => {
    createDomMock('');
    for (const tname of allKnownTags) {
      expect(allTags[tname]).toBeTruthy();
      expect('attach' in allTags[tname]).toBeTruthy();
      expect(allTags[tname]()).toBeInstanceOf(CTag);
      expect(allTags[tname].attach()).toBeInstanceOf(CTag);
    }
  });

  it('interceptor.ul', async () => {
    createDomMock('');
    const list = allTags['ul']('test');
    expect(list).toBeInstanceOf(CTag);
    expect((list.children[0] as HTMLElement).tagName).toBe('LI');
  });
});
