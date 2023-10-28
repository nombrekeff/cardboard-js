import {
  tag,
  attach,
  attached,
  detachAll,
  detach,
  init,
  CTag,
  allTags,
} from '../src/tag';
import { createDomMock } from './__mocks__/client';

const allKnownTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
  'a',
  'abbr',
  'acronym',
  'address',
  'article',
  'aside',
  'audio',
  'b',
  'basefont',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'button',
  'canvas',
  'caption',
  'center',
  'cite',
  'code',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'html',
  'i',
  'iframe',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'map',
  'mark',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'u',
  'ul',
  'var',
  'video',
];

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
    expect(attached()).toBe(undefined);
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
    expect(attached()?.el.tagName).toBe('BODY');
  });

  it('init with root', async () => {
    createDomMock('<div id="root"></div>');
    init({ root: '#root' });

    expect(attached()).toBeInstanceOf(CTag);
    expect(attached()?.el.tagName).toBe('DIV');
    expect(attached()?.el.id).toBe('root');
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
