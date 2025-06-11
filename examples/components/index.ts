import { context, init } from '../../dist/cardboard.js';

const root = init();
console.log('Cardboard initialized:', context);

import { StyledThing } from './styled_thing.js';
import { StyledThing2 } from './styled_thing2.js';

// Example of styled components using Cardboard.js
// This example demonstrates how to create simple styled components
// with custom styles applied to them.

const timeBefore = performance.now(); // Start measuring performance
root.append(
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
  StyledThing(),
);
const timAfter = performance.now(); // Start measuring performance
console.log('Components rendered in', timAfter - timeBefore, 'ms');
