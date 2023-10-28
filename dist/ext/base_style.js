import { allTags } from '../cardboard.js';
const { style } = allTags;
const baseStyles = {
    ':root': {
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
    button: {
        border: 'none',
        borderRadius: '3px',
        background: '#eee',
        padding: '8px 16px',
        margin: '0 8px',
        cursor: 'pointer',
        ':hover': {
            background: '#ccc',
        },
        ':active': {
            background: '#bbb',
        },
    },
    input: {
        border: '1px solid #eee',
        borderRadius: '3px',
        background: '#eee',
        padding: '8px 16px',
        margin: '0 8px',
        outline: 'none',
        ':focus': {
            border: '1px solid #aaa',
        },
    },
};
export const BaseStyle = (attach = true) => {
    return attach ? style.attach(baseStyles) : style(baseStyles);
};
//# sourceMappingURL=base_style.js.map