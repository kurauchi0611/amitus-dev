import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Divider
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { RegularButton } from "../regularButton";
import { Chips } from "../mdEditor/chips";
import { Ratings } from "./rating";
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

export const UserStatus = ({ props }) => {
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
      <Grid item xs={2}>
        <Paper className={classes.paper + " " + classes.status} elevation={6}>
          <Avatar variant="square" className={classes.avatar}>
            NO
          </Avatar>
          <Typography variant="h4" component="p" className={classes.typo}>
            倉内
          </Typography>
          <Divider className={classes.divider} component="div" />
          <Typography variant="body1" component="p" className={classes.typo}>
            HAL東京2019年4年制IT2年Bクラス委員長。HEWグループリーダー。おれんじ
          </Typography>
          <Divider className={classes.divider} component="div" />
          <RegularButton label={"DMを送る"} />
          <Divider className={classes.divider} component="div" />
          <Grid item className={classes.ff}>
            <Typography variant="body1" component="p">
              フォロー：100人
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              フォロワー:1000000000人
            </Typography>
          </Grid>
          <RegularButton label={"フォローする"} />
          <Divider className={classes.divider} component="div" />
          <Ratings rating={5} />
          <RegularButton label={"評価一覧"} />
          <Divider className={classes.divider} component="div" />
          <Grid item>
            <Typography variant="body1" component="p">
              スキル一覧
            </Typography>
            <Chips labels={tags} />
          </Grid>
        </Paper>
      </Grid>
  );
};

const tags = ["Javascript", "HTML", "CSS", "React", "NEXT.js", "firebase"];
