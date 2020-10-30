import React from "react";
import Head from "next/head";
import { pModel } from "./pModel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { main, model, deltaTimeSecond } from "./mainpresen";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import Iframe from "react-iframe";
import { db } from "../../firebase/firebase";
import { format } from "date-fns";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  row: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    width: "344px",
    justifyContent: "center",
  },
  nameSpace: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    width: "344px",
    justifyContent: "center",
  },
  paperWrap: {
    height: "400px",
    width: "96%",
    overflow: "scroll",
    marginRight:20,
  },
  paper: {
    padding: "2px",
  },
  marqueee: {
    margin: 0,
    position: "absolute",
    left: "100vw",
    display: "inline-block",
    whiteSpace: "nowrap",
    animationName: "$marquee",
    animationTimingFunction: "linear",
    fontWeight:"bold",
    animationIterationCount: "infinite",
  },
  "@keyframes marquee": {
    "0%": {
      transform: "translate(0)",
    },
    "100%": {
      transform: "translate(calc(-100vw - 100%))",
    },
  },
}));
export default function () {
  const player = document.getElementById("player");
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [isGuest, setIsGuest] = React.useState("error");
  const [comments, setComments] = React.useState(null);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  React.useEffect(() => {
    db.collection("comments")
      .where("createdAt",">=",new Date())
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        const commentArr = [];
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          commentArr.push(doc.data());
        });
        setComments(commentArr);
      });
  }, []);
  React.useEffect(() => {
    if (document.readyState !== "loading") {
      main(0);
    } else {
      document.addEventListener("DOMContentLoaded", main, false);
    }
  }, []);
  React.useEffect(() => {
    console.log(player);

    if (player !== null) {
      console.log(player);
      const cleanup = async () => {
        const localStream = await navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: true,
          })
          .catch(console.error);
        console.log(player);
        player.srcObject = localStream;
        skyWay(player);
      };
      cleanup();
    }
    return () => {
      if (player !== null) {
        player.srcObject.getTracks().forEach((track) => track.stop());
        player.srcObject = null;
        player.remove();
      }
    };
  }, [player]);
  // ページ移動でカメラ破棄

  const handleModelChange = (event) => {
    main(event.target.value);
    handleModelOnChange(event.target.value);
  };
  return (
    <div>
      <Head>
        <script src="/clmtrackr.js"></script>
        <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
      </Head>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          margin: 0,
        }}
      >
        <Grid item xs={8}>
          <Iframe
            src="https://app.pitch.com/app/embed/429f35b0-53cb-4d11-9c3c-00fc6f6a9709"
            allow="fullscreen"
            allowfullscreen=""
            width="1100"
            height="620"
            style="border:0"
          ></Iframe>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
            paddingBottom: 0,
          }}
        >
          <Paper className={classes.paperWrap}>
            {comments !== null &&
              comments.map((comment, key) => {
                return (
                  <Paper className={classes.paper} key={key}>
                    <Typography variant="h6" component="span">
                      {format(
                        new Date(comment.createdAt.seconds * 1000),
                        "HH:mm"
                      )}{" "}
                      :
                    </Typography>
                    <Typography variant="h6" component="span">
                      {comment.content}
                    </Typography>
                  </Paper>
                );
              })}
          </Paper>
          <canvas id="live2d" width="512" height="512"></canvas>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.nameSpace}
        style={{ transform: "scale(0)", width: 0, height: 0 }}
      >
        <Grid item className={classes.row}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              モデル
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              defaultValue={0}
              onChange={handleModelChange}
              labelWidth={labelWidth}
            >
              <MenuItem value={0}>ひより</MenuItem>
              <MenuItem value={1}>ハル</MenuItem>
              <MenuItem value={2}>なとり</MenuItem>
              <MenuItem value={3}>マーク</MenuItem>
              <MenuItem value={4}>イカ1</MenuItem>
              <MenuItem value={5}>イカ2</MenuItem>
              <MenuItem value={6}>ルフレ</MenuItem>
              <MenuItem value={7}>ねずこ</MenuItem>
              <MenuItem value={8}>はくと</MenuItem>
              <MenuItem value={9}>スペース猫</MenuItem>
              <MenuItem value={10}>ゆかり</MenuItem>
              <MenuItem value={11}>あかね</MenuItem>
              <MenuItem value={12}>無口少女</MenuItem>
            </Select>
          </FormControl>
          {/* <p id="log"></p> */}
        </Grid>
      </Grid>
      <div
        id="inner"
        style={{
          transform: "scale(0)",
          position: "absolute",
          width: "1000px",
          right: 0,
          top: 0,
        }}
      >
        <video id="player" autoPlay></video>
        <canvas
          id="wireframe"
          style={{ position: "absolute", left: "0" }}
        ></canvas>
      </div>
      {comments !== null &&
        comments.map((comment, key) => {
          return (
            <div className={classes.marquee}>
              <p
                className={classes.marqueee}
                style={{
                  color: `#${Math.floor(Math.random() * 0xffffff).toString(
                    16
                  )}`,
                  top: `${Math.floor(Math.random() * Math.floor(700))}px`,
                  animationDlay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 4}s`,
                  fontSize: `${2 + Math.random()}rem`,
                }}
                key={key}
              >
                {comment.content}
              </p>
            </div>
          );
        })}
    </div>
  );
}

const skyWay = (video) => {
  var inner = document.getElementById("inner");
  console.log(video);

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
  navigator.getUserMedia = navigator.getUserMedia;

  // 処理開始
  start();

  /**
   * 処理開始
   */
  function start() {
    // drowLog("Webカメラ読込中...");

    // clmtrackrをインスタンス化
    ctrack = new clm.tracker();
    console.log("インスタンス");

    // MediaStream APIでWebカメラへアクセス

    // videoのメタデータの取得が成功
    video.addEventListener("loadedmetadata", function (event) {
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

      // drowLog("顔検出中...");

      // 顔を検出できたときのEvent
      document.addEventListener(
        "clmtrackrConverged",
        clmtrackrConvergedHandler
      );
      console.log("hoge");

      // 顔を検出できなかったときのEvent
      // document.addEventListener("clmtrackrLost", clmtrackrLostHandler);
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
      const pos = ctrack.getCurrentPosition();

      if (pos !== null) {
        model.update(deltaTimeSecond, pos);
      }
    }
  }

  /**
   * 顔検出失敗
   */
  function clmtrackrLostHandler() {
    console.log("hogehoge");
    // Remove Event
    // document.removeEventListener("clmtrackrLost", clmtrackrLostHandler);
    // document.removeEventListener(
    //   "clmtrackrConverged",
    //   clmtrackrConvergedHandler
    // );

    drowLog("顔検出失敗");

    // 繰り返し処理停止
    // cancelAnimationFrame(drawRequest);
    // 顔検出処理停止
    // ctrack.stop();
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

    // drowLog("顔検出成功");
  }

  /**
   * ログを表示
   * @param str
   */
  function drowLog(str) {
    log.innerHTML = str;
  }
};
