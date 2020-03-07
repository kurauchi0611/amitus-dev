import { Container, CssBaseline, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { MyStatus } from "../../components/users/myStatus";
import { UserContent } from "../../components/users/userContent";
// import { accountDB } from "../../firebase/account";

import { db } from "../../firebase/firebase";
// import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(11),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    error: {
      background: theme.palette.buttonCancel.main
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    avatar: {
      fontSize: "5vw",
      width: "10vw",
      height: "10vw",
      color: "#fff",
      background: theme.palette.buttonMain.main
    },
    status: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center"
    },
    typo: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    divider: {
      background: theme.palette.buttonMain.main,
      width: "100%",
      height: "2px",
      margin: `${theme.spacing(1)}px auto`
    },
    ff: {
      textAlign: "left"
    },
    content: {
      display: "flex",
      flexFlow: "wrap",
      justifyContent: "space-around"
    },
    contentPadding: {
      padding: theme.spacing(4)
    },
    gridWrap: {
      background: "#fff",
    }
  })
);

const Index = ({ props }) => {
  const classes = useStyles();
  const [userState, setUserState] = React.useState<{
    createdAt: any;
    email: string;
    introduction: string;
    language: any;
    name: string;
    photoURL: string;
    rating: number;
    follow: number;
    follower: number;
    uid: any;
  }>({
    createdAt: null,
    email: "",
    introduction: "",
    language: null,
    name: "",
    photoURL: "",
    rating: 1,
    follow: 0,
    follower: 0,
    uid: ""
  });
  React.useEffect(() => {
    if (typeof props !== "undefined") {
      db.collection("users")
        .doc(props.uid)
        .onSnapshot(doc => {
          console.log(doc);
          const userData:any|null = doc.data();
          setUserState({
            ...userState,
            createdAt: userData.createdAt,
            email: userData.email,
            introduction: userData.introduction,
            language: userData.language,
            name: userData.displayName,
            photoURL: userData.photoURL,
            rating: userData.rating,
            follow: userData.follow,
            follower: userData.follower,
            uid: props.uid
          });
        });
    }
  }, [props]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.margin}>
        <Grid container  className={classes.gridWrap}>
          <MyStatus props={userState} />
          <UserContent props={userState} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Index;
