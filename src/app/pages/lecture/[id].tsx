import dynamic from "next/dynamic";
import Router from "next/router";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/lecture/index"),
  { ssr: false }
);
function Lecture({ props }) {
  return (
    <div>
      <DynamicComponentWithNoSSR props={props} query={Router.query} />
    </div>
  );
}
export default Lecture;
