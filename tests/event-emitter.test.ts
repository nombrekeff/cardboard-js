import { singleEvent } from '../src/events.js';

describe('singleEvent', () => {
  it('simple case works', async () => {
    const event = singleEvent();
    const cb = jest.fn();
    event.listen(cb);

    event.dispatch();

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('multiple listeners case works', async () => {
    const event = singleEvent();
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    event.listen(cb1);
    event.listen(cb2);

    event.dispatch();

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);
  });

  it('multiple listeners and dispatch case works', async () => {
    const event = singleEvent();
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    event.listen(cb1);
    event.listen(cb2);

    event.dispatch();
    event.dispatch();

    expect(cb1).toHaveBeenCalledTimes(2);
    expect(cb2).toHaveBeenCalledTimes(2);
  });

  it('remove case works', async () => {
    const event = singleEvent();
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    event.listen(cb1);
    event.listen(cb2);

    event.dispatch();

    event.remove(cb1);
    event.remove(cb1);

    event.dispatch();

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(2);
  });
});
