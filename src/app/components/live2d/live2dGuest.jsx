import React from "react";
import Head from "next/head";
import { main, model, deltaTimeSecond } from "./main2";
export const Live2dGuest = ({ pos,guestModel }) => {
  React.useEffect(() => {
    if (document.readyState !== "loading") {
      main(guestModel);
    } else {
      document.addEventListener("DOMContentLoaded", main, false);
    }
  }, []);
  // // ページ移動でカメラ破棄
  React.useEffect(() => {
    if (pos !== null && typeof model !== "undefined") {
      model.update(deltaTimeSecond, pos);
    }
  }, [pos]);
  React.useEffect(() => {
    if (pos !== null && typeof model !== "undefined") {
      main(guestModel);
    }
  }, [guestModel]);
  return (
    <div>
      {/* <Head>
        <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
      </Head>
      <canvas id={id} width="512" height="512"></canvas>
      <div id="inner" style={{ transform: "scale(0)" }}>
        <video id="player" autoPlay style={{transform:"scale(0)"}}></video>
        <canvas
          id="wireframe"
          style={{ position: "absolute", left: "0" }}
        ></canvas>
        <p id="log"></p>
      </div> */}
    </div>
  );
};
