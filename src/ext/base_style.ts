import { CTag, allTags } from '../cardboard.js';
import type { StyleSet } from '../types';

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

/**
 * Creates a base style for the application.  
 * This style includes basic styles for buttons and inputs.  
 * It can be attached to the document or used as a standalone style.
 * 
 * @param attach - If true, the style will be attached to the document.
 * @returns A CTag representing the base style.
 */
export const BaseStyle = (attach: boolean = true): CTag => {
  return attach ? style.attach(baseStyles) : style(baseStyles);
};
