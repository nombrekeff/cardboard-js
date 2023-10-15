import { createDomMock } from './__mocks__/client';
import { tag, allTags, state, CTag } from '../src/cardboard';
const { p } = allTags;

const getChildStr = () => {
  const children = Array.from(document.body.childNodes);
  const childStrings: string[] = [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].textContent) childStrings.push(children[i].textContent!);
  }
  return childStrings;
};

describe('Conditional show/hide', () => {
  it.only('basic case', async () => {
    createDomMock();
    const root = tag('(body)');

    let st = state({ hide0: false });
    let p0: CTag, p1: CTag, p2: CTag;

    root.append(
      (p0 = p('0').hideIf(st.hide0)), //
    );
    expect(getChildStr()).toEqual(['0']);
    st.hide0 = true;
    expect(getChildStr()).toEqual([]);
    st.hide0 = false;
    expect(getChildStr()).toEqual(['0']);
  });

  it('basic case', async () => {
    createDomMock();
    const root = tag('(body)');

    let st = state({ hide0: false, hide1: false, hide2: false });
    let p0: CTag, p1: CTag, p2: CTag;

    root.append(
      (p0 = p('0').hideIf(st.hide0)), //
      (p1 = p('1').hideIf(st.hide1)), //
      (p2 = p('2').hideIf(st.hide2)), //
    );

    expect(getChildStr()).toEqual(['0', '1', '2']);
    st.hide1 = true;
    expect(getChildStr()).toEqual(['0', '2']);
    st.hide0 = true;
    expect(getChildStr()).toEqual(['2']);
    st.hide2 = true;
    expect(getChildStr()).toEqual([]);
    st.hide0 = false;
    expect(getChildStr()).toEqual(['0']);
    st.hide0 = false;
    expect(getChildStr()).toEqual(['0', '2']);
    st.hide1 = false;
    expect(getChildStr()).toEqual(['0', '1', '2']);
  });

  it('Works between text nodes', async () => {
    createDomMock();
    const root = tag('(body)');
    let st = state({ hide: false });

    root.append('Hello', p('There').hideIf(st.hide), 'World');
    expect(getChildStr()).toEqual(['Hello', 'There', 'World']);
    st.hide = true;
    expect(getChildStr()).toEqual(['Hello', 'World']);
    st.hide = false;
    expect(getChildStr()).toEqual(['Hello', 'There', 'World']);
  });

  it('Works with nested children', async () => {
    createDomMock();
    const root = tag('(body)');
    let st = state({ hide: false });

    root.append(p().hideIf(st.hide).append(p('Hey'), p('whats'), p('up')));
    expect(getChildStr()).toEqual(['Heywhatsup']);
    st.hide = true;
    expect(getChildStr()).toEqual([]);
    st.hide = false;
    expect(getChildStr()).toEqual(['Heywhatsup']);
  });

  it('random test case', async () => {
    createDomMock();
    const root = tag('(body)');

    let completeChildStrigns = ['0', '1', '2', '3', '4', '5'];
    let st = state(completeChildStrigns.map((el) => false));

    const getExpectedChildStr = () => {
      return completeChildStrigns.filter((el, i) => (st[i] ? false : true));
    };

    for (let i = 0; i < st.length; i++) {
      root.append(
        p(`${i}`).hideIf(st[i]), //
      );
    }

    expect(getChildStr()).toEqual(getExpectedChildStr());

    const checkRandomShowHide = () => {
      for (let i = 0; i < st.length * 2; i++) {
        if (Math.random() > 0.4) {
          st[i % st.length] = !st[i % st.length];
        }
      }

      expect(getChildStr()).toEqual(getExpectedChildStr());
    };

    // Test showing and hiding elements at random
    for (let i = 0; i < 10; i++) {
      checkRandomShowHide();
    }
  });
});
