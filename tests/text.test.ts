import { state } from '../src/state';
import { text } from '../src/text';
import { tag } from '../src/tag';
import { createDomMock } from './__mocks__/client';

describe('text', () => {
  it('simple text works', async () => {
    createDomMock();
    const t1 = tag('p', [text('Count is: 0')]);
    expect(t1.text()).toEqual('Count is: 0');
  });

  it('text works when no data', async () => {
    createDomMock();
    const st = state(null);
    const t1 = tag('p', [text('Count is: $count, $count2', st)]);
    expect(t1.text()).toEqual('Count is: $count, $count2');
  });


  it('template text works with Consumable', async () => {
    createDomMock();
    const st = state({ count: 0, count2: 0 });
    const t1 = tag('p', [text('Count is: $count, $count2', st)]);

    expect(t1.text()).toEqual('Count is: 0, 0');
    st.value.count++;
    expect(t1.text()).toEqual('Count is: 1, 0');
    st.value.count2++;
    expect(t1.text()).toEqual('Count is: 1, 1');
  });

  it('template text works with object', async () => {
    createDomMock();
    const st = { count: state(0), count2: state(0) };

    const t1 = tag('p', [text('Count is: $count, $count2', st)]);

    expect(t1.text()).toEqual('Count is: 0, 0');
    st.count.value++;
    expect(t1.text()).toEqual('Count is: 1, 0');
    st.count2.value++;
    expect(t1.text()).toEqual('Count is: 1, 1');
  });

  it('does not break if incorrect variable passed', async () => {
    createDomMock();
    const st = state({ count: 0, count2: 0 });
    const t1 = tag('p', [text('Count is: $aa, $vv', st)]);

    expect(t1.text()).toEqual('Count is: $aa, $vv');
  });
});
