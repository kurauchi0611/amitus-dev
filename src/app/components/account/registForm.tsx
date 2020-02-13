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
import { PasswordForm } from "./passwordForm";
import { MailForm } from "./mailForm";
import { UserNameForm } from "./userNameForm";

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
    padding: {
      paddingBottom: theme.spacing(2)
    }
  })
);
export const RegistForm = ({ label }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<{
    userName: string;
    email: string;
    password: string;
    checkPassword: string;
    faild: string | boolean;
    emailFaild: string | boolean;
    passwordFaild: string | boolean;
    checkPasswordFaild: string | boolean;
    checkNameFaild: string | boolean;
  }>({
    userName: "",
    email: "",
    password: "",
    checkPassword: "",
    faild: "",
    emailFaild: "",
    passwordFaild: "",
    checkPasswordFaild: "",
    checkNameFaild: ""
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setState({
      userName: "",
      email: "",
      password: "",
      checkPassword: "",
      faild: "",
      emailFaild: "",
      passwordFaild: "",
      checkPasswordFaild: "",
      checkNameFaild: ""
    });
  };
  const emailValidation = email => {
    if (!email) return "メールアドレスを入力してください";
    const moji = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!moji.test(email)) return "正しいメールアドレスを入力してください";
    return true;
  };
  const passwordValidation = password => {
    if (!password) return "6文字以上でパスワードを入力してください";
    return true;
  };
  const nameValidation = name => {
    if (!name) return "名前を入力してください";
    return true;
  };

  const handleChange = prop => event => {
    let settingState = {
      ...state,
      [prop]: event.target.value
    };
    if (prop === "email") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        emailFaild: emailValidation(event.target.value)
      };
    } else if (prop === "password") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        passwordFaild: passwordValidation(event.target.value)
      };
    } else if (prop === "checkPassword") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        checkPasswordFaild: passwordValidation(event.target.value)
      };
    } else if (prop === "userName") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        checkNameFaild: nameValidation(event.target.value)
      };
    }
    setState(settingState);
  };
  const createUser = () => {
    if (
      state.emailFaild === true &&
      state.passwordFaild === true &&
      state.checkPasswordFaild === true &&
      state.checkNameFaild === true
    ) {
      if (state.password === state.checkPassword) {
        accountDB
          .createUser({
            email: state.email,
            password: state.password,
            name: state.userName
          })
          .then(res => {
            if (res) {
              accountDB.loginUser({
                email: state.email,
                password: state.password
              });
              setState({
                ...state,
                faild: "登録に成功しました"
              });
              setTimeout(() => {
                handleClose();
              }, 1000);
            } else {
              setState({
                ...state,
                faild: "登録に失敗しました。"
              });
            }
          });
      } else {
        setState({
          ...state,
          faild: "パスワードが一致しません。"
        });
      }
    } else {
      setState({
        ...state,
        faild: "正しく入力してください"
      });
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
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
        <DialogTitle id="form-dialog-title">会員登録</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ユーザ名、メールアドレスとパスワードを入力してください。
          </DialogContentText>
          <UserNameForm
            label="ユーザ名"
            handlechange={handleChange("userName")}
            name={state.userName}
            autoFocus={true}
          />
          <MailForm
            label="メールアドレス"
            handlechange={handleChange("email")}
            autoFocus={false}
            email={state.email}
          />
          <div className={classes.error}>{state.emailFaild}</div>
          <PasswordForm
            label="パスワード"
            handlechange={handleChange("password")}
            password={state.password}
          ></PasswordForm>
          <div className={classes.error}>{state.passwordFaild}</div>
          <PasswordForm
            label="パスワードをもう一度入力してください"
            handlechange={handleChange("checkPassword")}
            password={state.checkPassword}
          ></PasswordForm>
          <div className={classes.error}>{state.checkPasswordFaild}</div>
          <div className={classes.error}>{state.faild}</div>
        </DialogContent>
        <DialogActions className={classes.padding}>
          <Button onClick={createUser} className={classes.searchButton}>
            {"登録"}
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
