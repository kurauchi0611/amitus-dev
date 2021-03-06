import { Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth:theme.spacing(10),
      maxWidth: theme.spacing(40),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: "1rem",
      background: theme.palette.buttonMain.main,
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 20px",
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonMain.dark}`,
      display: "inline-block"
    }
  })
);

export const RegularButton = ({ label ,onClick}) => {
  const classes = useStyles();
  return (
    <Button variant="contained" className={classes.button} onClick={onClick}>
      {label}
    </Button>
  );
};

RegularButton.defaultProps={
  onClick:null
}