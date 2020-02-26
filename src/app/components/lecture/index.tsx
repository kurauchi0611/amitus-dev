import React from "react";
import {App} from "./containers/App";
import { Provider } from "react-redux";
import configureStore from "./store";

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

export default () => {
  const classes=useStyles();
  const store = configureStore();
  return (
    <Container className={classes.margin}>
      <Provider store={store}>
        <App />
      </Provider>
    </Container>
  );
};
