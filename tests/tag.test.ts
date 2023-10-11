import { CTag, tag } from '../src/tag';

describe('Tags', () => {
  it('tag creates tag correctly', async () => {
    const t = tag('custom');
    expect(t).toBeInstanceOf(CTag);
  });
});
