import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chips } from "../mdEditor/chips";
import { RegularButton } from "../regularButton";
import format from "date-fns/format";
import Link from "next/link";
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

export const ViewCard = ({ views, label }) => {
  const classes = useStyles();
  const [state, setState] = React.useState<any|null>();
  React.useEffect(() => {
    if (views) setState(views);
  }, [views]);
  return (
    <React.Fragment>
      {typeof state !== "undefined" &&
        state.map((element, index) => {
          const viewData = element.data();
          return (
            <Card className={classes.root} variant="outlined" key={index}>
              <CardContent>
                <Typography variant="h5" component="h3">
                  {viewData.title}
                </Typography>
                <Chips labels={viewData.tags} />
              </CardContent>
              <CardActions className={classes.buttonPosition}>
                <Typography className={classes.timestamp}>
                  {format(
                    new Date(viewData.createdAt.seconds * 1000),
                    "yyyy年MM月dd日HH時mm分投稿"
                  )}
                </Typography>
                {/* <Button size="small">詳しく見る</Button> */}
                {label === "questions" && (
                  <Link href="/questions/[id]" as={`/questions/${element.id}`}>
                    <a>
                      <RegularButton label={"詳しく見る"} />
                    </a>
                  </Link>
                )}
                {label === "tickets" && (
                  <Link href="/timeTickets/[id]" as={`/timeTickets/${element.id}`}>
                    <a>
                      <RegularButton label={"詳しく見る"} />
                    </a>
                  </Link>
                )}
              </CardActions>
            </Card>
          );
        })}
    </React.Fragment>
  );
};

// const tags = ["Javascript", "HTML", "CSS", "React", "NEXT.js", "firebase"];
// const hoge=["","","","",""]
ViewCard.defaultProps = {
  views: null
};
