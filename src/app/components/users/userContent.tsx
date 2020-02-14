import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { ViewCard } from "../viewCard/viewCard";
import { RegularButton } from "../regularButton";
import { questionDB } from "../../firebase/questions";
import { ticketDB } from "../../firebase/timeTickets";
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
  const [myQuestions, setMyQuestions] = React.useState();
  const [myTickets, setMyTickets] = React.useState();
  React.useEffect(() => {
    setState({ ...state, userData: props });
    if (typeof props !== "undefined" && props.uid !== "") {
      const cleanup = async () => {
        const getMyQuestions = await questionDB.showMyQuestions(props.uid);
        const getMyTickets = await ticketDB.showMyTickets(props.uid);
        const myQuestionsData: any = getMyQuestions;
        const myTicketsData: any = getMyTickets;
        setMyQuestions(myQuestionsData);
        setMyTickets(myTicketsData);
        console.log(myQuestions);
        console.log(myQuestionsData.docs);
        console.log(myTickets);
        console.log(myTicketsData.docs);
      };
      cleanup();
    }
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
              {typeof state.userData !== "undefined" && state.userData.name}
              の質問
            </Typography>
            <Divider className={classes.divider} component="div" />
            {/* userのmyTicketsを取ってくる */}
            <ViewCard
            label={"questions"}
              views={typeof myQuestions !== "undefined" && myQuestions.docs}
            />
            {/* todo:5件以上ある時は「もっと見る」無い時は何も表示しないように */}
            {typeof myQuestions !== "undefined" &&myQuestions.docs.length==5&&
            <RegularButton label={"もっと見る"} />
            }
          </Paper>
        </Grid>
        <Grid item xs={6} className={classes.contentPadding}>
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h5" component="h2">
              {typeof state.userData !== "undefined" && state.userData.name}
              のチケット
            </Typography>
            <Divider className={classes.divider} component="div" />
            {/* userのmyTicketsを取ってくる */}
            <ViewCard
            label={"tickets"}
              views={typeof myTickets !== "undefined" &&myTickets.docs}
            />
            {/* todo:5件以上ある時は「もっと見る」無い時は何も表示しないように */}
            {typeof myTickets !== "undefined" &&myTickets.docs.length==5&&
            <RegularButton label={"もっと見る"} />
            }
          </Paper>
        </Grid>
      </Paper>
    </Grid>
  );
};
