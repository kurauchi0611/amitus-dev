import React from "react";
import { Button, Container } from "@material-ui/core";
import Link from "next/link";
const App = () => {
  return (
    <div>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Container maxWidth="lg">Hello Next.js 👋</Container>
    </div>
  );
};


const Index = () => (
  <div>
    <p>Hello Next.js</p>
    ...pageProps
    <Link href="/mypage">
      <a>マイページ</a>
    </Link>
    <App></App>
  </div>
);

export default Index;
