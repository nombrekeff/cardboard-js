import { JSDOM } from 'jsdom';

export function createDomMock(content = '') {
  const dom = new JSDOM(content);
  global.document = dom.window.document;
  global.window = dom.window as any;
  global.HTMLElement = dom.window.HTMLElement;
  global.HTMLInputElement = dom.window.HTMLInputElement;

  return dom;
}
