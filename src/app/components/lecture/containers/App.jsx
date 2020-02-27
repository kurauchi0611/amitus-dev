import React from "react";
import { Editor } from "../Editor";
import { useRouter } from "next/router";
import Peer from "skyway-js";
import { skywayKey } from "../../../config";
export const App = ({ props }) => {
  const router = useRouter();
  const roomId = router.query.id;
  const [peer, setPeer] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [value, setValue] = React.useState("");
  const [mode, setMode] = React.useState("javascript");
  const player = document.querySelector("#player");
  const remote = document.querySelector("#remote");
  React.useEffect(() => {
    // 自分のデータが来たらpeerを作る。
    if (typeof props !== "undefined") {
      setPeer(
        new Peer(props.uid, {
          key: skywayKey,
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
            video: true
          })
          .catch(console.error);
        console.log(player);
        player.muted = true;
        player.srcObject = localStream;
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
            console.log(src);
            console.log(data);
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
        console.log(meshRoom);
      });
    }
  }, [peer]);

  // peer作る→部屋に参加する

  // ルーターから文字列取る。nullならskywayのid生成して、それをdocIdにしていれる。
  // あるならskyway経由でコネクション
  // その後はよしなに

  const handleEditorOnChange = text => {
    setValue(text);
    sendData({ type: "edit", text });
  };
  const sendData = sendValue => {
    room.send(sendValue);
  };
  const onChangeMode = e => {
    const changeMode = e.target.value;
    setMode(changeMode);
    sendData({ type: "changeMode", changeMode });
  };
  return (
    <div>
      <Editor
        onChange={handleEditorOnChange.bind(this)}
        onChangeMode={onChangeMode.bind(this)}
        value={value}
        mode={mode}
      />
      <video id="player" autoPlay></video>
      <div id="remote"></div>
    </div>
  );
};

// export default connect(
//   state => ({ ...state }),
//   dispatch => bindActionCreators(actions, dispatch)
// )(App)
