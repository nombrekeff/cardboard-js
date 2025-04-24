import { state } from '../../dist/state.js';
import { withLifecycle } from '../../dist/lifecycle.js';
import { allTags, init, attach, detach } from '../../dist/tag.js';

const { div, p } = allTags;
const root = init();

const wrapper = div.attach();

attach(wrapper);
const childDiv = div.attach("I'm inside wrapper");

attach(childDiv);
p.attach("I'm inside child div!");
detach();

p.attach("I'm now inside wrapper!");
