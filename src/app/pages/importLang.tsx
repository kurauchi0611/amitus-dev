import { Container, CssBaseline, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import lang from "../public/data/langdata.json";
import { db } from "../firebase/firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10) },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    button: {
      fontSize: "18px",
      display: "flex",
      marginTop: "2px",
      background: theme.palette.buttonMain.main,
      borderRadius: 3,
      border: 0,
      color: "white",
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonMain.dark}`
    }
  })
);

const Index = () => {
  if (false) {
    console.log(lang);
  }
  const addLang = () => {
    db.collection("language")
      .doc("lang")
      .set({
        language: lang
      })
      .then(() => {
        console.log("success");
      });
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.margin} maxWidth="lg">
        <Button className={classes.button} onClick={addLang}>
          {"登録"}
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default Index;
