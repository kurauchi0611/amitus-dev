import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  InputBase,
  Divider,
  Avatar
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { db } from "../../firebase/firebase";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";
import { chatDB } from "../../firebase/chat";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
      // minHeight: 600
    },
    roots: {
      background: "#fff",
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      position: "fixed",
      bottom: 0,
      left: 0
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    },
    imageInput: {
      display: "none"
    },
    // ここから↓チャット
    chatWrap: {
      display: "flex",
      flexFlow: "column-reverse"
    },
    chatBox: {
      display: "flex",
      alignItems: "center"
    },
    chatTextArea: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
      borderRadius: "15px",
      maxWidth: "250px"
    },
    chatBox2: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    }
  })
);

export const ChatRoom = ({ roomId, myUid }) => {
  const [talkData, setTalkData] = React.useState<any | null>(null);
  const [message, setMessage] = React.useState<string>("");
  React.useEffect(() => {
    db.collection("talks")
      .doc(roomId)
      .collection("talk")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const talkArray: any = [];
        snapshot.docs.map((doc, index) => {
          talkArray[index] = doc.data();
        });
        setTalkData(talkArray);
      });
  }, [roomId]);

  const classes = useStyles();

  const handleChange = event => {
    setMessage(event.target.value);
  };
  const keyPress = e => {
    console.log(e.which);
    if (e.which == 13) postMessage();
  };
  const postMessage = () => {
    if (message !== "") {
      chatDB
        .postMessage(roomId, myUid, message)
        .then(() => {
          console.log("success");
          setMessage("");
        })
        .catch(() => {
          console.log("error");
        });
    }
  };
  const displayChat = (doc, index) => {
    if (doc.uid === myUid) {
      return myTemplate(doc, index);
    } else return yourTemplate(doc, index);
  };
  const myTemplate = (doc, index) => {
    return (
      <Box className={classes.chatBox2} key={index}>
        <Paper elevation={2} className={classes.chatTextArea}>
          {doc.message}
        </Paper>
      </Box>
    );
  };
  const yourTemplate = (doc, index) => {
    return (
      <Box className={classes.chatBox} key={index}>
        {/* 画像入れる */}
        <Avatar>hoge</Avatar>
        <Paper elevation={2} className={classes.chatTextArea}>
          {doc.message}
        </Paper>
      </Box>
    );
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.root}>
        <Typography component="div">{roomId}</Typography>
        <Divider />
        <Box className={classes.chatWrap}>
          {talkData !== null &&
            talkData.map((doc, index) => {
              return displayChat(doc, index);
            })}
        </Box>
        <Paper component="div" className={classes.roots} elevation={8}>
          <input
            accept="image/*"
            className={classes.imageInput}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <InputBase
            autoFocus={true}
            className={classes.input}
            placeholder="メッセージ"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={handleChange}
            value={message}
            onKeyDown={e => keyPress(e)}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={postMessage}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Container>
    </React.Fragment>
  );
};
