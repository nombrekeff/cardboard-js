import { CssGenerator } from '../src/css-generator';

describe('CssGenerator', () => {
  const generator = new CssGenerator();

  it('generateCss() basic works', async () => {
    const generated = generator.generateCss({
      body: {},
    });
    expect(generated).toEqual('body{}');
  });

  it('generateCss() with styles', async () => {
    const generated = generator.generateCss({
      body: {
        color: 'red',
        flexDirection: 'column',
      },
    });
    expect(generated).toEqual('body{color:red;flex-direction:column;}');
  });

  it('generateCss() with nested styles', async () => {
    const generated = generator.generateCss({
      body: {
        color: 'red',
        flexDirection: 'column',
        ':hover': { color: 'blue' },
      },
    });
    expect(generated).toEqual('body{color:red;flex-direction:column;}body:hover{color:blue;}');
  });
});
