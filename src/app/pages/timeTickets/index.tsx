import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownEditor } from "../../components/mdEditor/MarkDownEditor";
import { MarkDownViewer } from "../../components/mdEditor/MarkDownViewer";
import { Tags } from "../../components/mdEditor/Tags";
import { SendButton } from "../../components/mdEditor/sendButton";
import React from "react";
import { ticketDB } from "../../firebase/timeTickets";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      overflow: "hidden",
      marginTop: theme.spacing(10),
      paddingBottom: theme.spacing(5),
      height: `calc(100vh - ${theme.spacing(10)}px)`
    },
    title: { background: "#fff", marginBottom: theme.spacing(2) },
    error: {
      background: theme.palette.buttonCancel.main
    },
    border: {
      border: "1px solid #c8ccd0",
      borderRadius: "5px",
      marginLeft: theme.spacing(4),
      overflow: "hidden",
      height: "100%"
    },
    height: {
      height: "85%"
    },
    height2: {
      height: "100%"
      // paddingRight: theme.spacing(10),
      // paddingLeft: theme.spacing(10),
    },
    rightWrap: {
      display: "flex",
      flexFlow: "column"
    },
    setFlex: {
      flex: "1 1 100%"
    },
    formMargin: {
      width: "100%",
      background: "#fff",
      "& label": {
        color: "#FFA50E !important",
        // 金額のシャドウ、微妙
        textShadow: "1px 1px 4px rgba(66,33,11,.3)"
      }
    },
    textField: { color: "#FFCB2E" },
    moneyField: {
      color: "#FFA50E",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FDC92B !important"
      }
    },
    moneyRate: {
      "& p": {
        color: "#FFA50E !important",
        // 金額のシャドウ、微妙
        textShadow: "1px 1px 1px rgba(66,33,11,.1)"
      }
    },
    wrapBox: {
      height: "105%",
      background: "#fff",
      paddingTop: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5)
    }
  })
);

const Index = ({ isuser }) => {
  const classes = useStyles();
  const router = useRouter();
  const [error, setError] = React.useState<any | null>();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<{
    title: string;
    tags: any;
    text: any;
    index: number;
    userData: any;
    amount?: number | null;
  }>({
    title: "",
    tags: null,
    text: sampleMoji,
    index: 0,
    userData: isuser,
    amount: undefined
  });
  React.useEffect(() => {
    setState({ ...state, userData: isuser });
  }, [isuser]);

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
  const sendTicket = async () => {
    if (state.title !== "" && state.tags !== null && state.text !== "") {
      if (state.index === 0) {
        const postTicket = await ticketDB.postTicket(state);
        if (postTicket !== null) {
          console.log(postTicket);

          router.push("/timeTickets/[id]", `/timeTickets/${postTicket}`);
        } else {
          setError(
            <Alert severity="error" className={classes.error} variant="filled">
              投稿に失敗しました
            </Alert>
          );
        }
      } else if (state.index === 1) {
        ticketDB
          .draftTickets(state)
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
        <Box className={classes.wrapBox}>
          <Grid
            container
            direction="row"
            alignContent="stretch"
            className={classes.height}
          >
            <Grid item xs={6} className={classes.rightWrap}>
              <TextField
                className={classes.title}
                fullWidth={true}
                onChange={handleChange("title")}
                label="チケットタイトル"
                variant="outlined"
                value={state.title}
              />
              <Tags handleChange={handleChange("tags")} />
              <Box mt={2} className={classes.setFlex}>
                <MarkDownEditor
                  handleChange={handleChange("text")}
                  text={state.text}
                />
              </Box>
              <Box mt={2}>
                <FormControl className={classes.formMargin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-moneyAmount">
                    金額を入力してください。
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-moneyAmount"
                    className={classes.moneyField}
                    onChange={handleChange("amount")}
                    endAdornment={
                      <InputAdornment
                        position="end"
                        className={classes.moneyRate}
                      >
                        円/30分
                      </InputAdornment>
                    }
                    labelWidth={210}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} className={classes.height2}>
              <Box className={classes.border}>
                <MarkDownViewer text={state.text} isEdit={true} />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box mt={3}>
              {typeof state.userData !== "undefined" &&
                state.userData !== null && (
                  <SendButton
                    handleChange={handleChange("index")}
                    selectedIndex={state.index}
                    onClick={sendTicket}
                    label={"チケット"}
                  />
                )}
            </Box>
          </Grid>
        </Box>
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
