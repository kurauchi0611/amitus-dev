import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chips } from "../mdEditor/chips";
import { RegularButton } from "../regularButton";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "left"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  buttonPosition: {
    justifyContent: "space-between"
  },
  timestamp: { fontSize: ".8rem" }
});

export const ViewCard = ({ views }) => {
  const classes = useStyles();
  const [state, setState] = React.useState();
  React.useEffect(() => {
    setState(views);
  }, [views]);

  return (
    <div>
      {typeof state !== "undefined" &&
        state.map((element, index) => {
          console.log(element);
          return (
            <Card className={classes.root} variant="outlined" key={index}>
              <CardContent>
                <Typography variant="h5" component="h3">
                  たすけて！！！
                </Typography>
                <Chips labels={tags} />
              </CardContent>
              <CardActions className={classes.buttonPosition}>
                <Typography className={classes.timestamp}>
                  {"2020年2月14日01時03分投稿"}
                </Typography>
                {/* <Button size="small">詳しく見る</Button> */}
                <RegularButton label={"詳しく見る"} />
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};

const tags = ["Javascript", "HTML", "CSS", "React", "NEXT.js", "firebase"];
// const hoge=["","","","",""]
ViewCard.defaultProps = {
  views: []
};
