import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { chatDB } from "../../firebase/chat";
import React from "react";
import Draggable from "react-draggable";
import { db } from "../../firebase/firebase";
import { UserInfo } from "../account/userInfo";
import { ChatRoom } from "./chatRoom";
import { Box } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import Router from "next/router";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: 0,
      right: 0,
      width: 400,
      height: 600,
      zIndex: 1200
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
    drag: { width: 0, height: 0 },
    appHeight: {
      minHeight: "40px",
      display: "flex",
      justifyContent: "space-between",
      padding: 0,
      background: theme.palette.buttonMain.main
    },
    margin: {
      maxHeight: "100%",
      overflow: "auto",
      boxSizing: "border-box",
      paddingTop: theme.spacing(0)
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: theme.spacing(1)
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    iconWhite: {
      color: "#fff"
    }
  })
);

export const DMWindow = ({ dm, member, userPage }) => {
  const [talkList, setTalkList] = React.useState<any | null>(null);
  const [talkId, setTalkId] = React.useState<string | null>(null);
  const [dMUserName, setDMUserName] = React.useState<string | null>(null);
  const [dMUserData, setDMUserData] = React.useState<string | null>(null);
  React.useEffect(() => {
    db.collection("talks")
      .where("member", "array-contains", `${dm.user.uid}`)
      .orderBy("updatedAt", "desc")
      .onSnapshot(snapshot => {
        // console.log(snapshot);
        setTalkList(snapshot.docs);
        const talkArray: any = [];
        let isExistsRoom = false;
        Promise.all(
          snapshot.docs.map(async (doc, index) => {
            let getUser;
            if (doc.data().member1.id === dm.user.uid) {
              getUser = await doc.data().member2.get();
            } else {
              getUser = await doc.data().member1.get();
            }
            if (userPage && member === getUser.id) {
              setTalkId(doc.id);
              setDMUserName(getUser.data().displayName);
              isExistsRoom = true;
            }
            talkArray[index] = Object.assign(getUser.data(), {
              roomId: doc.id
            });
          })
        ).then(() => {
          setTalkList(talkArray);
          // console.log(isExistsRoom);
          if (
            userPage &&
            (snapshot.docs.length === 0 || isExistsRoom === false)
          ) {
            chatDB.createRoom(dm.user.uid, member).then(res => {
              setTalkId(res.id);
            });
            console.log("roomcreate");
          }
        });
      });
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTalks = data => {
    setTalkId(data.roomId);
    setDMUserName(data.displayName);
    setDMUserData(data);
    handleDrawerClose();
  };
  const linkLecture = () => {
    Router.push(
      {
        pathname: "/lecture/[id]",
        query: { getUser: JSON.stringify(dMUserData) }
      },
      `/lecture/${talkId}`
    );
    dm.handleDMClose();
  };
  return (
    <div className={classes.drag}>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        grid={[25, 25]}
        scale={1}
        handle=".move"
      >
        <Card className={classes.root}>
          <AppBar className="move">
            <Toolbar className={classes.appHeight}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">{dMUserName}</Typography>
              <Box>
                {talkId !== null && (
                  <IconButton aria-label="close" onClick={linkLecture}>
                    <CallIcon className={classes.iconWhite} />
                  </IconButton>
                )}
                <IconButton aria-label="close" onClick={dm.handleDMClose}>
                  <CloseIcon className={classes.iconWhite} />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer + " move"}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {talkList !== null &&
                talkList.map((data, index) => (
                  <div key={index}>
                    <ListItem button onClick={() => getTalks(data)}>
                      <UserInfo userInfo={data} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
            </List>
          </Drawer>
          <CardContent
            className={classes.margin}
            id="height"
            onClick={handleDrawerClose}
          >
            {talkId !== null && (
              <ChatRoom
                roomId={talkId}
                myUid={dm.user.uid}
                userData={dMUserData}
              />
            )}
          </CardContent>
        </Card>
      </Draggable>
    </div>
  );
};

DMWindow.defaultProps = {
  member: null
};

// 通話クリックでレクチャーページ。
// トークidとトークのユーザデータが欲しい！
