import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      alignItems: "center",
      cursor: "auto",
      display: "flex",
      flexFlow: "row",
      justifyContent: "space-evenly"
      // width: "100%"
    },
    avatar: {
      fontSize: "1.2rem",
      color: "#fff",
      background: theme.palette.buttonMain.main
    },
    typoWidth: {
      marginLeft: theme.spacing(2),
      maxWidth: "400px"
    }
  })
);

export const UserInfo = ({ userInfo }) => {
  const [userData, setuserData] = React.useState<any|null>();
  const classes = useStyles();
  useEffect(() => {
    setuserData(userInfo);
  }, [userInfo]);
  return (
    <div className={classes.card}>
      {userData && userData.photoURL === null && (
        <Avatar className={classes.avatar}>
          {userData && userData.displayName}
        </Avatar>
      )}
      {userData && userData.photoURL && (
        <Avatar alt={userData.displayName} src={`${userData.photoURL}`} />
      )}
      <Typography component="h6" variant="h6" className={classes.typoWidth}>
        {userData && userData.displayName}
      </Typography>
    </div>
  );
};
