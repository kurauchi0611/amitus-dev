import React from "react";
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
// import Pagination from '@material-ui/lab/Pagination';
//import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
// import Button from "@material-ui/core/Button";
import {
  Card,
  Avatar,
  CardActionArea,
  IconButton,
  CardContent,
  CardActions,
  Collapse,
  Paper
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MailIcon from "@material-ui/icons/Mail";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import clsx from "clsx";
import { yellow } from "@material-ui/core/colors";
import Link from "next/link";
import format from "date-fns/format";
import { Chips } from "../mdEditor/chips";
import { MarkDownViewer } from "../mdEditor/MarkDownViewer";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2)
    },

    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },

    expandOpen: {
      transform: "rotate(180deg)"
    },

    avatar: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1)
      },
      backgroundColor: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
      width: theme.spacing(7),
      height: theme.spacing(7)
    },

    cardHeader: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center",
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(1),
      marginLeft: theme.spacing(2)
    },

    info1: {
      display: "flex",
      alignItems: "center",
      fontSize: "16px"
    },

    info2: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center"
      // position: "absolute",
      // right: "0",
      // marginRight: theme.spacing(5)
    },
    cardContent: {
      borderLeft: "solid 3px",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: "0",
      paddingLeft: theme.spacing(2),
      borderColor: "#16A196"
    },
    paper: {
      marginBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary
    },

    icon: {
      padding: "8px"
    },

    center: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center"
    },

    margin: {
      marginTop: theme.spacing(3)
    },

    title: {
      fontSize: "1.2rem",
      color: theme.palette.text.primary,
      borderLeft: "solid 3px",
      paddingLeft: theme.spacing(2),
      borderColor: "#16A196"
    },

    price: {
      color: "#fdd835",
      fontWeight: "bold",
      textShadow: "1px 1px 1px black",
      fontSize: "18px"
    },

    media: {
      height: 0,
      paddingTop: "31.25%"
      // paddingTop: '56.25%', // 16:9
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
      }
    }
  })
);

export const TopPageCard = ({ props, label, dm }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleDM = e => {
    e.preventDefault();
    if (!dm.dMopen) {
      dm.handleDMMember(props.user.uid);
      return dm.handleDMOpen();
    } else return dm.handleDMClose();
  };

  const splitText = text => {
    if (text.length < 200) return text;
    else {
      return text.substr(0, 200);
    }
  };
  return (
    <React.Fragment>
      {typeof props !== "undefined" && (
        <Paper elevation={6}>
          <Card className={classes.root}>
            <CardActionArea className={classes.buttonPosition}>
              <Link href="/users/[id]" as={`/users/${props.user.uid}`}>
                <a>
                  <Box className={classes.cardHeader}>
                    <Grid item xs={8} className={classes.info1}>
                      <Box>
                        {props.user.photoURL && (
                          <Avatar
                            className={classes.avatar}
                            alt={props.user.displayName}
                            src={props.user.photoURL}
                          />
                        )}
                        {props.user.photoURL === null && (
                          <Avatar className={classes.avatar}>NO</Avatar>
                        )}
                      </Box>
                      <Box>
                        {props.user.displayName}
                        <IconButton
                          aria-label="pm"
                          color="primary"
                          className={classes.icon}
                          onClick={toggleDM}
                        >
                          <MailIcon />
                        </IconButton>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {format(
                            new Date(props.createdAt.seconds * 1000),
                            "yyyy年MM月dd日HH時mm分投稿"
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                    {label === "tickets" && (
                      <Grid item xs={4} className={classes.info2}>
                        <MonetizationOnIcon
                          fontSize="large"
                          style={{ color: yellow[600] }}
                        />
                        <Typography className={classes.price}>
                          {props.amount}円/30分
                        </Typography>
                      </Grid>
                    )}
                  </Box>
                </a>
              </Link>
            </CardActionArea>
            <CardActionArea className={classes.buttonPosition}>
              {label === "questions" && (
                <Link href="/questions/[id]" as={`/questions/${props.id}`}>
                  <a>
                    <CardMedia
                      className={classes.media}
                      image="/images/card_banner_code.png"
                      title={props.title}
                    />
                    <Typography variant="h4" component="h3">
                      {props.title}
                    </Typography>
                  </a>
                </Link>
              )}
              {label === "tickets" && (
                <Link href="/timeTickets/[id]" as={`/timeTickets/${props.id}`}>
                  <a>
                    <CardMedia
                      className={classes.media}
                      image="/images/card_banner_project.png"
                      title={props.title}
                    />
                    <Typography variant="h4" component="h3">
                      {props.title}
                    </Typography>
                  </a>
                </Link>
              )}
            </CardActionArea>
            <CardActions disableSpacing>
              <Chips labels={props.tags} />
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <MarkDownViewer text={splitText(props.text)} isEdit={false} />
                {/* <Typography paragraph>{props.text}</Typography> */}
              </CardContent>
            </Collapse>
          </Card>
        </Paper>
      )}
    </React.Fragment>
  );
};
