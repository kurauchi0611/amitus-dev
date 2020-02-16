import { Avatar, Grid, Paper, Typography, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { RegularButton } from "../regularButton";
import { Chips } from "../mdEditor/chips";
import { Ratings } from "./rating";
import { ChangeMyStatus } from "./changeMyStatus";
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
    }
  })
);

export const MyStatus = ({ props }) => {
  const classes = useStyles();
  // const router = useRouter();
  const [state, setState] = React.useState<{
    userData: any;
  }>({
    userData: props
  });
  const [langState, setLangState] = React.useState<any | null>([]);
  React.useEffect(() => {
    setState({ ...state, userData: props });
    if (props.language !== null) {
      const lang = props.language.map(item => item.lang);
      setLangState(lang);
    }
  }, [props]);
  return (
    <Grid item xs={2}>
      <Paper className={classes.paper + " " + classes.status} elevation={6}>
        <Avatar variant="square" className={classes.avatar}>
          NO
        </Avatar>
        <Typography variant="h4" component="p" className={classes.typo}>
          {typeof state.userData !== "undefined" && state.userData.name}
        </Typography>
        <Divider className={classes.divider} component="div" />
        <Typography variant="body1" component="p" className={classes.typo}>
          {typeof state.userData !== "undefined" && state.userData.introduction}
        </Typography>
        <Divider className={classes.divider} component="div" />
        <ChangeMyStatus props={state.userData} />
        <Divider className={classes.divider} component="div" />
        <Grid item className={classes.ff}>
          <Typography variant="body1" component="p">
            フォロー：
            {typeof state.userData !== "undefined" && state.userData.follow}人
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            フォロワー:
            {typeof state.userData !== "undefined" && state.userData.follower}人
          </Typography>
        </Grid>
        <RegularButton label={"フォローする"} />
        <Divider className={classes.divider} component="div" />
        <Ratings
          rating={
            typeof state.userData !== "undefined" && state.userData.rating
          }
        />
        <RegularButton label={"評価一覧"} />
        <Divider className={classes.divider} component="div" />
        <Grid item>
          <Typography variant="body1" component="p">
            スキル一覧
          </Typography>
          <Chips labels={langState} />
        </Grid>
      </Paper>
    </Grid>
  );
};

// const tags = ["Javascript", "HTML", "CSS", "React", "NEXT.js", "firebase"];
