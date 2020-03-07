import React from "react";
import { Editor } from "../Editor";
import { useRouter } from "next/router";
import Peer from "skyway-js";
import { skywayKey } from "../../../config";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Head from "next/head";
import { Live2dHost } from "../../live2d/live2dHost";
import { Live2dGuest } from "../../live2d/live2dGuest";
import { AppBar, Box, Grid, Toolbar, Typography } from "@material-ui/core";
import { ChatRoom } from "../../chat/chatRoom";
import { EndLectureButton } from "../endLectureButton";
const useStyles = makeStyles(theme =>
  createStyles({
    margin: {
      // marginRight: theme.spacing(5),
      // marginLeft: theme.spacing(5),
      background: "#fff",
      // padding: "0",
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(10),
      display: "flex",
      flexFlow: "column"
      // justifyContent:"center"
    },
    live2dCanvas: {
      zIndex: "1",
      position: "fixed",
      bottom: -4,
      left: 0
    },
    gridContainer: {
      height: "100%",
      background: "#fff",
      marginRight: theme.spacing(18),
      marginLeft: theme.spacing(18),
      paddingRight: theme.spacing(20),
      paddingLeft: theme.spacing(20),
      paddingBottom: theme.spacing(4)
    },
    gridItem: {
      position: "relative",
      zIndex: "2",
      height: "100%",
      display: "flex",
      flexFlow: "column",
      justifyContent: "stretch",
      paddingTop: "0 !important",
      paddingBottom: "0 !important"
    },
    chatBar: {
      position: "absolute",
      background: theme.palette.buttonMain.main,
      // margin: theme.spacing(1),
      top: theme.spacing(6),
      left: theme.spacing(1),
      width: `calc(100% - ${theme.spacing(2)}px)`
    },
    chatBox: {
      height: "100%",
      overflow: "hidden"
    }
  })
);

