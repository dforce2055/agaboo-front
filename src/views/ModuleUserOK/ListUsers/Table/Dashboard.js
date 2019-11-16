import React from 'react';
import clsx from 'clsx';
import { makeStyles,useTheme,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import UsersTable from './UsersTable';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  GridContenedor: {
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255 , .8)',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: '.4em',
    boxShadow: '#cecece 2px 2px',
  }
}));

const theme2 = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#3fb5a5',
      }
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        }
    },
    MuiCheckbox:{
      colorSecondary: {
        color: '#42cfd6',
        '&$checked': {
          color: '#42cfd6',
        },
      }
    },
    
}
});

export default function Dashboard(props) {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme2}>
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
          <Grid container alignItems="center" justify="center" className={classes.root} spacing={2}>
            <UsersTable/>  
          </Grid>    
      </main>
    </div>
    </MuiThemeProvider>
  );
}