import { allTags, CTag, state, AlignContentOptions } from '../../dist/cardboard.js';
import { Component } from '../../dist/ext/components.js';
import { styles } from './styles.js';
const { div, p, span } = allTags;

// Example of a styled component using Cardboard.js
// This example demonstrates how to create a simple styled component
// with custom styles applied to it.

// It adds a css style block to the head of the document
// and uses a class to apply styles to the component.

// This is done like this instead of using inline styles
// to keep the styles organized and reusable. 

// Inline styles can be used for quick prototyping, in tags/components that are not reused,
// or in places where dynamic styles are needed,
// but for reusable components, it's better to use classes, 
// otherwise the styles get added to each instance of the component,
// which can lead to performance issues.

export const Row = Component((children?: CTag[], align?: AlignContentOptions) => {
  const count = state(1);
  return div(...children).addClass(align);
}).styled(styles.row);

export const StyledThing2 = Component(() => {
  const count = state(1);
  return div(
    Row([
      span('X'),
      p('This is a styled component'),
      span('X'),
    ], 'space-between'),
  );
}).styled(styles.styledThing);
