import { CTag, attach, tag } from '../src/tag';
import { createDomMock } from './__mocks__/client';

describe('Tags', () => {
  it('tag.clicked', async () => {
    createDomMock();
    const clickCallback = jest.fn();
    const t = tag('custom').clicked(clickCallback);
    t.el.dispatchEvent(new window.Event('click'));
    expect(clickCallback).toHaveBeenCalled();
  });

  it('tag.keyPressed', async () => {
    createDomMock();
    const callback = jest.fn();
    const t = tag('custom').keyPressed(callback);
    t.el.dispatchEvent(new window.KeyboardEvent('keypress'));
    expect(callback).toHaveBeenCalled();
  });

  it('tag.keyPressed with key', async () => {
    createDomMock();
    const callback = jest.fn();
    const t = tag('custom').keyPressed(callback, 'Enter');
    t.el.dispatchEvent(new window.KeyboardEvent('keypress', { key: 'Enter' }));
    expect(callback).toHaveBeenCalled();
  });

  it('tag.keyPressed with key omits other keys', async () => {
    createDomMock();
    const callback = jest.fn();
    const t = tag('custom').keyPressed(callback, 'Shift');
    t.el.dispatchEvent(new window.KeyboardEvent('keypress', { key: 'Enter' }));
    expect(callback).not.toHaveBeenCalled();
  });

  it('tag.changed', async () => {
    createDomMock();
    const callback = jest.fn();
    const t = tag('custom').changed(callback);
    t.el.dispatchEvent(new window.Event('change'));
    expect(callback).toHaveBeenCalled();
  });

  it('tag.submited', async () => {
    createDomMock();
    const callback = jest.fn();
    const t = tag('test').submited(callback);
    t.el.dispatchEvent(new window.SubmitEvent('submit'));
    expect(callback).toHaveBeenCalled();
  });

  it('tag.listen', async () => {
    createDomMock();
    const callback = jest.fn();
    const c = tag('child');
    tag('test').listen(c, 'click', callback);

    c.el.dispatchEvent(new window.Event('click'));
    expect(callback).toHaveBeenCalled();
  });


  it('tag.once', async () => {
    createDomMock();
    const callback = jest.fn();
    const c = tag('child');
    c.once('click', callback);
    c.el.dispatchEvent(new window.Event('click'));
    c.el.dispatchEvent(new window.Event('click'));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
