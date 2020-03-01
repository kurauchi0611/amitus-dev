import React from "react";
import { Editor } from "../Editor";
import { useRouter } from "next/router";
import Peer from "skyway-js";
import { skywayKey } from "../../../config";
// import clm from "clmtrackr/build/clmtrackr";
import {pModel} from "./pModel"
import Head from 'next/head'
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
            video: true
          })
          .catch(console.error);
        console.log(player);
        player.muted = true;
        player.srcObject = localStream;
        hoge(player);
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
      <Head>
        <script src="/clmtrackr.js"></script>
      </Head>
      <Editor
        onChange={handleEditorOnChange.bind(this)}
        onChangeMode={onChangeMode.bind(this)}
        value={value}
        mode={mode}
      />
      <div id="wrapper">
        <div id="inner">
          <video id="player" autoPlay></video>
          <canvas id="wireframe"></canvas>
          <div id="remote"></div>
          <p id="log"></p>
        </div>
      </div>
    </div>
  );
};

// export default connect(
//   state => ({ ...state }),
//   dispatch => bindActionCreators(actions, dispatch)
// )(App)

const hoge = video => {
  var wrapper = document.getElementById("wrapper");
  var inner = document.getElementById("inner");

  // 顔のワイヤーフレームが表示されるcanvas
  var wireframe = document.getElementById("wireframe");
  var wireframeContext = wireframe.getContext("2d");

  // video
  // var video = document.getElementById("player");

  // ログ表示用
  var log = document.getElementById("log");

  // // clmtrackr
  var ctrack;

  // 描画用RequestAnimationFrame
  var drawRequest;

  //ベンダープリフィックスの有無を吸収
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  // 処理開始
  start();

  /**
   * 処理開始
   */
  function start() {
    drowLog("Webカメラ読込中...");

    // clmtrackrをインスタンス化
    ctrack = new clm.tracker();

    // MediaStream APIでWebカメラへアクセス

    // videoのメタデータの取得が成功
    video.addEventListener("loadedmetadata", function(event) {
      console.log(event);
      
      // videoのサイズを取得
      var videoW = video.clientWidth;
      var videoH = video.clientHeight;
      // windowの横幅を取得
      var windowW = inner.clientWidth;
      // windowの横幅と動画の横幅の比率を算出
      var videoRate = windowW / videoW;

      // サイズを設定
      video.width = wireframe.width = windowW;
      video.height = wireframe.height = videoH * videoRate;

      // 繰り返し処理開始
      loop();

      drowLog("顔検出中...");

      // 顔を検出できたときのEvent
      document.addEventListener(
        "clmtrackrConverged",
        clmtrackrConvergedHandler
      );
      console.log("hoge");

      // 顔を検出できなかったときのEvent
      document.addEventListener("clmtrackrLost", clmtrackrLostHandler);
      // 顔のモデルデータを設定
      ctrack.init(pModel);
      // 顔の検出を開始

      ctrack.start(video);
      console.log("aaaa");
    });

    // videoでWebカメラの映像を表示
    // video.src = URL.createObjectURL(mediaStream);
  }

  /**
   * 繰り返し処理
   */
  function loop() {
    
    // requestAnimationFrame
    // console.log('loop');
    drawRequest = requestAnimationFrame(loop);

    // canvasの描画をクリア
    wireframeContext.clearRect(0, 0, wireframe.width, wireframe.height);

    // 座標が取得できたかどうか
    if (ctrack.getCurrentPosition()) {
      // ワイヤーフレームを描画
      ctrack.draw(wireframe);
    }
  }

  /**
   * 顔検出失敗
   */
  function clmtrackrLostHandler() {
    console.log("hogehoge");
    // Remove Event
    document.removeEventListener("clmtrackrLost", clmtrackrLostHandler);
    document.removeEventListener(
      "clmtrackrConverged",
      clmtrackrConvergedHandler
    );

    drowLog("顔検出失敗");

    // 繰り返し処理停止
    cancelAnimationFrame(drawRequest);
    // 顔検出処理停止
    ctrack.stop();
  }

  /**
   * 顔検出成功
   */
  function clmtrackrConvergedHandler() {
    console.log("hogehogehoge");
    // Remove Event
    document.removeEventListener("clmtrackrLost", clmtrackrLostHandler);
    document.removeEventListener(
      "clmtrackrConverged",
      clmtrackrConvergedHandler
    );

    drowLog("顔検出成功");
  }

  /**
   * ログを表示
   * @param str
   */
  function drowLog(str) {
    log.innerHTML = str;
  }
};

