import { CircularProgress, Modal } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      margin: "auto",
      outline: "none"
    },
    modalBg: {
      "& div": {
        background: "rgba(0,0,0,0) !important"
      }
    }
  })
);
export const ProgressModal = ({ progress }) => {
  const classes = useStyles();
  return (
    <Modal open={progress} className={classes.modalBg}>
      <CircularProgress className={classes.progress} />
    </Modal>
  );
};
