import { allTags, styleManager } from '../../dist/cardboard.js';
const { div, p, span } = allTags;

// Example of a styled component using Cardboard.js
// This example demonstrates how to create a simple styled component
// with custom styles applied to it.

// This is done like this instead of using inline styles
// to keep the styles organized and reusable. 

// Inline styles can be used for quick prototyping, in tags/components that are not reused,
// or in places where dynamic styles are needed,
// but for reusable components, it's better to use classes, 
// otherwise the styles get added to each instance of the component,
// which can lead to performance issues.

// You can also use the `style` tag to add a custom stylesheet,
// but it's better to use the `styleManager` to have all styles in one place,

styleManager.add({
    '.styled_thing': {
        backgroundColor: 'lightseagreen',
        borderRadius: '16px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: 'darkslategray',
        textAlign: 'center',
        margin: '10px',
        '.row': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 32px',
            color: 'white',
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
        },
    },
});

export const StyledThing = () => {
    return div(
        div(
            span('X'),
            p('This is a styled component')
        ).addClass('row'),
    ).addClass('styled_thing');
}