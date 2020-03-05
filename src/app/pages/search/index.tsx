import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Grid, Box, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      display: "flex",
      flexFlow: "row",
      justifyContent: "center",
      marginTop: theme.spacing(10),
      background:theme.palette.background.paper,
    },

    root: {
      display: "flex",
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
      marginBottom: theme.spacing(2),
      width: theme.spacing(7),
      height: theme.spacing(7),
    },

    icon: {
      padding: "0 0 0 5px",
    },

    cardHeader: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      paddingTop: theme.spacing(2),
    },

    left: {
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2)
    },

    right: {
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2)
    },

    pageList: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    }
  }),
);

const options = [
  '人気順',
  '新着順',
  'コメント数順',
];

export default function ResultCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (_event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className={classes.wrap}>
      <Grid className={classes.left} xs={9}>
        <Card className={classes.root}>
          <Grid xs={3} className={classes.cardHeader}>
            <Avatar className={classes.avatar}></Avatar>
              <Box>
                ユーザー名
                <IconButton aria-label="pm" color="primary" className={classes.icon}><MailIcon /></IconButton>
              </Box>
          </Grid>
          
          <Grid xs={9}>
            <CardContent>
              <Box>
              <Typography variant="h5">質問/チケットのタイトルだよ～</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" component="p">hh:mm:ss yyyy-mm-dd</Typography>
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
                <Typography paragraph>質問/チケットの内容(全部？)<br></br><br></br><br></br><br></br><br></br>三('ω')三( ε: )三(.ω.)三( :3 )三('ω')三( ε: ) ｡･*･:≡(    ε:)</Typography>
              </CardContent>
            </Collapse>
          </Grid>
        </Card>

        <Pagination className={classes.pageList} count={10} color="primary" />
      </Grid>

      <Grid className={classes.right} xs={2}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText primary="並べ替え" secondary={options[selectedIndex]} />
          <ArrowDropDownIcon />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      </Grid>
    </Container>
  );
}
