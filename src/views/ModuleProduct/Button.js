import React from "react";
import {
  withStyles,
  makeStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router-dom' ;

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#3fb5a5",
    borderColor: "#007bff",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
})(Button);



const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));


export default function CustomizedButtons(props) {
  const classes = useStyles();
  const {history}  = props

  return (
    <div>
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        className={classes.margin}
       // onClick =  { () => history.push(props.route)}
        onClick = {props.onClick} // para reutilizar codigo lo mando por props 
      >
        {props.label}
      </BootstrapButton>
      
    </div>
  );
}

