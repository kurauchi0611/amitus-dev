import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/lecture/index"),
  { ssr: false }
);
function Lecture({ isuser }) {
  return (
    <div>
      <DynamicComponentWithNoSSR props={isuser} />
    </div>
  );
}
export default Lecture;
