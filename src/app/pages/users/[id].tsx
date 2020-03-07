import { Container, CssBaseline, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { UserStatus } from "../../components/users/userStatus";
import { UserContent } from "../../components/users/userContent";
import { useRouter } from "next/router";
import { accountDB } from "../../firebase/account";
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
      justifyContent: "space-around",
      paddingRight: theme.spacing(5)
    },
    contentPadding: {
      padding: theme.spacing(4)
    },
    gridWrap: {
      background: "#fff",
    }
  })
);

const Index = ({ props, dm }) => {
  if (false) console.log(props);
  const classes = useStyles();
  const router = useRouter();
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
    language: [],
    name: "",
    photoURL: "",
    rating: 1,
    follow: 0,
    follower: 0,
    uid: ""
  });
  React.useEffect(() => {
    if (typeof router.query.id !== "undefined") {
      const cleanup = async () => {
        const getUser = await accountDB.getUser(router.query.id);
        const userData: any = getUser.data();
        if (typeof userData != "undefined") {
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
            uid: router.query.id
          });
        }
      };
      cleanup();
    }
  }, [router.query.id]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.margin}>
        <Grid container className={classes.gridWrap}>
          <UserStatus props={userState} dm={dm} />
          <UserContent props={userState} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Index;
