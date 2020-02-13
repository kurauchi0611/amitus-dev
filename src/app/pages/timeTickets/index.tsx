import { Container, CssBaseline, Snackbar, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownEditor } from "../../components/mdEditor/MarkDownEditor";
import { Tags } from "../../components/mdEditor/Tags";
import { SendButton } from "../../components/mdEditor/sendButton";
import React from "react";
import { ticketDB  } from "../../firebase/timeTickets";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10) },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    error: {
      background: theme.palette.buttonCancel.main
    },
    flex: {
      display: "flex",
      flexFlow: "row",
      alignItems: "end",
      justifyContent: "flex-end"
    }
  })
);

const Index = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const [error, setError] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<{
    title: string;
    tags: any;
    text: any;
    index: number;
    userData: any;
    amount: number;
  }>({
    title: "",
    tags: null,
    text: sampleMoji,
    index: 0,
    userData: props,
    amount: 1000
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
    } else if (name === "amount") {
      setState({
        ...state,
        [name]: event.target.value
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sendTicket = () => {
    if (state.text !== "" && state.tags !== null && state.text !== "") {
      if (state.index === 0) {
        ticketDB.postTicket(state).then(res => {
          router.push("/timeTickets/[id]", `/timeTickets/${res.id}`);
        });
      } else if (state.index === 1) {
        ticketDB.draftTickets(state).then(() => {
          router.push("/mypage");
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
        <Tags handleChange={handleChange("tags")} />
        <MarkDownEditor handleChange={handleChange("text")} text={state.text} />
        <div className={classes.flex}>
          <TextField
            className={classes.title}
            onChange={handleChange("amount")}
            variant="outlined"
            value={state.amount}
          />
          <p>円/30分</p>
          {typeof state.userData !== "undefined" && state.userData !== null && (
            <SendButton
              handleChange={handleChange("index")}
              selectedIndex={state.index}
              onClick={sendTicket}
            />
          )}
        </div>
      </Container>
      <Snackbar autoHideDuration={2000} open={open} onClose={handleClose}>
        {error}
      </Snackbar>
    </React.Fragment>
  );
};

export default Index;


const sampleMoji =
    "# 助けて(´;ω;｀)\n```js\nconst arrowDisplayNone = () => {\n  document.querySelectorAll('.arrow').forEach(item => {\n    item.style.display = 'none';\n  }\n)}\n```";