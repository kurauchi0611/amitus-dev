import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "left",
      flexWrap: "wrap",
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
  console.log(state);
  React.useEffect(() => {
    console.log(labels);
    setState(labels);
  }, [labels]);
  return (
    <div className={classes.root}>
      {typeof state !== "undefined" &&
        state.map(element => {
          return <Chip className={classes.chip} label={element} />;
        })}
    </div>
  );
};
