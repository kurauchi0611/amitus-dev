/* eslint-disable */
import React from "react";
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      display: "flex",
      flexFlow: "row",
      justifyContent: "space-around",
      // alignItems: "center",
      // textAlign: "center",
      marginTop: theme.spacing(10),
      background: theme.palette.background.paper
    },

    root: {
      marginBottom: theme.spacing(2)
    },

    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },

    expandOpen: {
      transform: "rotate(180deg)"
    },

    avatar: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1)
      },
      backgroundColor: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
      width: theme.spacing(7),
      height: theme.spacing(7)
    },

    cardHeader: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      marginLeft: theme.spacing(2)
    },

    info1: {
      display: "flex",
      alignItems: "center"
    },

    info2: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      right: "0",
      marginRight: theme.spacing(5)
    },

    cardContent: {
      borderLeft: "solid 3px",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: "0",
      paddingLeft: theme.spacing(2),
      borderColor: "#16A196"
    },

    left: {
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2)
    },

    right: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2)
    },

    paper: {
      marginBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary
    },

    icon: {
      padding: "0 0 0 5px"
    },

    center: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center"
    },

    margin: {
      marginTop: theme.spacing(3)
    },

    title: {
      fontSize: "1.2rem",
      color: theme.palette.text.primary,
      borderLeft: "solid 3px",
      paddingLeft: theme.spacing(2),
      borderColor: "#16A196"
    },
    price: {
      color: "#fdd835",
      fontWeight: "bold",
      textShadow: "1px 1px 1px black",
      fontSize: "18px"
    },
    media: {
      height: 0,
      paddingTop: "31.25%"
      // paddingTop: '56.25%', // 16:9
    },
    menuColor: {
      background: "#fff"
    }
  })
);

export default function TopPage({ dm }) {
  console.log(dm);
  const classes = useStyles();

  return (
    <Container className={classes.wrap}>
    </Container>
  );
}
