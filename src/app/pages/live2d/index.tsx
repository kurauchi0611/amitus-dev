import dynamic from "next/dynamic";
import React from "react"
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/live2d/index"),
  { ssr: false },
);
function Index() {
  return (
    <div>
      <DynamicComponentWithNoSSR />
    </div>
  );
}
export default Index;