import { Container, CssBaseline, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { UserStatus } from "../../components/users/userStatus";
import { UserContent } from "../../components/users/userContent";
// import { useRouter } from "next/router";
// import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10) },
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
    }
  })
);

const Index = ({ props }) => {
  const classes = useStyles();
  // const router = useRouter();
  const [state, setState] = React.useState<{
    userData: any;
  }>({
    userData: props
  });
  React.useEffect(() => {
    setState({ ...state, userData: props });
  }, [props]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.margin}>
        <Grid container spacing={3}>
          <UserStatus props={props} />
          <UserContent props={props} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Index;
