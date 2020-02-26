import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  FilledInput
} from "@material-ui/core";
import React from "react";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#f2f2f2"
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    searchButton: {
      margin: theme.spacing(2),
      fontSize: "1rem",
      background: "linear-gradient(45deg, #16A196 30%, #32A2D3 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(105, 255, 135, .3)"
    },
    title: {
      cursor: "pointer",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    sectionDesktop: {
      width: "150px",
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      color: "#16A196"
    },
    selectEmpty: {
      // marginTop: theme.spacing(2),
      background: "#f2f2f2",
      borderRadius: "2px",
      "&::before": {
        borderBottom: "2px solid",
        borderBottomColor: theme.palette.secondary.main
      },
      "&::after": {
        borderBottom: "2px solid",
        borderBottomColor: "#ff8600"
      },
      "&:hover": {
        "&:not(.Mui-disabled):before": {
          borderBottomColor: "#32A2D3"
        }
      },
      "& select": {
        paddingLeft: "8px"
      }
    },
    anker: {
      width: "100%",
      display: "flex",
      padding: "8px 16px"
    },
    paddingNone: {
      padding: "0px"
    },
    forms: {
      background: "#f2f2f2",
      borderColor: theme.palette.secondary.main
    },
    inp: {
      margin: "0"
    },
    margin: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    withoutLabel: {
      marginTop: theme.spacing(3)
    },
    back: {
      background: "rgba(242,242,242,1)"
      // "&:hover": {
      //   background: "rgba(242,242,242,1)"
      // }
    }
  })
);

export const MailForm = ({
  label,
  handlechange,
  email,
  autoFocus
}) => {


  const classes = useStyles();
  return (
      <FormControl className={classes.margin} fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-email">{label}</InputLabel>
        <FilledInput
          className={classes.back}
          fullWidth
          onInput={handlechange}
          value={email}
          autoComplete="off"
          autoFocus={autoFocus}
          startAdornment={
            <InputAdornment position="start">
              <MailIcon color={"primary"} />
            </InputAdornment>
          }
        />
      </FormControl>
  );
};

MailForm.defaultProps={
  label:null,
  handlechange:null,
  email:null,
  autoFocus:false
}