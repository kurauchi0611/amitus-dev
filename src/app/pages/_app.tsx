import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import Head from "next/head";
import React from "react";
import { MenuAppBar } from "../components/MenuAppBar";
import theme from "../themes/theme";
import "react-mde/lib/styles/css/react-mde-all.css";

import { auth, db } from "../firebase/firebase";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

const MyApp = ({ Component }) => {
  const [isUser, setIsUser] = React.useState();
  React.useEffect(() => {
    return auth.onAuthStateChanged(async user => {
      if (user) {
        await setIsUser(user);
      } else if (!user) {
        // No user is signed in.
        console.log("logout");
        await setIsUser(null);
      }
    });
  }, []);

  // const [localLang,setLocalLang] = React.useState();
  React.useEffect(() => {
    const cleanup=async()=>{
      if (localStorage.getItem("langList") === null) {
        const langList:any=await db
        .collection("language")
        .doc("lang")
        .get();
        console.log(langList.data().language);
        localStorage.setItem("langList",JSON.stringify(langList.data().language))
      }
    }
    cleanup();
  }, []);

  return (
    <div>
      <Head>
        <title>Amitus</title>{" "}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MenuAppBar user={isUser} />
        <Component props={isUser} />
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

export default MyApp;
