import React from "react";
import {Button, Container} from "@material-ui/core";
const App = () => {
  return (
    <div>
      <Container maxWidth="lg">Hello Next.js 👋</Container>
    </div>
  );
};

const Index = () => (
  <div>
    <p>Hello Next.js</p>
    <App></App>
    <Button variant="contained" color="primary">
        Mypage
      </Button>
  </div>
);

export default Index;
