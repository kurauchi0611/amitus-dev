// import uuid from "uuid-v4";
import { useRouter } from "next/router";
import { useEffect } from "react";
import random from "unique-string";
function Lecture() {
  const router = useRouter();
  useEffect(() => {
    router.push("/lecture/[id]", `/lecture/${random()}`);
  }, []);
  return <div />;
}

export default Lecture;
