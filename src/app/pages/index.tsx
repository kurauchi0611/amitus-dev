import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Card, Avatar, IconButton, CardContent, CardActions, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    wrap: {
      display: "flex",
      flexFlow: "row",
      justifyContent: "space-around",
      // alignItems: "center",
      // textAlign: "center",
      marginTop: theme.spacing(10),
      background:theme.palette.background.paper,
    },

    root: {
      marginBottom: theme.spacing(2),
    },

    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },

    expandOpen: {
      transform: 'rotate(180deg)',
    },

    avatar: {
      display: "flex",
      '& > *': {
        margin: theme.spacing(1),
      },
      backgroundColor: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
      width: theme.spacing(7),
      height: theme.spacing(7),
    },

    cardHeader: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center",
      paddingTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },

    cardContent: {
      borderLeft: "solid 3px",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: "0",
      paddingLeft: theme.spacing(2),
      borderColor: "#16A196",
    },

    left: {
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2)
    },

    right: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2),
    },

    paper: {
      marginBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },

    icon: {
      padding: "0 0 0 5px",
    },

    center: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
    },

    margin: {
      marginTop: theme.spacing(3),
    },

    title: {
      fontSize: "1.2rem",
      color: theme.palette.text.primary,
      borderLeft: "solid 3px",
      paddingLeft: theme.spacing(2),
      borderColor: "#16A196",
    }
  }));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TopPage() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if(false) console.log(event);    
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container className={classes.wrap}>
      <Grid className={classes.left} xs={6}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="tabs"
          >
            <Tab label="人気の質問" {...a11yProps(0)} />
            <Tab label="マイスキルの質問" {...a11yProps(1)} />
            <Tab label="人気のチケット" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Card className={classes.root}>
              <Box className={classes.cardHeader}>
                <Box>
                  <Avatar className={classes.avatar}></Avatar>
                </Box>
                <Box>
                  ユーザー名
                  <IconButton aria-label="pm" color="primary" className={classes.icon}><MailIcon /></IconButton>
                  <Typography variant="body2" color="textSecondary" component="p">hh:mm:ss yyyy-mm-dd</Typography>
                </Box>
              </Box>
            
              <CardContent className={classes.cardContent}>
                <Box>
                <Typography variant="h5">質問/チケットのタイトルだよ～</Typography>
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <Button variant="outlined">タグ</Button>

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
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
                  <Typography paragraph>質問/チケットの内容(先頭50文字？)<br></br><br></br><br></br><br></br><br></br>三('ω')三( ε: )三(.ω.)三( :3 )三('ω')三( ε: ) ｡･*･:≡(    ε:)</Typography>
                </CardContent>
              </Collapse>
            </Card>
              
            <Pagination className={classes.center} count={10} color="primary" />
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
           <Card className={classes.root}>
              <Box className={classes.cardHeader}>
                <Box>
                  <Avatar className={classes.avatar}></Avatar>
                </Box>
                <Box>
                  ユーザー名
                  <IconButton aria-label="pm" color="primary" className={classes.icon}><MailIcon /></IconButton>
                  <Typography variant="body2" color="textSecondary" component="p">hh:mm:ss yyyy-mm-dd</Typography>
                </Box>
              </Box>
            
              <CardContent className={classes.cardContent}>
                <Box>
                <Typography variant="h5">質問/チケットのタイトルだよ～</Typography>
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <Button variant="outlined">タグ</Button>

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
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
                  <Typography paragraph>質問/チケットの内容(先頭50文字？)<br></br><br></br><br></br><br></br><br></br>三('ω')三( ε: )三(.ω.)三( :3 )三('ω')三( ε: ) ｡･*･:≡(    ε:)</Typography>
                </CardContent>
              </Collapse>
            </Card>
            
            <Pagination className={classes.center} count={10} color="primary" />
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <Card className={classes.root}>
              <Box className={classes.cardHeader}>
                <Box>
                  <Avatar className={classes.avatar}></Avatar>
                </Box>
                <Box>
                  ユーザー名
                  <IconButton aria-label="pm" color="primary" className={classes.icon}><MailIcon /></IconButton>
                  <Typography variant="body2" color="textSecondary" component="p">hh:mm:ss yyyy-mm-dd</Typography>
                </Box>
              </Box>
            
              <CardContent className={classes.cardContent}>
                <Box>
                <Typography variant="h5">質問/チケットのタイトルだよ～</Typography>
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <Button variant="outlined">タグ</Button>

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
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
                  <Typography paragraph>質問/チケットの内容(先頭50文字？)<br></br><br></br><br></br><br></br><br></br>三('ω')三( ε: )三(.ω.)三( :3 )三('ω')三( ε: ) ｡･*･:≡(    ε:)</Typography>
                </CardContent>
              </Collapse>
            </Card>
            
            <Pagination className={classes.center} count={10} color="primary" />
          </TabPanel>
        </SwipeableViews>
      </Grid>
      
      <Grid className={classes.right} xs={5}>
        <Paper className={classes.paper}>
          <Box fontSize="h6.fontSize" ml={2}>本日のスケジュール</Box>
          <Box textAlign="center" m={5}>更新中・・・</Box>
          <Box textAlign="right"><Button variant="outlined">一覧</Button></Box>
        </Paper>

        <Box className={classes.margin} m={1}><Typography variant="h5" color="primary">新着通知</Typography></Box>

        <Paper className={classes.paper}>
          <Box className={classes.title}>通知1タイトル</Box>
          <Box textAlign="left" ml={2}>hh:mm:ss yyyy-mm-dd</Box>
          <Box m={3}>通知1の内容だよ・・</Box>          
        </Paper>
        
      </Grid>
    </Container>
  );
}
