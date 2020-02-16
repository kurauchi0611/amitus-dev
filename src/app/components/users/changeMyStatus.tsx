import React from "react";
import { Dialog, TextField, Divider, IconButton } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { RegularButton } from "../regularButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PasswordForm } from "../account/passwordForm";
import { MailForm } from "../account/mailForm";
import { UserNameForm } from "../account/userNameForm";
import { accountDB } from "../../firebase/account";
import CloseIcon from "@material-ui/icons/Close";
import { Tags } from "../mdEditor/Tags";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    detail: {
      flexFlow: "column",
      alignItems: "flex-end"
    },
    divider: {
      background: theme.palette.buttonMain.main,
      width: "100%",
      height: "2px",
      marginBottom: theme.spacing(1)
    },
    marginTop: {
      marginTop: theme.spacing(1)
    },
    expansion: {
      "&:before": {
        background: theme.palette.buttonMain.main
      }
    },
    closeButton: {
      position: "absolute",
      right: 0
    },
    dialogWidth: {
      width: "600px"
    }
  })
);
const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
  }
);

export const ChangeMyStatus = ({ props }) => {
  console.log(props);

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [state, setState] = React.useState<{
    userName: string;
    email: string;
    password: string;
    newPassword: string;
    checkNewPassword: string;
    nowPassword: string;
    introduction: string;
    language: any;
    faild: string | boolean;
    emailFaild: string | boolean;
    passwordFaild: string | boolean;
    newPasswordFaild: string | boolean;
    checkNewPasswordFaild: string | boolean;
    nowPasswordFaild: string | boolean;
    checkNameFaild: string | boolean;
    introductionFaild: string | boolean;
  }>({
    userName: "",
    email: "",
    password: "",
    newPassword: "",
    checkNewPassword: "",
    nowPassword: "",
    introduction: "",
    language: null,
    faild: "",
    emailFaild: "",
    passwordFaild: "",
    newPasswordFaild: "",
    checkNewPasswordFaild: "",
    nowPasswordFaild: "",
    checkNameFaild: "",
    introductionFaild: ""
  });

  React.useEffect(() => {
    if (typeof props !== "undefined") {
      setState({
        ...state,
        userName: props.name,
        email: props.email,
        introduction: props.introduction,
        language: props.language
      });
      console.log(props);
    }
  }, [props]);

  const emailValidation = email => {
    if (!email) return "メールアドレスを入力してください";
    const moji = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!moji.test(email)) return "正しいメールアドレスを入力してください";
    return true;
  };
  const passwordValidation = password => {
    if (password.length < 5) return "6文字以上でパスワードを入力してください";
    return true;
  };
  const nameValidation = name => {
    if (!name) return "名前を入力してください";
    if (name.length > 50) return "50文字以内で入力してください";
    return true;
  };
  const introductionValidation = text => {
    if (text.length > 300) return "300文字以内で入力してください";
    return true;
  };

  const stateChange = prop => event => {
    let settingState = {
      ...state
      // [prop]: event.target.value
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
    } else if (prop === "newPassword") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        newPasswordFaild: passwordValidation(event.target.value)
      };
    } else if (prop === "checkNewPassword") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        checkNewPasswordFaild: passwordValidation(event.target.value)
      };
    } else if (prop === "nowPassword") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        nowPasswordFaild: passwordValidation(event.target.value)
      };
    } else if (prop === "userName") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        checkNameFaild: nameValidation(event.target.value)
      };
    } else if (prop === "introduction") {
      settingState = {
        ...state,
        [prop]: event.target.value,
        introductionFaild: introductionValidation(event.target.value)
      };
    } else if (prop === "language") {
      console.log(event);
      settingState = {
        ...state,
        [prop]: event
        // introductionFaild: introductionValidation(event.target.value)
      };
    }
    setState(settingState);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    if (false) console.log(event);
    setExpanded(isExpanded ? panel : false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      ...state,
      password: "",
      newPassword: "",
      checkNewPassword: "",
      nowPassword: "",
      faild: "",
      emailFaild: "",
      passwordFaild: "",
      newPasswordFaild: "",
      checkNewPasswordFaild: "",
      nowPasswordFaild: "",
      checkNameFaild: ""
    });
    setExpanded(false);
  };

  const updateName = () => {
    if (state.checkNameFaild === true) {
      accountDB
        .updateName(state.userName)
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("faild");
        });
    }
  };
  const updateEmail = () => {
    if (state.emailFaild === true && state.passwordFaild === true) {
      accountDB
        .updateEmail(state.email, state.password)
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("faild");
        });
    }
  };
  const updatePassword = () => {
    if (
      state.newPasswordFaild === true &&
      state.checkNewPasswordFaild === true &&
      state.nowPasswordFaild === true &&
      state.newPassword === state.checkNewPassword
    ) {
      accountDB
        .updatePassword(state.nowPassword, state.newPassword)
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("faild");
        });
    }
  };
  const updateIntroduction = () => {
    console.log(state.introductionFaild);
    if (state.introductionFaild === true) {
      accountDB
        .updateIntroduction(state.introduction)
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("faild");
        });
    }
  };
  const updateLanguage = () => {
    accountDB
      .updateLanguage(state.language)
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("faild");
      });
  };
  return (
    <div>
      <RegularButton label={"設定の変更"} onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"設定の変更"}</DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <DialogContent className={classes.dialogWidth}>
          <DialogContentText id="alert-dialog-slide-description">
            ユーザの情報やスキルの登録ができます。
          </DialogContentText>
        </DialogContent>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={classes.expansion}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>ユーザ名</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detail}>
            <Divider className={classes.divider} component="div" />
            <UserNameForm
              label={"ユーザ名"}
              name={state.userName}
              handlechange={stateChange("userName")}
            />
            <RegularButton label={"変更する"} onClick={updateName} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className={classes.expansion}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>
              メールアドレス変更
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detail}>
            <Divider className={classes.divider} component="div" />
            <MailForm
              label={"メールアドレス"}
              email={state.email}
              handlechange={stateChange("email")}
            />
            <PasswordForm
              label={"パスワード"}
              password={state.password}
              handlechange={stateChange("password")}
            />
            <RegularButton label={"変更する"} onClick={updateEmail} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className={classes.expansion}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>パスワード</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detail}>
            <Divider className={classes.divider} component="div" />
            <PasswordForm
              label={"現在のパスワード"}
              password={state.nowPassword}
              handlechange={stateChange("nowPassword")}
            />
            <Divider
              className={classes.divider + " " + classes.marginTop}
              component="div"
            />
            <PasswordForm
              label={"新しいパスワード"}
              password={state.newPassword}
              handlechange={stateChange("newPassword")}
            />
            <PasswordForm
              label={"新しいパスワード(確認)"}
              password={state.checkNewPassword}
              handlechange={stateChange("checkNewPassword")}
            />
            <RegularButton label={"変更する"} onClick={updatePassword} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          className={classes.expansion}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>自己紹介</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detail}>
            <Divider className={classes.divider} component="div" />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="自己紹介"
              multiline
              rows="5"
              value={state.introduction}
              variant="outlined"
              onChange={stateChange("introduction")}
            />
            <RegularButton label={"変更する"} onClick={updateIntroduction} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          className={classes.expansion}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>スキル登録</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detail}>
            <Divider className={classes.divider} component="div" />
            {typeof props !== "undefined" && props.language !== null && (
              <Tags
                maxVal={10}
                handleChange={stateChange("language")}
                tags={props.language}
              />
            )}
            <RegularButton label={"変更する"} onClick={updateLanguage} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Dialog>
    </div>
  );
};
