import { CssBaseline, Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Head from "next/head";
import React from "react";
import { MenuAppBar } from "../components/MenuAppBar";
import theme from "../themes/theme";
import "react-mde/lib/styles/css/react-mde-all.css";
import Alert from "@material-ui/lab/Alert";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import "../components/croppie/croppie.css";
import { auth, db } from "../firebase/firebase";
import { DMWindow } from "../components/chat/chatwrap";
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
const useStyles = makeStyles(() =>
  createStyles({
    error: {
      background: "linear-gradient(45deg, #fe5196 30%, #f77062 90%)"
    },
    success: {
      background: "linear-gradient(45deg, #16A196 30%, #32A2D3 90%)"
    }
  })
);
const MyApp = ({ Component }) => {
  const classes = useStyles();
  const [isUser, setIsUser] = React.useState<any | null>();
  const [success, setSuccess] = React.useState<any | null>();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [dMopen, setDMopen] = React.useState(false);
  const [isUserPage, setIsUserPage] = React.useState(false);
  const [dMMember, setDMMember] = React.useState<string | null>(null);
  React.useEffect(() => {
    return auth.onAuthStateChanged(async (user: any | null) => {
      if (user) {
        await setIsUser(user);
        if (localStorage.getItem("loginState") === null) {
          localStorage.setItem("loginState", "true");
          setSuccess(
            <Alert severity="info" className={classes.success} variant="filled">
              ログインしました。
            </Alert>
          );
          setSuccessOpen(true);
        }
      } else if (!user) {
        // No user is signed in.
        console.log("logout");
        await setIsUser(null);
        if (localStorage.getItem("loginState") !== null) {
          localStorage.removeItem("loginState");
          setSuccess(
            <Alert severity="info" className={classes.error} variant="filled">
              ログアウトしました。
            </Alert>
          );
          setSuccessOpen(true);
        }
      }
    });
  }, []);
  // const [localLang, setLocalLang] = React.useState();
  React.useEffect(() => {
    const cleanup = async () => {
      if (localStorage.getItem("langList") === null) {
        const langList: any = await db
          .collection("language")
          .doc("lang")
          .get();
        console.log(langList.data().language);
        localStorage.setItem(
          "langList",
          JSON.stringify(langList.data().language)
        );
      }
    };
    cleanup();
  }, []);
  const handleDMOpen = () => {
    setDMopen(true);
  };
  const handleDMOpenUserPage = () => {
    setDMopen(true);
    setIsUserPage(true);
  };
  const handleDMClose = () => {
    setDMopen(false);
    setIsUserPage(false);
  };
  const successHandleClose = () => {
    setSuccessOpen(false);
  };
  const handleDMMember = member => {
    setDMMember(member);
  };
  return (
    <div>
      <Head>
        <title>Amitus</title>{" "}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MenuAppBar
          user={isUser}
          dm={{
            handleDMOpen: handleDMOpen,
            handleDMClose: handleDMClose,
            dMopen: dMopen,
            handleDMMember: handleDMMember
          }}
        />
        <Component
          props={isUser}
          dm={{
            handleDMOpen: handleDMOpenUserPage,
            handleDMClose: handleDMClose,
            dMopen: dMopen,
            handleDMMember: handleDMMember
          }}
        />
        {dMopen && (
          <DMWindow
            dm={{
              handleDMOpen: handleDMOpen,
              handleDMClose: handleDMClose,
              dMopen: dMopen,
              user: isUser
            }}
            member={dMMember}
            userPage={isUserPage}
          />
        )}
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={2000}
        open={successOpen}
        onClose={successHandleClose}
      >
        {success}
      </Snackbar>
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
