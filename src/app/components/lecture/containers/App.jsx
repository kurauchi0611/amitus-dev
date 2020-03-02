import React from "react";
import { Editor } from "../Editor";
import { useRouter } from "next/router";
import Peer from "skyway-js";
import { skywayKey } from "../../../config";

import Head from "next/head";
import { Live2d } from "../../live2d";
import { Live2dGuest } from "../../live2d/live2dGuest";
export const App = ({ props }) => {
  const router = useRouter();
  const roomId = router.query.id;
  const [peer, setPeer] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [value, setValue] = React.useState("");
  const [mode, setMode] = React.useState("javascript");
  const [param, setParam] = React.useState("");
  const voice = document.querySelector("#voice");
  const remote = document.querySelector("#remote");
  // live2dの描画
  React.useEffect(() => {
    // 自分のデータが来たらpeerを作る。
    if (typeof props !== "undefined") {
      setPeer(
        new Peer(props.uid, {
          key: skywayKey,
          debug: 3
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
          });
          // 相手からデータが送られてきたらeditならvalueに、changeModeならmodeにデータ入れる。
          // 常に監視入る
          meshRoom.on("data", ({ src, data }) => {
            // console.log(src);
            if (data.type === "live2dParam") setParam(data.pos);
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
  }, [peer]);
  // ページ移動でカメラ破棄
  // React.useEffect(() => {
  //   return () => {
  //     console.log(typeof room);
  //     if (room !== "") {
  //       room.close();
  //       peer.destroy();
  //       // voice.srcObject.getTracks().forEach(track => track.stop());
  //       // voice.srcObject = null;
  //       // voice.remove();
  //     }
  //   };
  // });
  // peer作る→部屋に参加する

  // ルーターから文字列取る。nullならskywayのid生成して、それをdocIdにしていれる。
  // あるならskyway経由でコネクション
  // その後はよしなに
  const [pos, setPos] = React.useState("");
  React.useEffect(() => {
    sendData({ type: "live2dParam", pos });
  }, [pos]);

  const handlePosOnChange = param => {
    setPos(param);
    // console.log(param);
    // const aaa=JSON.stringify(param)
    // if (room !== "") {
    //   console.log(param);
    //   sendData({ type: "live2dParam", param });
    // }
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
      <Editor
        onChange={handleEditorOnChange.bind(this)}
        onChangeMode={onChangeMode.bind(this)}
        value={value}
        mode={mode}
      />
      <Live2d id={"myself"} peer={peer} handlePosOnChange={handlePosOnChange} />
      <div style={{visibility:"hidden",transform:"scale(0)",position:"absolute"}}>
        <div id="remote"></div>
        <Live2dGuest id={"myself"} pos={param} />
        <video id="voice" autoPlay ></video>
      </div>
    </React.Fragment>
  );
};

// export default connect(
//   state => ({ ...state }),
//   dispatch => bindActionCreators(actions, dispatch)
// )(App)
