import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { ViewCard } from "../viewCard/viewCard";
import { RegularButton } from "../regularButton";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    divider: {
      background: theme.palette.buttonMain.main,
      width: "100%",
      height: "2px",
      margin: `${theme.spacing(1)}px auto`
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

export const UserContent = ({ props }) => {
  const classes = useStyles();
  // const router = useRouter();
  const [state, setState] = React.useState<{
    userData: any;
  }>({
    userData: props
  });
  React.useEffect(() => {
    setState({ ...state, userData: props });
    console.log(state.userData);
  }, [props]);
  return (
    <Grid item xs={10}>
      <Paper className={classes.paper + " " + classes.content} elevation={6}>
        <Grid item xs={12} className={classes.contentPadding}>
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h5" component="h2">
              スケジュール
            </Typography>
            <Divider className={classes.divider} component="div" />
            <div style={{ width: "100%", height: "300px" }}>
              ここにschedule的なの
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} className={classes.contentPadding}>
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h5" component="h2">
              倉内の質問
            </Typography>
            <Divider className={classes.divider} component="div" />
            <ViewCard />
            <ViewCard />
            <ViewCard />
            <ViewCard />
            <ViewCard />
            <RegularButton label={"もっと見る"}/>
          </Paper>
        </Grid>
        <Grid item xs={6} className={classes.contentPadding}>
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h5" component="h2">
              倉内のチケット
            </Typography>
            <Divider className={classes.divider} component="div" />
            <ViewCard />
            <ViewCard />
            <ViewCard />
            <ViewCard />
            <ViewCard />
            <RegularButton label={"もっと見る"}/>
          </Paper>
        </Grid>
      </Paper>
    </Grid>
  );
};
