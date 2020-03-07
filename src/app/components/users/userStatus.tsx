import {
  Avatar,
  Box,
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
    margin: {
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(10),
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
      // background: theme.palette.buttonMain.main,
      width: "60%",
      height: "2px",
      margin: `${theme.spacing(1)}px auto`
    },
    ff: {
      textAlign: "left"
    },
    baloon: {
      "&:before": {
        content: '""',
        position: "absolute",
        top: "-40px",
        left: "50%",
        border: "20px solid transparent",
        marginLeft: "-20px",
        borderBottom: "20px solid #E0E0E0",
        zIndex: 2
      },
      "&:after": {
        content: '""',
        position: "absolute",
        top: "-36px",
        left: "50%",
        border: "19px solid transparent",
        marginLeft: "-19px",
        borderBottom: "19px solid #fff",
        zIndex: 2
      }
    }
  })
);

export const UserStatus = ({ props, dm }) => {
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

  const toggleDM = () => {
    if (!dm.dMopen) {
      dm.handleDMMember(state.userData.uid);
      return dm.handleDMOpen;
    } else return dm.handleDMClose;
  };

  return (
    <Grid item xs={3} className={classes.margin}>
      <Paper className={classes.paper + " " + classes.status} elevation={6}>
        {typeof state.userData !== "undefined" && state.userData.photoURL && (
          <Avatar
            variant="square"
            className={classes.avatar}
            alt={state.userData.displayName}
            src={state.userData.photoURL}
          />
        )}
        {typeof state.userData !== "undefined" &&
          state.userData.photoURL === null && (
            <Avatar variant="square" className={classes.avatar}>
              NO
            </Avatar>
          )}
        <Typography variant="h4" component="p" className={classes.typo}>
          {typeof state.userData !== "undefined" && state.userData.name}
        </Typography>
        {/* <Divider className={classes.divider} component="div" /> */}
        <Box
          width="100%"
          border={2}
          my={2}
          px={2}
          borderColor="#E0E0E0"
          className={classes.baloon}
          position="relative"
        >
          <Typography variant="body1" component="p" className={classes.typo}>
            {typeof state.userData !== "undefined" &&
              state.userData.introduction}
          </Typography>
        </Box>
        {/* <Divider className={classes.divider} component="div" /> */}
        <RegularButton label={"DMを送る"} onClick={toggleDM()} />
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
