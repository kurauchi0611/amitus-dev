import {
  //   Button,
  //   Grid,
  //   Paper,
  Typography,
  Container,
  CssBaseline
  // Divider
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownViewer } from "../../components/mdEditor/MarkDownViewer";
import { Chips } from "../../components/mdEditor/chips";
import { UserInfo } from "../../components/account/userInfo";
import React from "react";
import { ticketDB } from "../../firebase/timeTickets";
import { useRouter } from "next/router";
import format from "date-fns/format";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(10),
      background: "#fff",
      padding: "0",
      paddingBottom: theme.spacing(10)
    },
    padding: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    userInfo: { width: "30%", display: "flex", alignItems: "center" },
    timestamp: { fontSize: ".8rem", width: "500px" },
    commentWrap: {
      background: "#fff",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    paper: {
      marginTop: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
      // textAlign: "center",
      // color: theme.palette.text.secondary
    },
    marginSmall: {
      marginTop: theme.spacing(3)
    },
    paddingSmall: {
      paddingTop: theme.spacing(3)
    },
    divider: {
      background: theme.palette.buttonMain.main,
      height: "2px",
      marginBottom: theme.spacing(2)
    },
    button: {
      fontSize: "18px",
      display: "flex",
      marginTop: "2px",
      background: theme.palette.buttonMain.main,
      borderRadius: 3,
      border: 0,
      color: "white",
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonMain.dark}`
    },
    flex: {
      display: "flex",
      flexFlow: "column",
      alignItems: "flex-end"
    },
    paddingLR: { paddingLeft: theme.spacing(5), paddingRight: theme.spacing(5) }
  })
);

const Index = ({ props }) => {
  const router = useRouter();
  const classes = useStyles();
  const [state, setState] = React.useState<{
    title: string;
    tags: any;
    text: any;
    index: number;
    userData: any;
    pageView: number;
    createdAt: any;
    amount: number;
  }>({
    title: "",
    tags: [],
    text: "",
    index: 0,
    userData: null,
    pageView: 0,
    createdAt: null,
    amount: 0
  });
  const [myData, setmyData] = React.useState();
  React.useEffect(() => {
    setmyData(props);
    console.log(myData);
  }, [props]);

  React.useEffect(() => {
    if (typeof router.query.id !== "undefined") {
      const cleanup = async () => {
        const getTicket = await ticketDB.showTickets(router.query.id);
        console.log(getTicket);
        if (typeof getTicket != "undefined") {
          setState({
            ...state,
            title: getTicket.title,
            tags: getTicket.tags,
            text: getTicket.text,
            userData: getTicket.user,
            pageView: getTicket.pageView,
            createdAt: format(
              new Date(getTicket.createdAt.seconds * 1000),
              "yyyy年MM月dd日HH時mm分投稿"
            ),
            amount: getTicket.amount
          });
        }
      };
      cleanup();
    }
  }, [router.query.id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.margin}>
        <div className={classes.userInfo + " " + classes.padding}>
          <UserInfo userInfo={state.userData} />
          <Typography className={classes.timestamp}>
            {state.createdAt}
          </Typography>
        </div>
        <Typography className={classes.padding} variant="h3">
          {state.title}
        </Typography>
        <div className={classes.paddingLR}>
          <Chips labels={state.tags} />
        </div>
        <MarkDownViewer text={state.text} />
      </Container>
    </React.Fragment>
  );
};

// const tags = ["The Shawshank Redemption", "The Dark Knight", "Pulp Fiction"];

export default Index;
