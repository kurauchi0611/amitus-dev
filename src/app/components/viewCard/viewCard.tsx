import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CardActionArea, Card, CardMedia, Paper } from "@material-ui/core";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chips } from "../mdEditor/chips";
// import { RegularButton } from "../regularButton";
import format from "date-fns/format";
import Link from "next/link";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
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
      paddingBottom: theme.spacing(2),
      justifyContent: "space-between",
      "& a": {
        width: "100%",
        display: "inline-block",
        textDecoration: "none",
        "& h3": {
          marginTop: theme.spacing(2),
          borderLeft: `solid 4px ${theme.palette.primary.main}`,
          paddingLeft: theme.spacing(2)
        }
      },
      "& a:link": {
        color: "#757575"
      },
      "& a:visited": {
        color: "#757575"
      },
    },
    timestamp: {
      //  fontSize: ".8rem" 
      },
    media: {
      height: 0,
      paddingTop: "32%", // 16:9
      background: ""
    },
    tagsWrap: {
      paddingTop: 0
    }
  })
);

export const ViewCard = ({ views, label }) => {
  const classes = useStyles();
  const [state, setState] = React.useState<any | null>();
  React.useEffect(() => {
    if (views) setState(views);
  }, [views]);
  return (
    <React.Fragment>
      {typeof state !== "undefined" &&
        state.map((element, index) => {
          const viewData = element.data();
          return (
            <Paper elevation={8}  key={index}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.timestamp}>
                    {format(
                      new Date(viewData.createdAt.seconds * 1000),
                      "yyyy年MM月dd日HH時mm分投稿"
                    )}
                  </Typography>
                </CardContent>
                <CardActionArea className={classes.buttonPosition}>
                  {/* <Button size="small">詳しく見る</Button> */}
                  {label === "questions" && (
                    <Link
                      href="/questions/[id]"
                      as={`/questions/${element.id}`}
                    >
                      <a>
                        <CardMedia
                          className={classes.media}
                          image="/images/card_banner_code.png"
                          title={viewData.title}
                        />
                        <Typography variant="h4" component="h3">
                          {viewData.title}
                        </Typography>
                      </a>
                    </Link>
                  )}
                  {label === "tickets" && (
                    <Link
                      href="/timeTickets/[id]"
                      as={`/timeTickets/${element.id}`}
                    >
                      <a>
                        <CardMedia
                          className={classes.media}
                          image="/images/card_banner_project.png"
                          title={viewData.title}
                        />
                        <Typography variant="h4" component="h3">
                          {viewData.title}
                        </Typography>
                      </a>
                    </Link>
                  )}
                </CardActionArea>
                <CardContent className={classes.tagsWrap}>
                  <Chips labels={viewData.tags} />
                </CardContent>
              </Card>
            </Paper>
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
