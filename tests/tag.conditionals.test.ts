import { createDomMock } from './__mocks__/client';
import { tag, state } from '../src/cardboard.js';

function getElementIndex(node) {
  var index = 0;

  while ((node = node.previousElementSibling)) {
    index++;
  }

  return index;
}

describe('Tag conditionals', () => {
  it('tag.hideIfNot', async () => {
    createDomMock();
    const show = state(true);
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').append(
      pp.hideIfNot(show), //
    );

    expect(body.q('p')).toBeTruthy();
    show.value = !show.value;
    expect(body.q('p')).toBeFalsy();
  });

  it('tag.doIfNot', async () => {
    createDomMock();
    let done = false;
    const show = state(true);
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').append(
      pp.doIfNot(show, () => done = true, () => done = false), //
    );

    expect(done).toEqual(false);
    show.value = !show.value;
    expect(done).toEqual(true);
  });
  it('tag.attrIfNot', async () => {
    createDomMock();
    let done = false;
    const show = state(true);
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').append(
      pp.attrIfNot(show, 'disabled', 'true'), //
    );

    expect(pp.hasAttr('disabled')).toEqual(false);
    show.value = !show.value;
    expect(pp.hasAttr('disabled')).toEqual(true);
  });


  it('tag.hideIfNot appends item at correct position', async () => {
    const dom = createDomMock();
    const show = state(true);
    const pp1 = tag('p', ["I'm here 1"]);
    const pp = tag('p', ["I'm here 2"]);
    const pp2 = tag('p', ["I'm here 3"]);

    tag('(body)').append(
      pp1,
      pp.hideIfNot(show), //
      pp2,
    );

    expect(pp.element.parentElement).toBeTruthy();
    await new Promise((r) => setTimeout(r, 20)); // Wait a bit before showing, otherwise it does have time to register changes

    show.value = false;
    await new Promise((r) => setTimeout(r, 20)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(pp.element.parentElement).toBeFalsy();

    show.value = true;
    await new Promise((r) => setTimeout(r, 20)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(pp.element.parentElement).toBeTruthy();
  });

  it('tag.hideIf', async () => {
    createDomMock();
    const hide = state(true);
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').append(
      pp.hideIf(hide), //
    );

    expect(body.q('p')).toBeFalsy();
    hide.value = false;
    expect(body.q('p')).toBeTruthy();
  });

  it('tag.disableIf', async () => {
    createDomMock();
    const disable = state(true);
    const pp = tag('p', ["I'm here"]);

    tag('(body)').append(
      pp.disableIf(disable), //
    );

    expect(pp.hasAttr('disabled')).toBeTruthy();
    disable.value = !disable.value;
    expect(pp.hasAttr('disabled')).toBeFalsy();
  });

  it('tag.disableIfNot', async () => {
    createDomMock();
    const enable = state(true);
    const pp = tag('p', ["I'm here"]);

    tag('(body)').append(
      pp.disableIfNot(enable), //
    );

    expect(pp.hasAttr('disabled')).toBeFalsy();
    enable.value = !enable.value;
    expect(pp.hasAttr('disabled')).toBeTruthy();
  });

  it('tag.classIf', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').classIf(enable, ['test-class']);

    expect(pp.hasClass('test-class')).toBeFalsy();
    enable.value = true;

    expect(pp.hasClass('test-class')).toBeTruthy();
  });

  it('tag.classIf function', async () => {
    const enable = state(false);
    const pp = tag('p').classIf(enable, () => ['test-class']);

    expect(pp.hasClass('test-class')).toBeFalsy();
    enable.value = true;

    expect(pp.hasClass('test-class')).toBeTruthy();
  });

  it('tag.classIfNot', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').classIfNot(enable, ['test-class']);

    expect(pp.hasClass('test-class')).toBeTruthy();
    enable.value = true;
    expect(pp.hasClass('test-class')).toBeFalsy();
  });

  it('tag.classIfNot function', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').classIfNot(enable, () => ['test-class']);

    expect(pp.hasClass('test-class')).toBeTruthy();
    enable.value = true;
    expect(pp.hasClass('test-class')).toBeFalsy();
  });

  it('tag.stylesIf', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').stylesIf(enable, {
      color: 'red',
      backgroundColor: 'blue',
    });

    expect(pp.hasStyle('color')).toBeFalsy();
    expect(pp.hasStyle('backgroundColor')).toBeFalsy();
    enable.value = true;

    expect(pp.hasStyle('color')).toBeTruthy();
    expect(pp.hasStyle('backgroundColor')).toBeTruthy();
  });

  it('tag.stylesIf function', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').stylesIf(enable, () => ({
      color: 'red',
      backgroundColor: 'blue',
    }));

    expect(pp.hasStyle('color')).toBeFalsy();
    expect(pp.hasStyle('backgroundColor')).toBeFalsy();
    enable.value = true;

    expect(pp.hasStyle('color')).toBeTruthy();
    expect(pp.hasStyle('backgroundColor')).toBeTruthy();
  });

  it('tag.stylesIfNot', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').stylesIfNot(enable, { color: 'red' });

    expect(pp.hasStyle('color')).toBeTruthy();
    enable.value = true;

    expect(pp.hasStyle('color')).toBeFalsy();
  });

  it('tag.styleIf', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').styleIf(enable, 'color', 'red');

    expect(pp.hasStyle('color')).toBeFalsy();
    enable.value = true;

    expect(pp.hasStyle('color')).toBeTruthy();
  });

  it('tag.styleIf function', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').styleIf(enable, 'color', () => 'red');

    expect(pp.hasStyle('color')).toBeFalsy();
    enable.value = true;

    expect(pp.hasStyle('color')).toBeTruthy();
  });

  it('tag.styleIfNot', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').styleIfNot(enable, 'color', 'red');

    expect(pp.hasStyle('color')).toBeTruthy();
    enable.value = true;

    expect(pp.hasStyle('color')).toBeFalsy();
  });

  it('tag.textIf', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').textIf(enable, 'yes', 'no');

    expect(pp.text()).toEqual('no');
    enable.value = true;
    expect(pp.text()).toEqual('yes');
    enable.value = false;
    expect(pp.text()).toEqual('no');
  });

  it('tag.textIf without else', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').textIf(enable, 'yes');

    expect(pp.text()).toEqual('');
    enable.value = true;
    expect(pp.text()).toEqual('yes');
    enable.value = false;
    expect(pp.text()).toEqual('');
  });

  it('tag.textIf with functions', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').textIf(
      enable,
      () => 'yes',
      () => 'no',
    );

    expect(pp.text()).toEqual('no');
    enable.value = true;
    expect(pp.text()).toEqual('yes');
    enable.value = false;
    expect(pp.text()).toEqual('no');
  });

  it('tag.textIfNot', async () => {
    createDomMock();
    const enable = state(false);
    const pp = tag('p').textIfNot(enable, 'yes', 'no');

    expect(pp.text()).toEqual('yes');
    enable.value = true;
    expect(pp.text()).toEqual('no');
    enable.value = false;
    expect(pp.text()).toEqual('yes');
  });
});
