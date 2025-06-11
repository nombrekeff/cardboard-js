import { allTags, CTag, NestedStyleMap, styleManager, uuidv4, withLifecycle } from '../../dist/cardboard.js';
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

export const Row = Component((...children) => {
  return div(...children);
}, {
  styles: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 32px',
    color: 'white',
  }
});

export const StyledThing2 = Component(() => {
  return div(
    Row(
      span('X'),
      p('This is a styled component')
    ),
  );
}, {
  styles: {
    backgroundColor: 'lightsteelblue',
    borderRadius: '16px',
    color: 'darkslategray',
    textAlign: 'center',
    margin: '10px',
    'span': {
      marginRight: '16px',
      fontSize: '24px',
    },
    'p': {
      fontSize: '20px',
      ':hover': {
        color: 'red',
      }
    },
  }
});

function Component(fn: (...args) => CTag, options: { name?: string, styles?: NestedStyleMap } = {}): (...args) => CTag {
  const className = options && options.name ? options.name : uuidv4();
  let called = false;

  return function (...args) {
    if (called) {
      return fn(...args).addClass(className);
    }

    // Using lifecycle to ensure styles are added once when the first tag is mounted
    return withLifecycle(fn(...args).addClass(className), {
      mounted: (el) => {
        if (!called) {
          called = true;
          if (options && options.styles) {
            styleManager.add({
              [`.${className}`]: options.styles
            });
          }
        }
        return true;
      }
    });
  }
}