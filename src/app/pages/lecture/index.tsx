// import uuid from "uuid-v4";
import random from "unique-string";
import { useRouter } from "next/router";
import { useEffect } from "react";
function Lecture() {
  const router = useRouter();
  useEffect(() => {
    router.push("/lecture/[id]", `/lecture/${random()}`);
  }, []);
  return <div />;
}

export default Lecture;
