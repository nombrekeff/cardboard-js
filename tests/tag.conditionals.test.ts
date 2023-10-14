import { createDomMock } from './__mocks__/client';
import { tag, state } from '../src/cardboard';
function getElementIndex(node) {
  var index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }
  return index;
}
describe('Tag conditionals', () => {
  it('tag.showIf', async () => {
    createDomMock();
    const st = state({ show: true });
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').append(
      pp.hideIfNot(st.show), //
    );

    expect(body.q('p')).toBeTruthy();
    st.show = !st.show;
    expect(body.q('p')).toBeFalsy();
  });

  it('tag.hideIfNot appends item at correct position', async () => {
    createDomMock();
    const st = state({ show: true });
    const pp1 = tag('p', ["I'm here"]);
    const pp = tag('p', ["I'm here"]);
    const pp2 = tag('p', ["I'm here"]);

    tag('(body)').append(
      pp1,
      pp.hideIfNot(st.show), //
      pp2,
    );

    expect(getElementIndex(pp.element)).toEqual(1);
    st.show = false;
    st.show = true;
    expect(getElementIndex(pp.element)).toEqual(1);
  });

  it('tag.hideIf', async () => {
    const dom = createDomMock();
    const st = state({ hide: true });
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').append(
      pp.hideIf(st.hide), //
    );

    expect(body.q('p')).toBeFalsy();
    st.hide = false;
    expect(body.q('p')).toBeTruthy();
  });

  it('tag.disableIf', async () => {
    createDomMock();
    const st = state({ disable: true });
    const pp = tag('p', ["I'm here"]);

    tag('(body)').append(
      pp.disableIf(st.disable), //
    );

    expect(pp.hasAttr('disabled')).toBeTruthy();
    st.disable = !st.disable;
    expect(pp.hasAttr('disabled')).toBeFalsy();
  });

  it('tag.disableIfNot', async () => {
    createDomMock();
    const st = state({ enable: true });
    const pp = tag('p', ["I'm here"]);

    tag('(body)').append(
      pp.disableIfNot(st.enable), //
    );

    expect(pp.hasAttr('disabled')).toBeFalsy();
    st.enable = !st.enable;
    expect(pp.hasAttr('disabled')).toBeTruthy();
  });

  it('tag.classIf', async () => {
    createDomMock();
    const st = state({ enable: false });
    const pp = tag('p').classIf(st.enable, 'test-class');

    expect(pp.hasClass('test-class')).toBeFalsy();
    st.enable = true;

    expect(pp.hasClass('test-class')).toBeTruthy();
  });

  it('tag.classIfNot', async () => {
    createDomMock();
    const st = state({ enable: false });
    const pp = tag('p').classIfNot(st.enable, 'test-class');

    expect(pp.hasClass('test-class')).toBeTruthy();
    st.enable = true;
    expect(pp.hasClass('test-class')).toBeFalsy();
  });
});
