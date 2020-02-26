import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
//import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    wrap: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: theme.spacing(10)
    },

    root: {
      display: "flex",
    },

    left: {
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      width: 700,
      paddingTop: theme.spacing(2)
    },

    right: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      width: 500,
      paddingTop: theme.spacing(2)
    },

    paper: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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

export default function FullWidthTabs() {
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

  return (
    <div className={classes.wrap}>
      <div className={classes.root}>
        <Container className={classes.left}>
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

              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              
              <Pagination className={classes.center} count={10} color="primary" />
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>

              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              
              <Pagination className={classes.center} count={10} color="primary" />
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
              
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              <Paper className={classes.paper}>
                Content<br></br>Content<br></br>Content
              </Paper>
              
              <Pagination className={classes.center} count={10} color="primary" />
            </TabPanel>
          </SwipeableViews>
        </Container>
        
        <Container className={classes.right}>
          <Paper className={classes.paper}>
            <Box textAlign="left" fontSize="h6.fontSize" m={2}>本日のスケジュール</Box>
            <Box m={5}>更新中・・・</Box>
            <Box textAlign="right"><Button variant="outlined">一覧</Button></Box>
          </Paper>

          <Box className={classes.margin} fontSize="h5.fontSize" m={1} textAlign="left">新着通知</Box>
          <Paper className={classes.paper}>
            <Box textAlign="left" fontSize="h6.fontSize">通知1タイトル</Box>
            <Box m={3}>通知1の内容だよ・・</Box>
            <Box textAlign="right">hh:mm:ss yyyy-mm-dd</Box>
          </Paper>
          <Paper className={classes.paper}>
            <Box textAlign="left" fontSize="h6.fontSize">通知2タイトル</Box>
            <Box m={3}>通知2の内容だよ・・</Box>
            <Box textAlign="right">hh:mm:ss yyyy-mm-dd</Box>
          </Paper>
          <Paper className={classes.paper}>
            <Box textAlign="left" fontSize="h6.fontSize">通知3タイトル</Box>
            <Box m={3}>通知3の内容だよ・・</Box>
            <Box textAlign="right">hh:mm:ss yyyy-mm-dd</Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
