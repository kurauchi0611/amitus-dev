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
      marginTop: theme.spacing(10),
      background: "#fff",
      padding: "0",
      paddingBottom: theme.spacing(10)
    },
  })
)

export default ({props}) => {
  const classes=useStyles();
  return (
    <Container className={classes.margin}>
        <App props={props} />
    </Container>
  );
};
