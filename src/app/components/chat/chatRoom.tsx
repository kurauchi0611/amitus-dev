import React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  Link,
  Paper,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { db } from "../../firebase/firebase";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";
import { chatDB } from "../../firebase/chat";
import { RegularButton } from "../regularButton";
import { MediaCard } from "./ogpTemplate";
import { format } from "date-fns";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      height: "100%",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "5px"
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "10px",
        background: "rgba(90,90,90,.5)"
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        opacity: "0.6",
        background: theme.palette.buttonMain.main
      }
      // minHeight: 600
    },
    roots: {
      background: "#fff",
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      position: "absolute",
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
      alignItems: "flex-end"
    },
    chatTextArea: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: 0,
      padding: theme.spacing(0.75),
      borderRadius: "15px",
      maxWidth: "250px",
      wordBreak: "break-all",
      textAlign: "left"
    },
    myChatBox: {
      flexFlow: "row-reverse"
    },
    img: {
      maxWidth: "100%",
      height: "auto"
    },
    buttonCancel: {
      background: theme.palette.info.main,
      boxShadow: `0 3px 5px 2px ${theme.palette.info.dark}`,
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
    },
    flexAnchor: {
      display: "flex"
    },
    paddingImg: {
      padding: 0,
      overflow: "hidden"
    },
    date: {
      marginTop: theme.spacing(1),
      padding: "1px 0",
      height: "auto",
      color: "#fff",
      background: theme.palette.buttonMain.main
    },
    chatBoxWrap: {
      textAlign: "center"
    }
  })
);

export const ChatRoom = ({ roomId, myUid, userData, memberNum }) => {
  const [talkData, setTalkData] = React.useState<any | null>(null);
  const [message, setMessage] = React.useState<string>("");
  const [postedDate, setPostedDate] = React.useState<any | null>(null);

  const scrollBottom = () => {
    const elm: any | null = document.getElementById("scroll");
    const winHeight = elm.scrollHeight - elm.clientHeight;
    elm.scroll(0, winHeight);
    const elm2: any | null = document.getElementById("height");
    if (elm2 !== null) {
      const winHeight2 = elm2.scrollHeight - elm2.clientHeight;
      elm2.scroll(0, winHeight2);
    }
  };
  React.useEffect(() => {
    if (roomId !== "") {
      chatDB.isOnline(roomId, memberNum);
      db.collection("talks")
        .doc(roomId)
        .collection("talk")
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          // var source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
          // console.log(source);
          const talkArray: any = [];
          const dateArray: any = [];
          Promise.all(
            snapshot.docs.map((doc, index) => {
              talkArray[index] = doc.data();
              if (snapshot.metadata.hasPendingWrites === false) {
                dateArray[index] = format(
                  new Date(doc.data().createdAt.seconds * 1000),
                  "MM/dd"
                );
              }
            })
          ).then(() => {
            setTalkData(talkArray);
            setPostedDate(dateArray);
            scrollBottom();
          });
        });
    }
  }, [roomId]);

  React.useEffect(() => {
    const cleanup = () => {
      chatDB.isOffline(roomId, memberNum);
    };
    return cleanup;
  }, []);
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
          // console.log("success");
        })
        .catch(err => {
          // console.log("error");
          console.log(err);
        });
      setMessage("");
    }
  };
  const displayChat = (doc, index) => {
    if (doc.uid === myUid) {
      return template("me", doc, index);
    } else return template("you", doc, index);
  };
  const isLink = message => {
    return (
      <Link href={message} target="_blank" rel="noopener">
        {message}
      </Link>
    );
  };
  const isImage = message => {
    return (
      <Link
        href={message[0]}
        target="_blank"
        rel="noopener"
        className={classes.flexAnchor}
      >
        <img src={message[1]} className={classes.img} />
      </Link>
    );
  };
  const template = (who, doc, index) => {
    let message = doc.message;
    if (doc.type === "link") {
      message = isLink(message);
    }
    if (doc.type === "image") {
      message = isImage(message);
    }
    return (
      <Box key={index} className={classes.chatBoxWrap}>
        {postedDate != null && postedDate[index] !== postedDate[index + 1] && (
          <Chip label={postedDate[index]} className={classes.date} />
        )}
        <Box
          className={classes.chatBox + ` ${who !== "you" && classes.myChatBox}`}
        >
          {/* 画像入れる */}
          {who === "you" && userData !== null && userData.photoURL === null && (
            <Avatar>{userData.displayName}</Avatar>
          )}
          {who === "you" && userData !== null && userData.photoURL !== null && (
            <Avatar src={userData.photoURL} />
          )}
          {doc.type !== "ogp" && (
            <Paper
              elevation={2}
              className={
                classes.chatTextArea +
                ` ${doc.type === "image" && classes.paddingImg}`
              }
            >
              {message}
            </Paper>
          )}
          {doc.type === "ogp" && <MediaCard message={message} />}
          {doc.createdAt !== null && (
            <Typography variant="caption">{`${format(
              new Date(doc.createdAt.seconds * 1000),
              "HH:mm"
            )}`}</Typography>
          )}
        </Box>
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
    // console.log(file);

    const upimg = createObjectURL(file);
    setFileData(upimg);
    setFile(file);
    setOpenImage(true);
    target.value = null;
  };

  const updateImage = () => {
    // const image = fileData.result({ type: "blob" });
    // console.log(fileData);
    // console.log(file);
    chatDB
      .postImage(roomId, myUid, file)
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
      <Container maxWidth="xl" className={classes.root} id="scroll">
        <Box className={classes.chatWrap}>
          {talkData !== null &&
            talkData.map((doc, index) => {
              return displayChat(doc, index);
            })}
        </Box>
        {/* 入力欄 */}
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
              <Button
                className={classes.buttonMain}
                onClick={handleCloseImage}
                variant="contained"
              >
                キャンセル
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </React.Fragment>
  );
};

// 画像投稿→documentクリエイト→img判定→リサイズ→リサイズ画像登録
