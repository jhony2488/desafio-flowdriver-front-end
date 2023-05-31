import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core';

export const inputContainerStyles = makeStyles((theme: Theme) => {
    return createStyles({
        container: {
            display: 'grid',
            'justify-items': 'center',
            'align-items': 'center',
        },
        wrapper: {
            marginTop: '20px',
            display: 'flex',
            'justify-items': 'center',
            'align-items': 'center',
        },
        buttonStyle: {
            marginLeft: '16px',
        }
    });
});