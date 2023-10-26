import { state } from '../src/state';
import { CTag, attach, tag } from '../src/tag';
import { createDomMock } from './__mocks__/client';

describe('Tags', () => {
  it('tag creates correctly', async () => {
    createDomMock();
    const t = tag('custom', ['child']);
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.textContent).toEqual('child');
  });

  it('tag queries correctly', async () => {
    createDomMock('<div id="test"></div>');
    const t = tag('(#test)');
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.tagName.toLowerCase()).toEqual('div');
    expect(t.el.id).toEqual('test');
  });

  it('tag receives el correctly', async () => {
    createDomMock('<div id="test"></div>');

    const t = tag(document.querySelector('#test') as HTMLElement);

    expect(t).toBeInstanceOf(CTag);
    expect(t.el.tagName.toLowerCase()).toEqual('div');
    expect(t.el.id).toEqual('test');
  });

  it('tag attaches correctly', async () => {
    createDomMock('<div id="test"></div>');

    const test = tag('(#test)');
    attach(test);
    const d = tag('div', ['Hey!'], true);

    expect(test.children.length).toEqual(1);
    expect(test.children[0]).toEqual(d.el);
  });

  it('tag appends correctly', async () => {
    createDomMock();
    const s = tag('span');
    const d = tag('div', [s]);
    const p = tag('p');
    d.append(p);

    expect(d.children).toEqual([s.el, p.el]);
  });

  it('tag prepends correctly', async () => {
    createDomMock();
    const s = tag('span');
    const d = tag('div', [s]);
    const p = tag('p');
    d.prepend(p);

    expect(d.children).toEqual([p.el, s.el]);
  });

  it('tag.text works correctly', async () => {
    createDomMock();
    const t = tag('custom').text('child');
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.textContent).toEqual('child');
  });

  it('tag.text works with template correctly', async () => {
    createDomMock();
    const t = tag('custom').text('$a', { a: state('123') });
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.textContent).toEqual('123');
  });


  it('tag.when', async () => {
    createDomMock();
    const clickCallback = jest.fn();
    const clickChange = jest.fn();

    const t = tag('custom');
    const tw = t.when('click', clickCallback);
    tw.changed!(clickChange);

    expect('changed' in tw).toEqual(true);

    expect(clickChange).not.toHaveBeenCalled();
    t.el.dispatchEvent(new window.Event('click'));
    expect(clickChange).toHaveBeenCalled();
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

    expect(t.el.textContent).toEqual('child');
  });

  it('tag.config children', async () => {
    createDomMock();
    const c = tag('div', ['Hey']);
    const t = tag('custom').config({
      children: [c],
    });

    expect(t.children).toEqual([c.el]);
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
    t.el.dispatchEvent(new window.Event('click'));

    expect(clickCallback).toHaveBeenCalled();
  });

  it('tag.className', async () => {
    createDomMock();
    const t = tag('custom').setClassName('true false');
    expect(t.className).toBe('true false');
  });

  it('tag.config className', async () => {
    createDomMock();
    const t = tag('custom').config({
      className: 'test box',
    });
    expect(t.el.className).toBe('test box');
  });

  it('tag.rmClass', async () => {
    createDomMock();
    const t = tag('custom').config({
      className: 'test box',
    });
    t.rmClass('test');
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.className).toBe('box');
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
    const t = tag('custom')
      .setClassName('test box')
      .replaceClass('test', 'new-test');

    expect(t).toBeInstanceOf(CTag);
    expect(t.hasClass('test')).toBe(false);
    expect(t.hasClass('new-test')).toBe(true);
  });

  it('tag.toggleClass', async () => {
    createDomMock();
    const t = tag('custom');
    expect(t.hasClass('hello')).toBe(false);
    t.toggleClass('hello');
    expect(t.hasClass('hello')).toBe(true);
    t.toggleClass('hello');
    expect(t.hasClass('hello')).toBe(false);
  });

  it('tag.rmStyle', async () => {
    createDomMock();
    const t = tag('custom')
      .addStyle('color', 'red')
      .addStyle('background', 'white');
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

  it('tag.consumeValue', async () => {
    createDomMock();
    const t = tag('custom').setValue('hey');

    expect(t.consumeValue).toBe('hey');
    expect(t.value).toBe('');
  });

  it('tag.checked', async () => {
    createDomMock();
    const t = tag('custom').setChecked(true);
    expect(t.checked).toBe(true);
    t.setChecked(false);
    expect(t.checked).toBe(false);
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
    const q = t.findTag((t) => t.id == 'test');

    expect(q).toBeInstanceOf(CTag);
    expect(q && q.id).toBe('test');
  });

  it('tag.find no item', async () => {
    createDomMock();
    const t = tag('custom').append(tag('p').setId('test'));
    const q = t.findTag((t) => t.id == 'not-exists');

    expect(q).toBe(undefined);
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
    let count = state(0);

    tag('div').consume(count, callback);
    count.value++;

    expect(callback).toBeCalled();
  });

  it('tag.hide & tag.show', async () => {
    createDomMock();
    const test = tag('div').setId('test');
    tag('(body)').append(test);

    expect(document.querySelector('#test')).toBeTruthy();
    test.hide();
    await new Promise((r) => setTimeout(r, 20)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(document.querySelector('#test')).not.toBeTruthy();
    test.show();
    await new Promise((r) => setTimeout(r, 20)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(document.querySelector('#test')).toBeTruthy();
  });
});
