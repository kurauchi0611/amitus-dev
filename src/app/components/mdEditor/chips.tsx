import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "left",
      flexWrap: "wrap",
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
    chip: {
      background: theme.palette.buttonMain.main,
      color: "#fff"
    }
  })
);

export const Chips = ({ labels }) => {
  const classes = useStyles();
  const [state, setState] = React.useState();
  React.useEffect(() => {
    setState(labels);
  }, [labels]);
  return (
    <div className={classes.root}>
      {typeof state !== "undefined" &&
        state.map((element,index) => {
          return <Chip key={index} className={classes.chip} label={element} />;
        })}
    </div>
  );
};
