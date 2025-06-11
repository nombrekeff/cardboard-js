import { init, styleManager } from '../../dist/cardboard.js';
import { StyledThing } from './styled_thing.js';
import { StyledThing2 } from './styled_thing2.js';

const root = init();
styleManager.add({
  'body': {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
  }
});

// Example of styled components using Cardboard.js
// This example demonstrates how to create simple styled components
// with custom styles applied to them.

const timeBefore = performance.now(); // Start measuring performance
// // root.append(
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// //   StyledThing(),
// // );

root.append(
  StyledThing2(),
  StyledThing2(),
  StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
  // StyledThing2(),
);
const timAfter = performance.now(); // Start measuring performance
console.log('Components rendered in', timAfter - timeBefore, 'ms');
