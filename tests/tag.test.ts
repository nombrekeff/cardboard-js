import { CTag, attach, tag } from '../src/tag';
import { createDomMock } from './__mocks__/client';

describe('Tags', () => {
  it('tag creates correctly', async () => {
    createDomMock();
    const t = tag('custom', ['child']);
    expect(t).toBeInstanceOf(CTag);
    expect(t.element.textContent).toEqual('child');
  });

  it('tag queries correctly', async () => {
    createDomMock('<div id="test"></div>');
    const t = tag('(#test)');
    expect(t).toBeInstanceOf(CTag);
    expect(t.element.tagName.toLowerCase()).toEqual('div');
    expect(t.element.id).toEqual('test');
  });

  it('tag receives element correctly', async () => {
    createDomMock('<div id="test"></div>');

    const t = tag(document.querySelector('#test') as HTMLElement);

    expect(t).toBeInstanceOf(CTag);
    expect(t.element.tagName.toLowerCase()).toEqual('div');
    expect(t.element.id).toEqual('test');
  });

  it('tag attaches correctly', async () => {
    createDomMock('<div id="test"></div>');

    const test = tag('(#test)');
    attach(test);
    const d = tag('div', ['Hey!'], true);

    expect(test.children.length).toEqual(1);
    expect(test.children[0]).toEqual(d.element);
  });

  it('tag.text works correctly', async () => {
    createDomMock();
    const t = tag('custom').text('child');
    expect(t).toBeInstanceOf(CTag);
    expect(t.element.textContent).toEqual('child');
  });

  it('tag.config works correctly', async () => {
    createDomMock();
    const t = tag('custom').config({
      attr: { href: 'example.com' },
      classList: ['one'],
      style: { color: 'red' },
      text: 'child',
    });
    console.log(t.element.attributes);
    expect(t).toBeInstanceOf(CTag);
    expect(t.hasAttr('href')).toEqual(true);
    expect(t.hasAttr('src')).toEqual(false);
    expect(t.getAttr('href')).toEqual('example.com');

    expect(t.hasClass('one')).toEqual(true);
    expect(t.hasStyle('color')).toEqual(true);
    expect(t.hasStyle('background')).toEqual(false);

    expect(t.element.textContent).toEqual('child');
  });

  it('tag.config children', async () => {
    createDomMock();
    const c = tag('div', ['Hey']);
    const t = tag('custom').config({
      children: [c],
    });

    expect(t.children).toEqual([c.element]);
  });

  it('tag.config value', async () => {
    createDomMock();
    const t = tag('custom').config({
      value: 'hello',
    });

    expect(t.value).toEqual('hello');
  });
});
