import jsdom, { JSDOM } from 'jsdom';

export function createDomMock(content = '') {
  const dom = new JSDOM(content, { url: 'https://example.org/' });
  global.document = dom.window.document;
  global.window = dom.window as any;
  global.HTMLElement = dom.window.HTMLElement;
  global.HTMLInputElement = dom.window.HTMLInputElement;
  global.HTMLTextAreaElement = dom.window.HTMLTextAreaElement;
  global.InputEvent = dom.window.InputEvent;
  global.Node = dom.window.Node;
  global.MutationObserver = dom.window.MutationObserver;

  return dom;
}
