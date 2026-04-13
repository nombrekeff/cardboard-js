import { TextEncoder, TextDecoder } from 'util';

if (typeof globalThis.TextDecoder === 'undefined') {
    Object.assign(globalThis, { TextDecoder });
}

if (typeof globalThis.TextEncoder === 'undefined') {
    Object.assign(globalThis, { TextEncoder });
}

// jest.setup.ts
class IntersectionObserverMock {
    constructor() { }
    observe() { }
    unobserve() { }
    disconnect() { }
    takeRecords() { return []; }
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
    Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
    });

    Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
    });
}