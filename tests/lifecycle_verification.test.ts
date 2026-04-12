import { tag } from '../src/tag.js';
import { onLifecycle } from '../src/lifecycle.js';
import { init } from '../src/cardboard.js';

describe('Lifecycle Verification', () => {
    beforeAll(() => {
        init();
    });
    it('should call mounted when added to DOM', async () => {
        const mountedMock = jest.fn();
        const div = tag('div');
        onLifecycle(div, 'attached', mountedMock);

        // Ensure global observer is active (it is initialized in cardboard.init usually, but we can access context)
        // context.obs is likely lazy loaded in onLifecycle

        document.body.appendChild(div.el);

        // MutationObserver is async, wait for it
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(mountedMock).toHaveBeenCalled();
    });

    it('should call unmounted when removed from DOM', async () => {
        const unmountedMock = jest.fn();
        const div = tag('div');
        onLifecycle(div, 'detached', unmountedMock);

        document.body.appendChild(div.el);
        await new Promise(resolve => setTimeout(resolve, 50));
        
        div.el.remove();
        await new Promise(resolve => setTimeout(resolve, 50));

        expect(unmountedMock).toHaveBeenCalled();
    });
});
