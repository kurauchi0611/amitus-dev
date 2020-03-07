import React from "react";
// import './App.css';
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./checkoutForm";
import { stripeKey } from "../../config";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      width: "100%",
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      fontSize: "20px"
    }
  })
);
export const RegistCard = ({ props }) => {
  const classes = useStyles();
  const [state, setState] = React.useState<string | null>(null);
  React.useEffect(() => {
    setState(stripeKey);
  }, []);
  return (
    <div className={classes.margin}>
      {state !== null && (
        <StripeProvider apiKey={state}>
          <Elements>
            <CheckoutForm userData={props} />
          </Elements>
        </StripeProvider>
      )}
    </div>
  );
};
