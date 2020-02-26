import { Container, CssBaseline, Snackbar, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownEditor } from "../../components/mdEditor/MarkDownEditor";
import { Tags } from "../../components/mdEditor/Tags";
import { SendButton } from "../../components/mdEditor/sendButton";
import React from "react";
import { questionDB } from "../../firebase/questions";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10) },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    error: {
      background: theme.palette.buttonCancel.main
    }
  })
);

const Index = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const sampleMoji =
    "# 助けて(´;ω;｀)\n```js\nconst arrowDisplayNone = () => {\n  document.querySelectorAll('.arrow').forEach(item => {\n    item.style.display = 'none';\n  }\n)}\n```";
  const [error, setError] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<{
    title: string;
    tags: any;
    text: any;
    index: number;
    userData: any;
  }>({
    title: "",
    tags: [],
    text: sampleMoji,
    index: 0,
    userData: props
  });
  React.useEffect(() => {
    setState({ ...state, userData: props });
  }, [props]);

  const handleChange = name => event => {
    if (name === "text") {
      setState({
        ...state,
        [name]: event
      });
    } else if (name === "tags") {
      const tagsArray: string[] = [];
      event.forEach((item: any) => {
        tagsArray.push(item.lang);
      });
      setState({
        ...state,
        [name]: tagsArray
      });
      console.log(tagsArray);
      
    } else if (name === "index") {
      setState({
        ...state,
        [name]: event
      });
    } else if (name === "title") {
      setState({
        ...state,
        [name]: event.target.value
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sendQuestion = async () => {
    if (state.text !== "" && state.tags !== null && state.text !== "") {
      if (state.index === 0) {
        const postQuestion = await questionDB.postQuestion(state);
        if (postQuestion !== null) {
          console.log(postQuestion);
          router.push("/questions/[id]", `/questions/${postQuestion}`);
        } else {
          setError(
            <Alert severity="error" className={classes.error} variant="filled">
              投稿に失敗しました
            </Alert>
          );
        }
      } else if (state.index === 1) {
        await questionDB
          .draftQuestion(state)
          .then(() => {
            router.push("/mypage");
          })
          .catch(() => {
            setError(
              <Alert
                severity="error"
                className={classes.error}
                variant="filled"
              >
                下書き保存に失敗しました
              </Alert>
            );
          });
      }
    } else {
      setError(
        <Alert severity="error" className={classes.error} variant="filled">
          全項目入力してください。
        </Alert>
      );
      setOpen(true);
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.margin}>
        <TextField
          className={classes.title}
          fullWidth={true}
          onChange={handleChange("title")}
          label="タイトル"
          variant="outlined"
          value={state.title}
        />
        <Tags handleChange={handleChange("tags")} tags={state.tags}/>
        <MarkDownEditor handleChange={handleChange("text")} text={state.text} />
        {typeof state.userData !== "undefined" && state.userData !== null && (
          <SendButton
            handleChange={handleChange("index")}
            selectedIndex={state.index}
            onClick={sendQuestion}
          />
        )}
      </Container>
      <Snackbar autoHideDuration={2000} open={open} onClose={handleClose}>
        {error}
      </Snackbar>
    </React.Fragment>
  );
};

export default Index;
