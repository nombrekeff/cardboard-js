import {
  tag,
  CTag,
  allTags,
  clearMountPoints,
  getMountPoint,
  init,
  mountPoint,
  resetMountPoints,
  restoreMountPoint,
} from '../src/cardboard.js';
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
  beforeEach(() => {
    clearMountPoints();
  });
  it('mountPoint', async () => {
    createDomMock();
    const c = tag('div');
    mountPoint(c);

    expect(getMountPoint()).toBe(c);
  });

  it('multiple mountPoint', async () => {
    createDomMock();
    clearMountPoints();

    const c = tag('div');
    mountPoint(c);
    expect(getMountPoint()).toBe(c);

    const c1 = tag('div');
    mountPoint(c1);
    expect(getMountPoint()).toBe(c1);

    restoreMountPoint();
    expect(getMountPoint()).toBe(c);

    restoreMountPoint();
    expect(getMountPoint()).toBe(undefined);
  });

  it('getMountPoint()', async () => {
    createDomMock();
    const c = tag('div');
    mountPoint(c);

    expect(getMountPoint()).toBe(c);
  });

  it('resetMountPoint()', async () => {
    createDomMock();
    const c = tag('div');
    mountPoint(c);
    mountPoint(tag('div'));
    mountPoint(tag('div'));

    resetMountPoints();

    expect(getMountPoint()).toBe(c);
  });

  it('init default', async () => {
    createDomMock();
    init();

    expect(getMountPoint()).toBeInstanceOf(CTag);
    expect(getMountPoint()?.el.tagName).toBe('BODY');
  });

  it('init with selector', async () => {
    createDomMock('<div id="root"></div>');
    init({ selector: '#root' });

    expect(getMountPoint()).toBeInstanceOf(CTag);
    expect(getMountPoint()?.el.tagName).toBe('DIV');
    expect(getMountPoint()?.el.id).toBe('root');
  });

  it('allTags', async () => {
    createDomMock('');
    for (const tname of allKnownTags) {
      expect(allTags[tname]).toBeTruthy();
      expect('mount' in allTags[tname]).toBeTruthy();
      expect(allTags[tname]()).toBeInstanceOf(CTag);
      expect(allTags[tname].mount()).toBeInstanceOf(CTag);
    }
  });

  it('interceptor.ul', async () => {
    createDomMock('');
    const list = allTags['ul']('test');
    expect(list).toBeInstanceOf(CTag);
    expect((list.children[0] as HTMLElement).tagName).toBe('LI');
  });
});
