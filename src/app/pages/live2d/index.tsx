import dynamic from "next/dynamic";
import Head from "next/head";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/live2d/live2d"),
  { ssr: false }
);
function Lecture() {
  return (
    <div>
       <Head>
        <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
      </Head>
      <DynamicComponentWithNoSSR />
    </div>
  );
}
export default Lecture;
