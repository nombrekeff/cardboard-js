import { CssGenerator } from '../src/css-generator.js';

describe('CssGenerator', () => {
  const generator = new CssGenerator();

  it('generateCss() basic works', async () => {
    const generated = generator.genCss({
      body: {},
    });
    expect(generated).toEqual('body{}');
  });

  it('genCss() with styles', async () => {
    const generated = generator.genCss({
      body: {
        color: 'red',
        flexDirection: 'column',
      },
    });
    expect(generated).toEqual('body{color:red;flex-direction:column;}');
  });

  it('genCss() with nested styles', async () => {
    const generated = generator.genCss({
      body: {
        color: 'red',
        flexDirection: 'column',
        ':hover': { color: 'blue' },
      },
    });
    expect(generated).toEqual('body{color:red;flex-direction:column;}body:hover{color:blue;}');
  });
});
