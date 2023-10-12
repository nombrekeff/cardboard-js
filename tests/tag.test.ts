import { state } from '../src/state';
import { CTag, attach, attached, tag } from '../src/tag';
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

  it('tag.config on', async () => {
    createDomMock();
    const clickCallback = jest.fn();

    const t = tag('custom').config({
      on: {
        click: clickCallback,
      },
    });
    t.element.dispatchEvent(new window.Event('click'));

    expect(clickCallback).toHaveBeenCalled();
  });

  it('tag.config className', async () => {
    createDomMock();
    const t = tag('custom').config({
      className: 'test box',
    });
    expect(t.element.className).toBe('test box');
  });

  it('tag.rmClass', async () => {
    createDomMock();
    const t = tag('custom').config({
      className: 'test box',
    });
    t.rmClass('test');
    expect(t).toBeInstanceOf(CTag);
    expect(t.element.className).toBe('box');
  });

  it('tag.hasClass', async () => {
    createDomMock();
    const t = tag('custom').config({
      className: 'test box',
    });
    expect(t).toBeInstanceOf(CTag);
    expect(t.hasClass('test')).toBe(true);
    expect(t.hasClass('not-test')).toBe(false);
  });

  it('tag.replaceClass', async () => {
    createDomMock();
    const t = tag('custom').className('test box').replaceClass('test', 'new-test');

    expect(t).toBeInstanceOf(CTag);
    expect(t.hasClass('test')).toBe(false);
    expect(t.hasClass('new-test')).toBe(true);
  });

  it('tag.rmStyle', async () => {
    createDomMock();
    const t = tag('custom').addStyle('color', 'red').addStyle('background', 'white');
    t.rmStyle('color');

    expect(t).toBeInstanceOf(CTag);
    expect(t.hasStyle('color')).toBe(false);
    expect(t.hasStyle('background')).toBe(true);
  });

  it('tag.rmAttr', async () => {
    createDomMock();
    const t = tag('custom').addAttr('src', 'link').addAttr('href', 'link');
    t.rmAttr('src');

    expect(t).toBeInstanceOf(CTag);
    expect(t.hasAttr('src')).toBe(false);
    expect(t.hasAttr('href')).toBe(true);
  });

  it('tag.disable & tag.enable', async () => {
    createDomMock();
    const t = tag('custom').disable();
    expect(t).toBeInstanceOf(CTag);
    expect(t.hasAttr('disabled')).toBe(true);

    t.enable();
    expect(t.hasAttr('disabled')).toBe(false);
  });

  it('tag.clear', async () => {
    createDomMock();
    const t = tag('custom').setValue('hey');

    expect(t).toBeInstanceOf(CTag);
    expect(t.value).toBe('hey');

    t.clear();
    expect(t.value).toBe('');
  });

  it('tag.q', async () => {
    createDomMock();
    const t = tag('custom').append(tag('p').setId('test'));
    const q = t.q('#test');

    expect(q).toBeInstanceOf(CTag);
    expect(q!.id).toBe('test');
  });

  it('tag.find', async () => {
    createDomMock();
    const t = tag('custom').append(tag('p').setId('test'));
    const q = t.find((t) => t.id == 'test');

    expect(q).toBeInstanceOf(CTag);
    expect(q && q.id).toBe('test');
  });

  it('tag.find no item', async () => {
    createDomMock();
    const t = tag('custom').append(tag('p').setId('test'));
    const q = t.find((t) => t.id == 'not-exists');

    expect(q).toBe(null);
  });

  it('tag.remove', async () => {
    createDomMock();
    const c = tag('div');
    const t = tag('test').append(c);

    c.remove();

    expect(t.children.length).toBe(0);
  });

  it('tag.consume', async () => {
    createDomMock();
    const callback = jest.fn();
    const s = state({ count: 0 });
    tag('div').consume(s.count, callback);
    s.count++;

    expect(callback).toBeCalled();
  });

  it('tag.hide & tag.show', async () => {
    createDomMock();
    const test = tag('div').setId('test');
    tag('(body)').append(test);

    expect(document.querySelector('#test')).toBeTruthy();
    test.hide();
    expect(document.querySelector('#test')).not.toBeTruthy();
    test.show();
    expect(document.querySelector('#test')).toBeTruthy();
  });
});