export const App = ({ props, query }) => {
  console.log(query);

  const classes = useStyles();
  const router = useRouter();
  const roomId = router.query.id;
  const [peer, setPeer] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [value, setValue] = React.useState("");
  const [mode, setMode] = React.useState("javascript");
  const [param, setParam] = React.useState("");
  const [myModel, setMyModel] = React.useState(0);
  const [guestModel, setGuestModel] = React.useState(0);
  // const [guestId, setGuestId] = React.useState("VzrhgY9HaAD5YWNpJUc5");
  // const [guestData, setGuestData] = React.useState("");
  const [myData, setMyData] = React.useState();
  const voice = document.querySelector("#voice");
  const remote = document.querySelector("#remote");
  // live2dの描画

  React.useEffect(() => {
    // 自分のデータが来たらpeerを作る。
    if (typeof props !== "undefined") {
      setMyData(props);
      setPeer(
        new Peer(props.uid, {
          key: skywayKey
          // debug: 3
        })
      );
    }
  }, [props]);
  React.useEffect(() => {
    // ↑でpeerが作られたら、rul の /lecture 以降の文字列でroomの作成。
    // console.log(peer);
    if (peer !== "") {
      // peer.onしなきゃ始まらない
      peer.on("open", async () => {
        const localStream = await navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: false
          })
          .catch(console.error);
        console.log(voice);
        voice.muted = true;
        voice.srcObject = localStream;
        // skyWay(voice);
        // ここでroom作成
        const meshRoom = peer.joinRoom(roomId, {
          mode: "mesh",
          stream: localStream
        });
        // stateに入れておく
        setRoom(meshRoom);
        // onしなきゃ始まらない
        meshRoom.on("open", () => {
          console.log("roomIn");
          meshRoom.on("peerJoin", peerId => {
            console.log("join:", peerId);

            const myData = {
              displayName: props.displayName,
              photoUrl: props.photoURL
            };
            // setGuestId(peerId);
            // meshRoom.send({ type: "guestData", myData });
            // meshRoom.send({ type: "live2dModel", myModel });
            // meshRoom.send({ type: "changeMode", mode });
          });
          // 相手からデータが送られてきたらeditならvalueに、changeModeならmodeにデータ入れる。
          // 常に監視入る
          meshRoom.on("data", ({ src, data }) => {
            // if (data.type === "guestData") setGuestData(data.myData);
            if (data.type === "live2dParam") setParam(data.pos);
            if (data.type === "live2dModel") setGuestModel(data.myModel);
            if (data.type === "edit") setValue(data.text);
            if (data.type === "changeMode") setMode(data.changeMode);
          });
          // 相手から映像、音声が送られてきたらここが走る。
          meshRoom.on("stream", async stream => {
            console.log("recieve Stream");
            const newVideo = document.createElement("video");
            newVideo.srcObject = stream;
            newVideo.playsInline = true;
            // mark peerId to find it later at peerLeave event
            newVideo.setAttribute("data-peer-id", stream.peerId);
            remote.append(newVideo);
            await newVideo.play().catch(console.error);
          });
          // 人がいなくなったらこれ走る
          meshRoom.on("peerLeave", peerId => {
            const remoteVideo = remote.querySelector(
              `[data-peer-id=${peerId}]`
            );
            if (remoteVideo !== null) {
              remoteVideo.srcObject.getTracks().forEach(track => track.stop());
              remoteVideo.srcObject = null;
              remoteVideo.remove();
            }
          });
        });
      });
    }
    return () => {
      console.log(voice);
      console.log(room);

      console.log(typeof room);
      if (voice !== null) {
        // room.close();
        // peer.destroy();
        voice.srcObject.getTracks().forEach(track => track.stop());
        voice.srcObject = null;
        voice.remove();
      }
    };
  }, [peer]);
  // ページ移動でカメラ破棄
  // React.useEffect(() => {
  //   return () => {
  //     console.log(voice);
  //     console.log(room);

  //     voice.srcObject.getTracks().forEach(track => track.stop());
  //     voice.srcObject = null;
  //     voice.remove();
  //     console.log(typeof room);
  //     if (room !== "") {
  //       room.close();
  //       peer.destroy();
  //     }
  //   };
  // }, []);
  // peer作る→部屋に参加する

  // ルーターから文字列取る。nullならskywayのid生成して、それをdocIdにしていれる。
  // あるならskyway経由でコネクション
  // その後はよしなに
  const [pos, setPos] = React.useState("");
  React.useEffect(() => {
    sendData({ type: "live2dParam", pos });
  }, [pos]);
  React.useEffect(() => {
    sendData({ type: "live2dModel", myModel });
  }, [myModel]);

  const handlePosOnChange = param => {
    setPos(param);
  };
  const handleModelOnChange = param => {
    setMyModel(param);
  };
  const handleEditorOnChange = text => {
    setValue(text);
    sendData({ type: "edit", text });
  };
  const sendData = sendValue => {
    if (room !== "") {
      room.send(sendValue);
    }
  };
  const onChangeMode = e => {
    const changeMode = e.target.value;
    setMode(changeMode);
    sendData({ type: "changeMode", changeMode });
  };
  return (
    <React.Fragment>
      <Head>
        <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
      </Head>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={9} className={classes.gridItem}>
          <Editor
            onChange={handleEditorOnChange.bind(this)}
            onChangeMode={onChangeMode.bind(this)}
            value={value}
            mode={mode}
          />
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          {typeof myData !== "undefined" && (
            <Box mt={6} className={classes.chatBox}>
              <AppBar className={classes.chatBar}>
                <Toolbar>
                  <Typography variant="h6"></Typography>
                </Toolbar>
              </AppBar>
              <ChatRoom
                roomId={query.id}
                myUid={myData.uid}
                userData={JSON.parse(query.getUser)}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      <Box className={classes.live2dCanvas}>
        <Live2dHost
          peer={peer}
          handlePosOnChange={handlePosOnChange}
          handleModelOnChange={handleModelOnChange}
          displayName={props.displayName}
          guest={JSON.parse(query.getUser)}
        />
      </Box>
      <div
        style={{
          visibility: "hidden",
          transform: "scale(0)",
          position: "absolute"
        }}
      >
        <div id="remote"></div>
        <Live2dGuest pos={param} guestModel={guestModel} />
        <video id="voice" autoPlay></video>
      </div>
      <Box position="fixed" right="0">
        <EndLectureButton />
      </Box>
    </React.Fragment>
  );
};

// export default connect(
//   state => ({ ...state }),
//   dispatch => bindActionCreators(actions, dispatch)
// )(App)
