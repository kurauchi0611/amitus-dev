import {
  Button,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import React from "react";
import { accountDB } from "../../firebase/account";
import { PasswordForm } from "./passwordForm";
import { MailForm } from "./mailForm";
import { UserNameForm } from "./userNameForm";
import { db } from "../../firebase/firebase";

export const RegistForm = withStyles(theme => ({
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
  const [values, setValues] = React.useState({
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
    let settingValues = {
      ...values,
      [prop]: event.target.value
    };
    if (prop === "email") {
      settingValues = {
        ...values,
        [prop]: event.target.value,
        emailFaild: emailValidation(event.target.value)
      };
    } else if (prop === "password") {
      settingValues = {
        ...values,
        [prop]: event.target.value,
        passwordFaild: passwordValidation(event.target.value)
      };
    } else if (prop === "checkPassword") {
      settingValues = {
        ...values,
        [prop]: event.target.value,
        checkPasswordFaild: passwordValidation(event.target.value)
      };
    } else if (prop === "userName") {
      settingValues = {
        ...values,
        [prop]: event.target.value,
        checkNameFaild: nameValidation(event.target.value)
      };
    }
    setValues(settingValues);
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
  const createUser = () => {
    if (
      values.emailFaild === true &&
      values.passwordFaild === true &&
      values.checkPasswordFaild === true &&
      values.checkNameFaild === true
    ) {
      if (values.password === values.checkPassword) {
        accountDB
          .createUser({
            email: values.email,
            password: values.password,
            name: values.userName
          })
          .then(res => {
            console.log(res);
            if (res) {
              setValues({
                faild: "登録に成功しました"
              });
              setTimeout(() => {
                handleClose();
              }, 1000);
            } else {
              setValues({
                faild: "登録に失敗しました。"
              });
            }
          });
      } else {
        setValues({
          faild: "パスワードが一致しません。"
        });
      }
    } else {
      setValues({
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
            autoComplete="off"
            // autoFocus={true}
          />
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
          <PasswordForm
            label="パスワードをもう一度入力してください"
            handlechange={handleChange("checkPassword")}
            password={values.checkPassword}
          ></PasswordForm>
          <div className={classes.error}>{values.checkPasswordFaild}</div>
          <div className={classes.error}>{values.faild}</div>
        </DialogContent>
        <DialogActions>
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
});
