import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CustomerController from '../../../../controllers/Customer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 90,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}



function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}


function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.any.isRequired,
  selectProps: PropTypes.object.isRequired,
};

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

const components = {
  Control,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

export default function SelectCustomer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);
  const [cliente,setCliente] = React.useState([]);
  const [estado,setEstado] = React.useState(false);
  const {setSeleccionado} = props;
  const {setButtonState} = props; 
  
  
  
  
  React.useEffect(()=>{
    if(cliente.length === 0){
      CustomerController.getCustomerAll()
      .then(result=>{
        setCliente(result);
      })
    }else if(estado === true ){
      setSeleccionado(single);
    }
  });

  const handleChangeSingle = value => {
    setSingle(value);
    setEstado(true);
    setButtonState(false);
    console.log("value : " , value)
  };

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: 'CLIENTE',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder="Buscar Cliente"
          options={cliente}
          components={components}
          value={single}
          onChange={handleChangeSingle}
        />
      </NoSsr>
      <React.Fragment>
      
    </React.Fragment>
    </div>
  );
}
