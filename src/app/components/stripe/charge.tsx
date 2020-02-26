import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import TimerIcon from "@material-ui/icons/Timer";
import { db } from "../../firebase/firebase";
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
    },
    forms: {
      display: "flex",
      flexFlow: "row",
      alignItems: "baseline"
      // justifyContent:"flex-end"
    }
  })
);
export const Charge = ({ label,amount,userData }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ticketNum,setTicketNum]=React.useState(1);
  const [sumAmount,setSumAmount]=React.useState(0);
  const [sumTime,setSumTime]=React.useState(30);
  React.useEffect(()=>{
    if(sumAmount===0){
      setSumAmount(amount)
    }
  },[amount])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeNum=event=>{if(event.target.value<1)setTicketNum(1)
    else{
      setTicketNum(event.target.value)
      setSumAmount(amount*event.target.value);
      setSumTime(30*event.target.value);
    }
  }
  const submitCharge=()=>{
    db.collection("users")
    .doc(userData.uid)
    .collection("charges")
    .add({ amount: sumAmount })
    .then(() => {
      console.log("success");
    });
  }
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
        <DialogTitle id="form-dialog-title">チケット購入</DialogTitle>
        <DialogContent>
          <DialogContentText>
            購入するチケット数を入力してください。（30分単位）
          </DialogContentText>
          <FormControl className={classes.forms} fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-email">{label}</InputLabel>
            <FilledInput
              // className={classes.back}
              // onInput={handlechange}
              value={ticketNum}
              type="number"
              autoComplete="off"
              autoFocus
              onChange={changeNum}
              startAdornment={
                <InputAdornment position="start">
                  <TimerIcon color={"primary"} />
                </InputAdornment>
              }
            />
            <Typography variant="body1">{"枚/30分"}</Typography>
          </FormControl>
          <Typography variant="body1">合計金額：{sumAmount}円</Typography>
          <Typography variant="body1">合計時間：{sumTime}分</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitCharge} className={classes.searchButton}>{"購入"}</Button>
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
