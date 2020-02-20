import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 240,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    media: {
      height: 140
    },
    ogpText: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 4,
      wordBreak: "break-all"
    }
  })
);

export const MediaCard = ({ message }) => {
  const classes = useStyles();
  const sliceMessage = text => {
    return text.length > 100 ? text.slice(0, 100) + "…" : text;
  };
  return (
    <Link
      href={message[3]}
      target="_blank"
      rel="noopener"
      className={classes.root}
      underline="none"
    >
      <Card elevation={4}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={message[1]}
            title={message[0]}
          />
          <CardContent>
            <Tooltip title={message[0]} enterDelay={800} leaveDelay={200}>
              <Typography gutterBottom variant="h5" component="h2" noWrap>
                {message[0]}
              </Typography>
            </Tooltip>
            <Tooltip title={message[2]} enterDelay={800} leaveDelay={200}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.ogpText}
              >
                {sliceMessage(message[2])}
              </Typography>
            </Tooltip>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
