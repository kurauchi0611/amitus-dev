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
  IconButton,
  FilledInput
} from "@material-ui/core";
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

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

export const PasswordForm = ({ label, handlechange, password}) => {
  const [values, setValues] = React.useState({
    showPassword: false
  });

  const classes = useStyles();
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <div>
      <FormControl
        className={classes.margin + " " + classes.back}
        variant="filled"
        fullWidth
      >
        <InputLabel htmlFor="filled-adornment-password">{label}</InputLabel>
        <FilledInput
          className={classes.back}
          type={values.showPassword ? "text" : "password"}
          value={password}
          onChange={handlechange}
          startAdornment={
            <InputAdornment position="start">
              <VpnKeyIcon color={"primary"} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};
