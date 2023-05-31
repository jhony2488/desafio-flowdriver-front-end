import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core';

export  const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));