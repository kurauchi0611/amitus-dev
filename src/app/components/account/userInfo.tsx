import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex"
    },
    details: {
      display: "flex",
      flexDirection: "column"
    },
    content: {
      flex: "1 0 auto"
    },
    cover: {
      width: 64
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    playIcon: {
      height: 38,
      width: 38
    }
  })
);

export const MediaControlCard = ({ userInfo }) => {
  const [userData, setuserData] = React.useState();
  const classes = useStyles();
  useEffect(() => {
    setuserData(userInfo);
    console.log(userInfo);
  }, [userInfo]);
  return (
    <Card className={classes.card}>
      {userData && userData.photoURL === null && (
        <AccountCircleIcon style={{ fontSize: 64 }} />
      )}
      {userData && userData.photoURL && (
        <CardMedia className={classes.cover} image="" title="userImage" />
      )}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {userData && userData.displayName}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};
