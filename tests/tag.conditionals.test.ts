import { createDomMock } from './__mocks__/client';
import { tag, init, allTags, state, attached, hinput, hstyle, getElementIndex } from '../src/cardboard';
const { div, button, input, a, ul, li, hr, p } = allTags;

describe('Tag conditionals', () => {
  it('tag.showIf', async () => {
    const dom = createDomMock();
    const st = state({ show: true });
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').add(
      pp.showIf(st.show), //
    );

    expect(body.q('p')).toBeTruthy();
    st.show = !st.show;
    expect(body.q('p')).toBeFalsy();
  });

  it('tag.showIf adds item at correct position', async () => {
    const dom = createDomMock();
    const st = state({ show: true });
    const pp1 = tag('p', ["I'm here"]);
    const pp = tag('p', ["I'm here"]);
    const pp2 = tag('p', ["I'm here"]);

    tag('(body)').add(
      pp1,
      pp.showIf(st.show), //
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

    const body = tag('(body)').add(
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

    tag('(body)').add(
      pp.disableIf(st.disable), //
    );

    expect(pp.hasAttr('disabled')).toBeTruthy();
    st.disable = !st.disable;
    expect(pp.hasAttr('disabled')).toBeFalsy();
  });

  it('tag.enableIf', async () => {
    createDomMock();
    const st = state({ enable: true });
    const pp = tag('p', ["I'm here"]);

    tag('(body)').add(
      pp.enableIf(st.enable), //
    );

    expect(pp.hasAttr('disabled')).toBeFalsy();
    st.enable = !st.enable;
    expect(pp.hasAttr('disabled')).toBeTruthy();
  });
});
