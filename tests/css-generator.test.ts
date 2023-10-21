import { genCss } from '../src/css-generator.js';

describe('CssGenerator', () => {
  it('generateCss() basic works', async () => {
    const generated = genCss({
      body: {},
    });
    expect(generated).toEqual('body{}');
  });

  it('genCss() with styles', async () => {
    const generated = genCss({
      body: {
        color: 'red',
        flexDirection: 'column',
      },
    });
    expect(generated).toEqual('body{color:red;flex-direction:column;}');
  });

  it('genCss() with nested styles', async () => {
    const generated = genCss({
      body: {
        color: 'red',
        flexDirection: 'column',
        ':hover': { color: 'blue' },
      },
    });
    expect(generated).toEqual(
      'body{color:red;flex-direction:column;}body:hover{color:blue;}',
    );
  });
});
