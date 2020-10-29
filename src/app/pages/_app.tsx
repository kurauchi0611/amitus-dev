/* eslint-disable */
import { CssBaseline} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Head from "next/head";
import React from "react";
import theme from "../themes/theme";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../components/croppie/croppie.css";
import {ticketDB} from "../firebase/timeTickets"
import {questionDB} from "../firebase/questions"
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

/* eslint-disable */
const MyApp = ({ Component }) => {

  return (
    <div>
      <Head>
        <title>BEENOSインターンプレゼン</title>{" "}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component
        />
      </ThemeProvider>
    </div>
  );
};

// // do something
// const userData = await auth.onAuthStateChanged(user => {
//   if (user) {
//     console.log(req);
//     return user;
//   } else {
//     return null;
//   }
// });
// return userData;

MyApp.getInitialProps =async ({router}) => {

  if (router.pathname === "/timeTickets/[id]") {
    const getData = await ticketDB.showTickets(router.query.id);
    return{headData:JSON.stringify(getData)}
  }
  else if (router.pathname === "/questions/[id]") {
    const getData = await questionDB.showQuestion(router.query.id);
    return{headData:JSON.stringify(getData.question.data())}
  }
  // const res = await fetch("https://api.github.com/repos/zeit/next.js");
  // const json = await res.json();
  return {};
}
export default MyApp;
