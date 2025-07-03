import type { NestedStyleMap } from "../../dist/cardboard.js";

export const styles = {
    styledThing: <NestedStyleMap>{
        backgroundColor: '#466187', // darker than '#5a7ca7'
        borderRadius: '16px',
        textAlign: 'center',
        margin: '10px',
        color: 'white',
        ' span': {
            margin: '16px 0',
            fontSize: '20px',
        },
        ' p': {
            fontSize: '16px',
        },
        ':hover': {
            color: 'lightblue',
        }
    },
    row: <NestedStyleMap>{
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        '.space-between': {
            justifyContent: 'space-between',
        },
        '.space-around': {
            justifyContent: 'space-around',
        },
        '.center': {
            justifyContent: 'center',
        },
        '.flex-start': {
            justifyContent: 'flex-start',       
        },
        '.flex-end': {
            justifyContent: 'flex-end',
        },
    },
}