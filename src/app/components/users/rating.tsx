import React from "react";
import Rating, { IconContainerProps } from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
// import Box from "@material-ui/core/Box";

const customIcons: {
  [index: string]: { icon: React.ReactElement; label: string };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied"
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied"
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral"
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied"
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied"
  }
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
export const Ratings = ({ rating }) => {
  const [rate, setRate] = React.useState(1);
  React.useEffect(() => {
    setRate(rating);
  }, [rating]);
  return (
    <Rating
      name="customized-icons"
      value={rate}
      getLabelText={(value: number) => customIcons[value].label}
      IconContainerComponent={IconContainer}
      size="large"
      readOnly
    />
  );
};
