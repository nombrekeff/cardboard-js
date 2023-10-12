import { allTags } from '../../dist/cardboard.js';
const { style } = allTags;

const flexCenterCenter = { display: 'flex', alignItems: 'center', justifyContent: 'center' };

export default function styles() {
 return style.attach({
    '*': {
      fontFamily: "'Montserrat', sans-serif !important;",
      scrollbarGutter: 'stable',
    },
    body: {
      height: '100vh',
      margin: '0',
      padding: '0',
      ...flexCenterCenter,
      backgroundColor: 'rgba(179, 55, 113, 0.2)',
    },
    '.todo-app': {
      width: '650px',
      height: '80%',
      backgroundColor: '#6D214F',
      borderRadius: '12px',
      color: '#efd7e1',
      display: 'flex',
      flexDirection: 'column',
    },
    '.header': {
      ...flexCenterCenter,
      background: '#efd7e166',
      borderRadius: '6px',
      position: 'relative',
      margin: '0 32px',
      color: '#efd7e1',
    },
    input: {
      width: '100%',
      height: '30px',
      border: 'none',
      borderBottom: '3px solid transparent',
      borderRadius: '8px',
      margin: '0',
      fontSize: '16px',
      background: 'transparent',
      color: '#efd7e1',
      ':focus': {
        border: 'none',
        borderBottom: '3px solid #F97F51',
      },
      '::placeholder': {
        color: '#efd7e1',
      },
    },
    '.btn-add': {
      minWidth: '48px',
      minHeight: '48px',
      border: 'none',
      margin: '0',
      fontSize: '26px',
      position: 'absolute',
      right: '0',
      background: 'transparent',
      color: '#efd7e1',
      ':disabled': {
        pointerEvents: 'none',
        opacity: '.5',
      },
      ':hover': {
        background: 'rgba(255, 255, 255, .2)'
      }
    },
    '.todo-list': {
      flex: '1 1 auto',
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '16px 32px',
    },
    '.list-empty': {
      textAlign: 'center',
      opacity: '.7',
    },
    '.todo-item': {
      position: 'relative',
      borderBottom: '1px solid rgba(255,255,255,.3)',
      padding: '12px 8px',
      borderRadius: '3px',
    },
    '.btn-remove': {
      minWidth: '30px',
      minHeight: '30px',
      width: '30px',
      height: '30px',
      ...flexCenterCenter,
      borderRadius: '50px',
      border: 'none',
      margin: '0',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '22px',
      color: 'white',
      position: 'absolute',
      background: 'rgba(255,255,255,.2)',
      ':hover': {
        background: 'rgba(255,255,255,.35)',
      },
    },
  });
}