import { init, state } from '../src/cardboard';
import { CTag, tag } from '../src/tag';

describe('Tags', () => {
  beforeAll(() => {
    init({ selector: 'body' });
  });

  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('tag creates correctly', async () => {
    const t = tag('custom', ['child']);
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.textContent).toEqual('child');
  });

  it('tag queries correctly', async () => {
    document.body.innerHTML = '<div id="test"></div>';
    const t = tag('(#test)');
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.tagName.toLowerCase()).toEqual('div');
    expect(t.el.id).toEqual('test');
  });

  it('tag receives el correctly', async () => {
    document.body.innerHTML = '<div id="test"></div>';

    const t = tag(document.querySelector('#test') as HTMLElement);

    expect(t).toBeInstanceOf(CTag);
    expect(t.el.tagName.toLowerCase()).toEqual('div');
    expect(t.el.id).toEqual('test');
  });

  it('tag appends correctly', async () => {
    const s = tag('span');
    const d = tag('div', [s]);
    const p = tag('p');
    d.append(p);

    expect(d.children).toEqual([s.el, p.el]);
  });

  it('tag prepends correctly', async () => {
    const s = tag('span');
    const d = tag('div', [s]);
    const p = tag('p');
    d.prepend(p);

    expect(d.children).toEqual([p.el, s.el]);
  });

  it('tag.text works correctly', async () => {
    const t = tag('custom').text('child');
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.textContent).toEqual('child');
  });

  it('tag.text works with template correctly', async () => {
    const t = tag('custom').text('$a', { a: state('123') });
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.textContent).toEqual('123');
  });


  it('tag.when', async () => {
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
    const c = tag('div', ['Hey']);
    const t = tag('custom').config({
      children: [c],
    });

    expect(t.children).toEqual([c.el]);
  });

  it('tag.config value', async () => {
    const t = tag('custom').config({
      value: 'hello',
    });

    expect(t.value).toEqual('hello');
  });

  it('tag.config on', async () => {
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
    const t = tag('custom').setClassName('true false');
    expect(t.className).toBe('true false');
  });

  it('tag.config className', async () => {
    const t = tag('custom').config({
      className: 'test box',
    });
    expect(t.el.className).toBe('test box');
  });

  it('tag.rmClass', async () => {
    const t = tag('custom').config({
      className: 'test box',
    });
    t.rmClass('test');
    expect(t).toBeInstanceOf(CTag);
    expect(t.el.className).toBe('box');
  });

  it('tag.hasClass', async () => {
    const t = tag('custom').config({
      className: 'test box',
    });
    expect(t).toBeInstanceOf(CTag);
    expect(t.hasClass('test')).toBe(true);
    expect(t.hasClass('not-test')).toBe(false);
  });

  it('tag.replaceClass', async () => {
    const t = tag('custom')
      .setClassName('test box')
      .replaceClass('test', 'new-test');

    expect(t).toBeInstanceOf(CTag);
    expect(t.hasClass('test')).toBe(false);
    expect(t.hasClass('new-test')).toBe(true);
  });

  it('tag.toggleClass', async () => {
    const t = tag('custom');
    expect(t.hasClass('hello')).toBe(false);
    t.toggleClass('hello');
    expect(t.hasClass('hello')).toBe(true);
    t.toggleClass('hello');
    expect(t.hasClass('hello')).toBe(false);
  });

  it('tag.rmStyle', async () => {
    const t = tag('custom')
      .addStyle('color', 'red')
      .addStyle('background', 'white');
    t.rmStyle('color');

    expect(t).toBeInstanceOf(CTag);
    expect(t.hasStyle('color')).toBe(false);
    expect(t.hasStyle('background')).toBe(true);
  });

  it('tag.rmAttr', async () => {
    const t = tag('custom').addAttr('src', 'link').addAttr('href', 'link');
    t.rmAttr('src');

    expect(t).toBeInstanceOf(CTag);
    expect(t.hasAttr('src')).toBe(false);
    expect(t.hasAttr('href')).toBe(true);
  });

  it('tag.disable & tag.enable', async () => {
    const t = tag('custom').disable();
    expect(t).toBeInstanceOf(CTag);
    expect(t.hasAttr('disabled')).toBe(true);

    t.enable();
    expect(t.hasAttr('disabled')).toBe(false);
  });

  it('tag.consumeValue', async () => {
    const t = tag('custom').setValue('hey');

    expect(t.consumeValue).toBe('hey');
    expect(t.value).toBe('');
  });

  it('tag.checked', async () => {
    const t = tag('custom').setChecked(true);
    expect(t.checked).toBe(true);
    t.setChecked(false);
    expect(t.checked).toBe(false);
  });

  it('tag.clear', async () => {
    const t = tag('custom').setValue('hey');

    expect(t).toBeInstanceOf(CTag);
    expect(t.value).toBe('hey');

    t.clear();
    expect(t.value).toBe('');
  });

  it('tag.q', async () => {
    const t = tag('custom').append(tag('p').setId('test'));
    const q = t.q('#test');

    expect(q).toBeInstanceOf(CTag);
    expect(q!.id).toBe('test');
  });

  it('tag.find', async () => {
    const t = tag('custom').append(tag('p').setId('test'));
    const q = t.findTag((t) => t.id == 'test');

    expect(q).toBeInstanceOf(CTag);
    expect(q && q.id).toBe('test');
  });

  it('tag.find no item', async () => {
    const t = tag('custom').append(tag('p').setId('test'));
    const q = t.findTag((t) => t.id == 'not-exists');

    expect(q).toBe(undefined);
  });

  it('tag.remove', async () => {
    const c = tag('div');
    const t = tag('test').append(c);

    c.remove();

    expect(t.children.length).toBe(0);
  });

  it('tag.consume', async () => {
    const callback = jest.fn();
    let count = state(0);

    tag('div').consume(count, callback);
    count.value++;

    expect(callback).toBeCalled();
  });

  it('tag.hide & tag.show', async () => {
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

  it('tag throws if bad selector', async () => {
    const t = () => tag('(123123sad)', ['child']);
    expect(t).toThrowError("'(123123sad)' is not a valid selector");
  });

  it('tag throws if tag does not exists for selector', async () => {
    const t = () => tag('(#test)', ['child']);
    expect(t).toThrowError("Can't find element for selector: (#test)");
  });

  it('tag throws if bad argument passed', async () => {
    const t = () => tag(null as any, ['child']);
    expect(t).toThrowError("Invalid argument: null");
  });
});
