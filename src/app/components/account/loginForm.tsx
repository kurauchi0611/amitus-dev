import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { accountDB } from "../../firebase/account";
import { MailForm } from "./mailForm";
import { PasswordForm } from "./passwordForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "120px",
      maxWidth: theme.spacing(40),
      margin: "15px auto"
    },
    error: {
      textAlign: "right",
      color: theme.palette.error.main
      // height:"20px"
    },
    searchButton: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      fontSize: "1rem",
      background: theme.palette.buttonMain.main,
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 20px",
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonMain.dark}`,
      display: "inline-block"
    },
    cancel: {
      background: theme.palette.buttonCancel.main,
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonCancel.dark}`
    },
    success: {
      background: theme.palette.buttonCancel.main
    }
  })
);
export const LoginForm = ({ label }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<{
    email: string;
    password: string;
    showPassword: boolean;
    faild: string | boolean;
    emailFaild: string | boolean;
    passwordFaild: string | boolean;
  }>({
    email: "",
    password: "",
    showPassword: false,
    faild: "",
    emailFaild: "",
    passwordFaild: ""
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      email: "",
      password: "",
      showPassword: false,
      faild: "",
      emailFaild: "",
      passwordFaild: ""
    });
  };

  const emailValidation = email => {
    if (!email) return "メールアドレスを入力してください";
    const moji = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!moji.test(email)) return "正しいメールアドレスを入力してください";
    return true;
  };
  const passwordValidation = password => {
    if (!password) return "パスワードを入力してください";
    return true;
  };

  const handleChange = prop => event => {
    if (prop === "email") {
      setState({
        ...state,
        [prop]: event.target.value,
        emailFaild: emailValidation(event.target.value)
      });
    } else if (prop === "password") {
      setState({
        ...state,
        [prop]: event.target.value,
        passwordFaild: passwordValidation(event.target.value)
      });
    }
  };
  const loginUser = () => {
    accountDB.loginUser({ email: state.email, password: state.password });
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={classes.button + " " + classes.searchButton}
      >
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ログイン</DialogTitle>
        <DialogContent>
          <DialogContentText>
            メールアドレスとパスワードを入力してください。
          </DialogContentText>
          <form method="POST">
            <MailForm
              label="メールアドレス"
              handlechange={handleChange("email")}
              email={state.email}
              autoFocus={true}
            />
            <div className={classes.error}>{state.emailFaild}</div>
            <PasswordForm
              label="パスワード"
              handlechange={handleChange("password")}
              password={state.password}
            ></PasswordForm>
            <div className={classes.error}>{state.passwordFaild}</div>
            <div className={classes.error}>{state.faild}</div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={loginUser} className={classes.searchButton}>
            {"ログイン"}
          </Button>
          <Button
            onClick={handleClose}
            className={classes.searchButton + " " + classes.cancel}
          >
            {"キャンセル"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
