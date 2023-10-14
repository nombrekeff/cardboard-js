import { state } from '../src/cardboard';
import { template } from '../src/template';
import { CTag, tag } from '../src/tag';
import { createDomMock } from './__mocks__/client';

describe('template', () => {
  it('Template works', async () => {
    createDomMock();
    const st = state({ count: 0, count2: 0 });
    const t1 = tag('p', [template('Count is: $count, $count2', st)]);

    expect(t1.text()).toEqual('Count is: 0, 0');
    st.count++;
    expect(t1.text()).toEqual('Count is: 1, 0');
    st.count2++;
    expect(t1.text()).toEqual('Count is: 1, 1');
  });

  it('does not break if incorrect variable passed', async () => {
    createDomMock();
    const st = state({ count: 0, count2: 0 });
    const t1 = tag('p', [template('Count is: $aa, $vv', st)]);

    expect(t1.text()).toEqual('Count is: $aa, $vv');
  });
});
