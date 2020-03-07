import React from "react";
import Head from "next/head";
import { pModel } from "./pModel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { main, model, deltaTimeSecond } from "./main";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  row: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    width: "344px",
    justifyContent: "center"
  },
  nameSpace: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  column: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    width: "344px",
    justifyContent: "center"
  }
}));
export const Live2dHost = ({
  peer,
  handlePosOnChange,
  handleModelOnChange,
  displayName,
  guest,
  isWating
}) => {
  const player = document.getElementById("player");
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [isGuest, setIsGuest] = React.useState("error");
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  React.useEffect(() => {
    if (document.readyState !== "loading") {
      main(0);
    } else {
      document.addEventListener("DOMContentLoaded", main, false);
    }
  }, []);
  React.useEffect(() => {
    if (player !== null) {
      const cleanup = async () => {
        const localStream = await navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: true
          })
          .catch(console.error);
        console.log(player);
        player.srcObject = localStream;
        skyWay(player, handlePosOnChange);
      };
      cleanup();
    }
    return () => {
      console.log(player);
      console.log(peer);
      if (player !== null) {
        if (peer != null) {
          peer.destroy();
        }
        player.srcObject.getTracks().forEach(track => track.stop());
        player.srcObject = null;
        player.remove();
      }
    };
  }, [player]);
  // ページ移動でカメラ破棄
  React.useEffect(() => {
    console.log(isWating);
    if(isWating)setIsGuest('error')
    else setIsGuest('primary')
  }, [isWating]);

  const handleModelChange = event => {
    main(event.target.value);
    handleModelOnChange(event.target.value);
  };
  return (
    <div>
      <Head>
        <script src="/clmtrackr.js"></script>
        <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
      </Head>
      <Grid container className={classes.nameSpace}>
        <Grid item className={classes.row}>
          <Box
            py={1}
            minWidth="40%"
            maxWidth="max-content"
            // height="56px"
            border={2}
            borderRadius={10}
            borderColor="primary.main"
            color="primary.main"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4">{displayName}</Typography>
          </Box>
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
        <Grid item className={classes.column}>
          {isWating&&<Typography variant={"subtitle1"}>waiting...</Typography>}
          <Box
            py={1}
            minWidth="40%"
            maxWidth="max-content"
            // height="56px"
            border={2}
            borderRadius={10}
            borderColor={`${isGuest}.main`}
            color={`${isGuest}.main`}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4">{guest.displayName}</Typography>
          </Box>
        </Grid>
      </Grid>
      <canvas id="live2d" width="1920" height="512"></canvas>
      <div id="inner" style={{ transform: "scale(0)" }}>
        <video
          id="player"
          autoPlay
          style={{
            opacity: 0,
            // transform: "scaleZ(-1)",
            position: "absolute",
            zIndex: "-100",
            top: "0"
          }}
        ></video>
      </div>
      {/* <canvas
          id="wireframe"
          style={{ position: "absolute", left: "0" }}
        ></canvas> */}
    </div>
  );
};

const skyWay = (video, handlePosOnChange) => {
  var inner = document.getElementById("inner");
  console.log(video);

  // 顔のワイヤーフレームが表示されるcanvas
  // var wireframe = document.getElementById("wireframe");
  // var wireframeContext = wireframe.getContext("2d");

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
      video.width = windowW;
      video.height = videoH * videoRate;

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
    // wireframeContext.clearRect(0, 0, wireframe.width, wireframe.height);

    // 座標が取得できたかどうか
    if (ctrack.getCurrentPosition()) {
      // ワイヤーフレームを描画
      // ctrack.draw(wireframe);
      const pos = ctrack.getCurrentPosition();
      if (pos !== null) {
        model.update(deltaTimeSecond, pos);
        handlePosOnChange(pos);
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
