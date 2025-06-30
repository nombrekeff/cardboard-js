/**
 * @jest-environment jsdom
 */
import { tag, allTags, state, CTag, init } from '../src/cardboard';
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
  beforeAll(() => {
    init({ selector: 'body' });
  });

  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('basic case', async () => {
    const root = tag('(body)');

    let hide = state(false);
    let p0: CTag;

    root.append(
      (p0 = p('0').hideIf(hide)), //
    );
    expect(getChildStr()).toEqual(['0']);
    hide.value = true;

    await new Promise((r) => setTimeout(r, 20)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(getChildStr()).toEqual([]);

    hide.value = false;
    await new Promise((r) => setTimeout(r, 20));
    expect(getChildStr()).toEqual(['0']);
  });

  it('basic case', async () => {
    const root = tag('(body)');

    let hide0 = state(false);
    let hide1 = state(false);
    let hide2 = state(false);

    let p0: CTag, p1: CTag, p2: CTag;

    root.append(
      (p0 = p('0').hideIf(hide0)), //
      (p1 = p('1').hideIf(hide1)), //
      (p2 = p('2').hideIf(hide2)), //
    );

    expect(getChildStr()).toEqual(['0', '1', '2']);
    hide1.value = true;
    await new Promise((r) => setTimeout(r, 20)); // Wait a bit before showing, otherwise it does have time to register changes
    expect(getChildStr()).toEqual(['0', '2']);
    hide0.value = true;
    await new Promise((r) => setTimeout(r, 20));
    expect(getChildStr()).toEqual(['2']);
    hide2.value = true;
    await new Promise((r) => setTimeout(r, 20));
    expect(getChildStr()).toEqual([]);
    hide2.value = false;
    await new Promise((r) => setTimeout(r, 20));
    expect(getChildStr()).toEqual(['2']);
    hide0.value = false;
    await new Promise((r) => setTimeout(r, 20));
    expect(getChildStr()).toEqual(['0', '2']);
    hide1.value = false;
    await new Promise((r) => setTimeout(r, 20));
    expect(getChildStr()).toEqual(['0', '1', '2']);
  });
});
