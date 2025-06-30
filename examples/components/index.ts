import { init, context } from '../../dist/cardboard.js';
import { StyledThing2 } from './styled_thing2.js';

const root = init();
context.styleManager.add({
  'body': {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
  }
});

// Example of styled components using Cardboard.js
// This example demonstrates how to create simple styled components
// with custom styles applied to them.

const timeBefore = performance.now(); // Start measuring performance
const items = Array.from({ length: 100 }, (_, i) => StyledThing2());
root.append(
  ...items
);
const timAfter = performance.now(); // Start measuring performance
console.log('Components rendered in', timAfter - timeBefore, 'ms');
