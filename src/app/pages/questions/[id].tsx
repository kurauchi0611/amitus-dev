import {
  Button,
  CardActionArea,
  Grid,
  Paper,
  Typography,
  Container,
  CssBaseline,
  Divider
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownViewer } from "../../components/mdEditor/MarkDownViewer";
import { Chips } from "../../components/mdEditor/chips";
import { UserInfo } from "../../components/account/userInfo";
import React from "react";
import { questionDB } from "../../firebase/questions";
import { useRouter } from "next/router";
import format from "date-fns/format";
import { MarkDownEditor } from "../../components/mdEditor/MarkDownEditor";
import Link from "next/link";
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
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    userInfo: { width: "100%", display: "flex", alignItems: "center" },
    timestamp: {
      fontSize: ".8rem",
      width: "max-content",
      marginLeft: theme.spacing(2)
    },
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
      paddingTop: theme.spacing(4),
      display: "flex",
      flexFlow: "column",
      alignItems: "flex-end"
    },
    paddingLR: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    editWrap: {
      height: "300px"
    },
    linkButton: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-start",
      "& a": {
        alignItems: "center",
        width: "100%",
        display: "flex",
        textDecoration: "none",
        "& h3": {
          marginTop: theme.spacing(2),
          borderLeft: `solid 4px ${theme.palette.primary.main}`,
          paddingLeft: theme.spacing(2)
        }
      },
      "& a:link": {
        color: "#757575"
      },
      "& a:visited": {
        color: "#757575"
      }
    }
  })
);

const Index = ({ props }) => {
  const router = useRouter();
  const classes = useStyles();
  const [comment, setComment] = React.useState("");
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
  const [commentState, setCommentState] = React.useState<any | null>();
  const [myData, setmyData] = React.useState();
  React.useEffect(() => {
    setmyData(props);
  }, [props]);

  React.useEffect(() => {
    if (typeof router.query.id !== "undefined") {
      const cleanup = async () => {
        const getQuestion = await questionDB.showQuestion(router.query.id);
        const questionData: any = getQuestion.question.data();
        console.log(questionData);

        if (typeof questionData != "undefined") {
          setCommentState(getQuestion.comments);
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
        }
      };
      cleanup();
    }
  }, [router.query.id]);

  const handleChange = () => event => {
    setComment(event);
  };
  const postComment = () => {
    console.log(myData);

    // console.log(state.myData);

    if (comment !== "") {
      questionDB
        .postComment({
          text: comment,
          userData: myData,
          uid: router.query.id
        })
        .then(() => {
          console.log("success");
          router.push("/questions/[id]", `/questions/${router.query.id}`);
        });
    }
  };
  console.log(state);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.margin}>
        <div className={classes.userInfo + " " + classes.padding}>
          <CardActionArea className={classes.linkButton}>
            {state.userData !== null && (
              <Link href="/users/[id]" as={`/users/${state.userData.uid}`}>
                <a>
                  <UserInfo userInfo={state.userData} />
                  <Typography className={classes.timestamp}>
                    {state.createdAt}
                  </Typography>
                </a>
              </Link>
            )}
          </CardActionArea>
        </div>
        <Typography className={classes.paddingLR} variant="h3">
          {state.title}
        </Typography>
        <div className={classes.paddingLR}>
          <Chips labels={state.tags} />
        </div>
        <div className={classes.paddingLR}>
          <MarkDownViewer text={state.text} isEdit={false} />
        </div>
      </Container>
      <Container maxWidth="lg" className={classes.commentWrap}>
        <Typography className={classes.paddingSmall} variant="h4">
          {"コメント"}
        </Typography>
        <Divider className={classes.divider} component="div" />
        {commentState && commentState.empty && (
          <Typography className={classes.paddingSmall} variant="h6">
            {"コメントはありません"}
          </Typography>
        )}
        {commentState &&
          commentState.docs.map((element, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Paper className={classes.paper} elevation={8}>
                  <div className={classes.userInfo + " " + classes.padding}>
                    <UserInfo userInfo={element.data().userData} />
                    <Typography className={classes.timestamp}>
                      {`${format(
                        new Date(element.data().createdAt.seconds * 1000),
                        "yyyy年MM月dd日HH時mm分投稿"
                      )}`}
                    </Typography>
                  </div>
                  <MarkDownViewer
                    text={`${element.data().text}`}
                    isEdit={false}
                  />
                </Paper>
              </Grid>
            );
          })}
        <div className={classes.marginSmall}>
          <Typography className={classes.marginSmall} variant="h5">
            {"コメントを投稿する"}
          </Typography>
          <Divider className={classes.divider} component="div" />
          <div className={classes.editWrap}>
            <MarkDownEditor handleChange={handleChange()} text={comment} />
          </div>
          <div className={classes.flex}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={postComment}
            >
              コメントする
            </Button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

// const tags = ["The Shawshank Redemption", "The Dark Knight", "Pulp Fiction"];

export default Index;
