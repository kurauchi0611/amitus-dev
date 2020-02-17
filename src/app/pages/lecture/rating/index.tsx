import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
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

    margin: {
      marginTop: theme.spacing(3)
    },
    
    title: {
      fontSize: "20px"
    },

    box: {
      width: "500px",
      border: "solid",
      borderColor: "gray",
      borderWidth: "1px",
      marginTop: theme.spacing(3)
    },

    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400,
      },
    },
  })
);

const StyledRating = withStyles({
  iconFilled: {
    color: "#16A196",
  },
  iconHover: {
    color: "#16A196",
  },
})(Rating);

const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function CustomizedRatings() {
  const classes = useStyles();
  
  return (
    <div className={classes.wrap}>
        <div>
          <h1 className={classes.title}>レクチャーが完了しました。</h1>

          <p>
            タイトル：ｘｘｘ<br></br>
            開始：2月14日(金)　17:00<br></br>
            終了：2月14日(金)　19:00<br></br>
            形式：アミタス オンラインレクチャールーム
          </p>
        </div>

        <div className={classes.box}>
          <Box className={classes.margin}
            component="fieldset" mb={3} 
            borderColor="transparent">
              <Typography component="legend" >今回のレクチャーに対して評価してください</Typography>
            
            
              <StyledRating
                name="customized-icons"
                defaultValue={3}
                getLabelText={(value: number) => customIcons[value].label}
                IconContainerComponent={IconContainer}
              /><br></br>
              
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-textarea"
                  label="コメントを入力してください"
                  multiline
                  variant="outlined"
                />
              </form>
            </Box>    
        </div>
        <Button className={classes.margin} variant="outlined">「確認」ボタンいれて！！</Button>
    </div>
  );
}