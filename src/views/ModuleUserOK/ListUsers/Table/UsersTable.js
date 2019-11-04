/* eslint-disable no-script-url */

import React from 'react';
import UserController from '../../../../controllers/User';
import { withRouter } from "react-router-dom";
import Link from '@material-ui/core/Link';

//Agrego imports
import UpdateUser from '../Update/UpdateUser';
import DeleteUser from '../Delete/DialogDelete';
import ViewUser from '../View/ViewUser';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { 
  makeStyles, 
  MuiThemeProvider, 
  createMuiTheme 
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      colorPrimary: {
        color: '#666',
        '&:hover': {
          color: '#0ce8ca',
        }
      },
      colorSecondary: {
        color: '#b53f3f',
        '&:hover': {
          color: '#f30b0b',
        }
      },
    },
    MuiListItem: {
      root: {
        borderBottom: '1px solid #cecece',
      }
    },
    MuiListItemText: {
      root:{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        
      },
      primary: {
        
      },
      secondary: {
        color: 'rgba(63, 81, 181, 1)',
        fontStyle: 'italic',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }
    }
  }
})


const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  typography: {
    padding: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(7),
    zIndex: 99,
    backgroundColor: '#3fb5a5',
    '&:hover': {
      backgroundColor: '#0ce8ca',
      "@media (hover: none)": {
        backgroundColor: "#0ce8ca"
      },
    },
  },
}));

function UsersTable(props) {
  const classes = useStyles();
  const { history } = props;
  //Coleccion de customers
  const [usuarios, setUsuarios] = React.useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = React.useState();

  //Avisa un cambio
  const [stateArray,setStateArray] = React.useState(false);
  
  const [moreUsers,setMoreUsers] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const selectUser = usuario => event => {
    setAnchorEl(event.currentTarget);
    setUsuarioSeleccionado(usuario);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    
  };

  const getMoreUsers = (event) => {
    setMoreUsers(true);
    setStateArray(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  React.useEffect(()=>{    

    if(stateArray){
      let usersBack = usuarios;
      let lastUser = usersBack[usersBack.length - 1];

      UserController.getUsersActivePagination(lastUser.email, 5)
        .then(moreUsers => {
          if (moreUsers == false) {
            console.log("No hay más usuarios");
            return;
          }
          
          moreUsers.forEach((user) => {
            usersBack.push(user);
          });

          console.log("Estos son los usuarios agregados", usersBack);
          setUsuarios(usersBack);
          
          setMoreUsers(false);
          setStateArray(false); //Finalizo el cambio
        }).catch(error => {
          console.log("Error al traer el usuarios: ", error);
        })
        
    } else if (usuarios.length === 0) {
      UserController.getActiveUsers(5)
          .then(value => {
            setUsuarios(value);
          })
          .catch(error => {
            console.log("Error al traer los usuarios => ", error);
          })
      }
    });

  function updateStateArray(){
    setStateArray(true)
  }
  
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment >
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/registrar-usuario')} >
          <AddIcon />
        </Fab>      
        <Grid item xs={12} md={12}>
          <List className={classes.root}>
            {usuarios.map(usuario => (
                <ListItem key={usuario.email}>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid item xs zeroMinWidth>
                    <ListItemText primary={usuario.nombre +' ' +usuario.apellido} secondary={usuario.email} />
                    <Typography noWrap></Typography>
                  </Grid>
                  <Grid>
                    <Tooltip title="Editar" placement="top">
                      <IconButton
                        edge="start"
                        size="small"
                        color="primary"
                        aria-describedby={id}
                        variant="contained"
                        onClick={selectUser(usuario)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </ListItem>
            ))}
          </List>
        </Grid>
        <div className={classes.seeMore}>
          
          <Link color="primary" href="javascript:;" onClick={getMoreUsers}>
            Ver más usuarios
          </Link>
        </div>
        <div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            <Typography className={classes.typography}>
                <ViewUser
                  updateStateArray={updateStateArray}
                  usuario={usuarioSeleccionado}
                  />
                <UpdateUser
                  updateStateArray={updateStateArray}
                  usuario={usuarioSeleccionado}
                  />
                <DeleteUser
                  updateStateArray={updateStateArray}
                  usuario={usuarioSeleccionado}
              />
              
            </Typography>
          </Popover>
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default withRouter(UsersTable);