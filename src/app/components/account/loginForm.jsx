import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles
} from "@material-ui/core";
import React from "react";
import { accountDB } from "../../firebase/account";
import { MailForm } from "./mailForm";
// import { accountDB } from "src/db/accountDB.js";
import { PasswordForm } from "./passwordForm";

export const LoginForm = withStyles(theme => ({
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
  }
}))(({ classes, label, positive, negative, ...props }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      email: "",
      password: "",
      showPassword: false,
      faild: "",
      emailFaild: "",
      passwordFaild: ""
    });
  };
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
    faild: "",
    emailFaild: "",
    passwordFaild: ""
  });
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
      setValues({
        ...values,
        [prop]: event.target.value,
        emailFaild: emailValidation(event.target.value)
      });
    } else if (prop === "password") {
      setValues({
        ...values,
        [prop]: event.target.value,
        passwordFaild: passwordValidation(event.target.value)
      });
    }
  };
  const changeEmail = () => {
    if (values.emailFaild === true && values.passwordFaild === true) {
      accountDB.changeEmail(values.email, values.password).then(result => {
        console.log(result);

        if (result) {
          alert("メールアドレスの変更が完了しました。");
          handleClose();
        } else {
          setValues({
            ...values,
            faild: "メールアドレスの変更に失敗しました。"
          });
        }
      });
    }
  };
  const loginUser = () => {
    accountDB.loginUser({ email: values.email, password: values.password });
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
          <MailForm
            label="メールアドレス"
            handlechange={handleChange("email")}
            autoComplete="off"
          />
          <div className={classes.error}>{values.emailFaild}</div>
          <PasswordForm
            label="パスワード"
            handlechange={handleChange("password")}
            password={values.password}
          ></PasswordForm>
          <div className={classes.error}>{values.passwordFaild}</div>
          <div className={classes.error}>{values.faild}</div>
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
});
