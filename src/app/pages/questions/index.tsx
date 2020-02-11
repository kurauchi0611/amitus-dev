import { Container, CssBaseline, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownEditor } from "../../components/mdEditor/MarkDownEditor";
import { Tags } from "../../components/mdEditor/Tags";
import { SendButton } from "../../components/mdEditor/sendButton";
import React from "react";
import { questionDB } from "../../firebase/questions";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10) },
    title: { background: "#fff", marginBottom: theme.spacing(1) }
  })
);

const Index = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const sampleMoji =
    "# 助けて(´;ω;｀)\n```js\nconst arrowDisplayNone = () => {\n  document.querySelectorAll('.arrow').forEach(item => {\n    item.style.display = 'none';\n  }\n)}\n```";
  const [state, setState] = React.useState<{
    title: string;
    tags: any;
    text: any;
    index: number;
    userData: any;
  }>({
    title: "",
    tags: "",
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
  const sendQuestion = () => {
    questionDB.postQuestion(state).then(res => {
      router.push("/questions/[id]", `/questions/${res.id}`);
    });
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
        <Tags handleChange={handleChange("tags")} />
        <MarkDownEditor handleChange={handleChange("text")} text={state.text} />
        {typeof state.userData !== "undefined" && state.userData !== null && (
          <SendButton
            handleChange={handleChange("index")}
            selectedIndex={state.index}
            onClick={sendQuestion}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default Index;
