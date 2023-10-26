import { mappedEvent, singleEvent } from '../src/events.js';

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


describe('mapped event', () => {
  it('simple case works', async () => {
    const event = mappedEvent();
    const cb = jest.fn();
    event.listen('a', cb);

    event.dispatch('a');

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('multiple listeners case works', async () => {
    const event = mappedEvent();
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    event.listen('a', cb1);
    event.listen('b', cb2);

    event.dispatch('a');

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(0);
  });

  it('multiple listeners and dispatch case works', async () => {
    const event = mappedEvent();
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    event.listen('a', cb1);
    event.listen('b', cb2);

    event.dispatch('a');
    event.dispatch('b');

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);
  });

  it('remove case works', async () => {
    const event = mappedEvent();
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    event.listen('a', cb1);
    event.listen('a', cb2);

    event.remove('a', cb1);

    event.dispatch('a');
    event.dispatch('b');

    expect(cb1).toHaveBeenCalledTimes(0);
  });
});
