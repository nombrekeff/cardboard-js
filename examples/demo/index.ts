import { allTags, init, attach, detach } from '../../dist/tag.js';

const { div, p } = allTags;
init();

const wrapper = div.attach('wrapper');

attach(wrapper);
const childDiv = div.attach("I'm inside wrapper");

attach(childDiv);
p.attach("I'm inside child div!");
detach();

p.attach("I'm now inside wrapper!");
