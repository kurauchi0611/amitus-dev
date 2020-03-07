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
import Router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      // width: "120px",
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
export const EndLectureButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const endLecture = () => {
    Router.push("/");
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={classes.button + " " + classes.searchButton}
      >
        レクチャー終了
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">レクチャー終了</DialogTitle>
        <DialogContent>
          <DialogContentText>レクチャーを終了しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={endLecture} className={classes.searchButton}>
            {"終了する"}
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
