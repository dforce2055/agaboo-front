import React from "react";
import {
  withStyles,
  makeStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    lineHeight: 1.5,
    backgroundColor: "#3fb5a5",
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
      backgroundColor: "#0ce8ca",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0ce8ca",
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

