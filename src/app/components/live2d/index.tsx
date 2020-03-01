import React from "react";
import Head from "next/head";
// import "../../components/live2d/Core/live2dcubismcore";
// import "./bundle"
import { main,model } from "./main";
const Index = () => {
  React.useEffect(() => {
    if (document.readyState !== "loading") {
      main();
      console.log(model);
      
    } else {
      document.addEventListener("DOMContentLoaded", main, false);
    }
  },[]);
  React.useEffect(() => {
    console.log(model);
    
  }, [model])
  return (
    <div style={{ marginTop: "80px" }}>
      <Head>
        <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
      </Head>
      <canvas id="canvas" width="512" height="512"></canvas>
      <span id="motionName" className="cubism-model__motion-name"></span>
    </div>
  );
};
export default Index;
