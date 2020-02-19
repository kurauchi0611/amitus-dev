import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Dialog,
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  InputBase,
  Divider,
  Avatar,
  Link,
  DialogContent,
  Button
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { db } from "../../firebase/firebase";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";
import { chatDB } from "../../firebase/chat";
import { RegularButton } from "../regularButton";
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
    },
    img: {
      maxWidth: "100%",
      height: "auto"
    },
    buttonCancel: {
      background: theme.palette.buttonCancel.main,
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonCancel.dark}`,
      marginLeft: theme.spacing(4)
    },
    flexRow: {
      display: "flex",
      flexFlow: "row",
      justifyContent: "space-around",
      maxHeight: "100%",
      width: "100%"
    },
    buttonMain: {
      minWidth: theme.spacing(10),
      maxWidth: theme.spacing(40),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: "1rem",
      background: theme.palette.buttonCancel.main,
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonCancel.dark}`,
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 20px",
      display: "flex"
    },
    postImage: {
      width: "90%",
      height: "auto"
    },
    imgWrap: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      overflow: "hidden",
      alignItems: "center"
    }
  })
);

export const ChatRoom = ({ roomId, myUid, userData }) => {
  const [talkData, setTalkData] = React.useState<any | null>(null);
  const [message, setMessage] = React.useState<string>("");
  React.useEffect(() => {
    function scrollBottom(){
      var elm:any|null = document.getElementById('height');
      var winHeight = elm.scrollHeight - elm.clientHeight;
      elm.scroll(0, winHeight);
      console.log(elm);
      console.log(winHeight);
      
      
    }
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
        scrollBottom();
      });
  }, [roomId]);

  const classes = useStyles();

  const handleChange = event => {
    setMessage(event.target.value);
  };
  const keyPress = e => {
    if (e.which == 13) postMessage();
  };
  const postMessage = () => {
    if (message !== "") {
      chatDB
        .postMessage(roomId, myUid, message)
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("error");
        });
      setMessage("");
    }
  };
  const displayChat = (doc, index) => {
    if (doc.uid === myUid) {
      return myTemplate(doc, index);
    } else return yourTemplate(doc, index);
  };
  const myTemplate = (doc, index) => {
    let message = doc.message;
    if (doc.type === "link") {
      message = (
        <Link href={doc.message} target="_blank" rel="noopener">
          {doc.message}
        </Link>
      );
    }
    if (doc.type === "image") {
      message = (
        <Link href={doc.message} target="_blank" rel="noopener">
          <img src={doc.message} className={classes.img} />
        </Link>
      );
    }
    return (
      <Box className={classes.chatBox2} key={index}>
        <Paper elevation={2} className={classes.chatTextArea}>
          {message}
        </Paper>
      </Box>
    );
  };
  const yourTemplate = (doc, index) => {
    let message = doc.message;
    if (doc.type === "link") {
      message = (
        <Link href={doc.message} target="_blank" rel="noopener">
          {doc.message}
        </Link>
      );
    }
    if (doc.type === "image") {
      message = (
        <Link href={doc.message} target="_blank" rel="noopener">
          <img src={doc.message} />
        </Link>
      );
    }
    return (
      <Box className={classes.chatBox} key={index}>
        {/* 画像入れる */}
        {userData !== null && userData.photoURL === null && (
          <Avatar>{userData.displayName}</Avatar>
        )}
        {userData !== null && userData.photoURL !== null && (
          <Avatar src={userData.photoURL} />
        )}
        <Paper elevation={2} className={classes.chatTextArea}>
          {message}
        </Paper>
      </Box>
    );
  };

  const [openImage, setOpenImage] = React.useState(false);
  const [fileData, setFileData] = React.useState<any | null>(null);
  const [file, setFile] = React.useState<any | null>(null);
  // const [complate, setComplate] = React.useState(false);
  const handleCloseImage = () => {
    setOpenImage(false);
  };

  // console.log(croppie);
  const handleChangeFile = e => {
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;
    const target = e.target;
    const file = target.files.item(0);
    console.log(file);
    
    const upimg = createObjectURL(file);
    setFileData(upimg);
    setFile(file)
    setOpenImage(true);
    target.value = null;
  };

  const updateImage = () => {
    // const image = fileData.result({ type: "blob" });
    console.log(fileData);
    console.log(file);
    chatDB
      .postImage(roomId,myUid,file)
      .then(() => {
        setOpenImage(false);
      })
      .catch(err => {
        console.log(err);
      });
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
            onChange={event => handleChangeFile(event)}
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

        <Dialog
          container={() => document.querySelector(".move")}
          open={openImage}
          keepMounted
          onClose={handleCloseImage}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          // children={Container}
        >
          <DialogContent className={classes.imgWrap}>
            <img src={fileData} className={classes.postImage} />
            <div className={classes.flexRow}>
              <RegularButton label={"送信する"} onClick={updateImage} />
              <Button className={classes.buttonMain} onClick={handleCloseImage}>
                キャンセル
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </React.Fragment>
  );
};
