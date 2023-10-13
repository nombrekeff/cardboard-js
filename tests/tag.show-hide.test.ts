import { createDomMock } from './__mocks__/client';
import { tag, allTags, state, getElementIndex } from '../src/cardboard';
const { div, button, input, a, ul, li, hr, p } = allTags;

describe('Tag conditionals', () => {
  it('tag.hideIf', async () => {
    createDomMock();
    const st = state({ hide: true });
    const pp = tag('p', ["I'm here"]);

    const body = tag('(body)').append(
      pp.hideIf(st.hide), //
    );

    expect(body.q('p')).toBeFalsy();
    st.hide = false;
    expect(body.q('p')).toBeTruthy();
  });
});
