import { Typography, Container, CssBaseline } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownViewer } from "../../components/mdEditor/MarkDownViewer";
import { Chips } from "../../components/mdEditor/chips";
import { UserInfo } from "../../components/account/userInfo";
import React from "react";
import { questionDB } from "../../firebase/questions";
import { useRouter } from "next/router";
import format from "date-fns/format";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10), background: "#fff", padding: "0" },
    padding: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    userInfo: { width: "30%", display: "flex", alignItems: "center" },
    timestamp: { fontSize: ".8rem", width: "500px" }
  })
);

const Index = ({ props }) => {
  const router = useRouter();
  console.log(router.query.id);
  const classes = useStyles();
  // const sampleMoji =
  //   "# 助けて(´;ω;｀)\n```js\nconst arrowDisplayNone = () => {\n  document.querySelectorAll('.arrow').forEach(item => {\n    item.style.display = 'none';\n  }\n)}\n```";
  const [state, setState] = React.useState<{
    title: string;
    tags: any;
    text: any;
    index: number;
    userData: any;
    pageView: number;
    createdAt: any;
    isResolve: boolean;
  }>({
    title: "",
    tags: [],
    text: "",
    index: 0,
    userData: null,
    pageView: 0,
    createdAt: null,
    isResolve: false
  });
  React.useEffect(() => {
    setState({ ...state, userData: props });
  }, [props]);
  React.useEffect(() => {
    if (typeof router.query.id !== "undefined") {
      const cleanup = async () => {
        const getQuestion = await questionDB.showQuestion(router.query.id);
        const questionData: any = getQuestion.data();
        console.log(questionData);
        console.log(
          format(
            new Date(questionData.createdAt.seconds * 1000),
            "yyyy年MM月dd日HH時mm分"
          )
        );
        setState({
          ...state,
          title: questionData.title,
          tags: questionData.tags,
          text: questionData.text,
          userData: questionData.user,
          pageView: questionData.pageView,
          createdAt: format(
            new Date(questionData.createdAt.seconds * 1000),
            "yyyy年MM月dd日HH時mm分投稿"
          ),
          isResolve: questionData.isResolve
        });
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
        <Chips labels={state.tags} />
        <MarkDownViewer text={state.text} />
      </Container>
    </React.Fragment>
  );
};

// const tags = ["The Shawshank Redemption", "The Dark Knight", "Pulp Fiction"];

export default Index;
