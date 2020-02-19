import React from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Draggable from "react-draggable";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { db } from "../../firebase/firebase";
import { UserInfo } from "../account/userInfo";
import { ChatRoom } from "./chatRoom";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: 0,
      right: 0,
      width: 400,
      height: 600
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
    }
  })
);

export const DMWindow = ({ dm, member }) => {
  console.log(member);
  const [talkList, setTalkList] = React.useState<any | null>(null);
  const [talkId, setTalkId] = React.useState<string | null>(null);
  const [dMUserName, setDMUserName] = React.useState<string | null>(null);
  const [dMUserData, setDMUserData] = React.useState<string | null>(null);
  React.useEffect(() => {
    db.collection("talks")
      .where("member", "array-contains", `${dm.user.uid}`)
      .orderBy("updatedAt", "desc")
      .onSnapshot(snapshot => {
        console.log(snapshot);
        setTalkList(snapshot.docs);
        const talkArray: any = [];
        snapshot.docs.map(async (doc, index) => {
          let getUser;
          if (doc.data().member1.id === dm.user.uid) {
            getUser = await doc.data().member2.get();
          } else {
            getUser = await doc.data().member1.get();
          }
          console.log(getUser);
          talkArray[index] = Object.assign(getUser.data(), { roomId: doc.id });
        });
        setTalkList(talkArray);
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
    console.log(data.roomId);
    console.log(talkId);
    handleDrawerClose();
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
              <IconButton aria-label="close" onClick={dm.handleDMClose}>
                <CloseIcon />
              </IconButton>
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
          <CardContent className={classes.margin} onClick={handleDrawerClose}>
            {talkId !== null && (
              <ChatRoom roomId={talkId} myUid={dm.user.uid} userData={dMUserData}/>
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
