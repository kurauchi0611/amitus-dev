import React from "react";
import {App} from "./containers/App";
import {
  // Box,
  //   Button,
  //   Grid,
  //   Paper,
  // Typography,
  Container,
  // CssBaseline
  // Divider
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(9),
      paddingTop:theme.spacing(2),
      display:"flex",
      flexFlow:"row",
      justifyContent:"center",
      height:`calc(100vh - ${theme.spacing(10)}px)`
    },
  })
)

export default ({props}) => {
  const classes=useStyles();
  return (
    <Container className={classes.margin} maxWidth="xl">
        <App props={props} />
    </Container>
  );
};


