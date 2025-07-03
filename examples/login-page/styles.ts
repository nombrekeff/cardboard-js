export const baseStyleSheet = {
    ':root': {
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
    '#login-button': {
        transition: 'background-color 0.2s ease, color 0.2s ease',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '32px',
        padding: '12px 24px',
        width: '100%',
        ':disabled': {
            transition: 'background-color 0.2s ease, color 0.2s ease',
            backgroundColor: '#eeeeee!important',
            color: '#999!important',
            cursor: 'default!important',
        },
        ':hover': {
            backgroundColor: '#0468d4',
            color: '#fff',
        },
    },
    '#app-well': {
        backgroundColor: '#f3f3f3',
        border: '1px solid #ddd',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    '#login-box': {
        backgroundColor: '#fcfcfc',
        borderRadius: '32px',
        padding: '16px 32px',
        paddingBottom: '64px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
    }
}

export const rootStyles = {
    height: '100vh',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    font: 'Helvetica, Arial, sans-serif',
};

