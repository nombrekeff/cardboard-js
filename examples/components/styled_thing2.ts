import { allTags, context, styleManager} from '../../dist/cardboard.js';
const { div, p } = allTags;

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

styleManager.add({
  '.styled_thing2': {
    backgroundColor: 'lightblue',
    padding: '10px',
    borderRadius: '16px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: 'darkslategray',
    textAlign: 'center',
    margin: '10px 0',
  }
});

export const StyledThing2 = () => {
  return div(
    p('This is another styled component'),
  ).addClass('styled_thing2');
}