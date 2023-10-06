import { allTags } from '../hobo-rt.js';
import { StyleSet } from '../types.js';
const { style } = allTags;

const baseStyles: StyleSet = {
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
export function hstyle(silent: boolean = false) {
  return silent ? style.silent(baseStyles) : style(baseStyles);
}
