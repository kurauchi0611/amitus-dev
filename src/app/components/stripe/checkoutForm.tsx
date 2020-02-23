import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { db } from "../../firebase/firebase";
import { RegularButton } from "../regularButton";
import { Typography } from "@material-ui/core";
const CheckoutForm = ({ userData, stripe, elements }) => {
  console.log(userData);
  console.log(stripe);
  console.log(elements);
  const [errMessage, setErrMessage] = React.useState<string>();
  const handleSubmit = async () => {
    let { token, error } = await stripe.createToken();
    if (typeof error === "undefined") {
      console.log(token);
      db.collection("users")
        .doc(userData.uid)
        .collection("tokens")
        .add({ token: token.id })
        .then(() => {
          // _element.clear();
        });
    } else {
      setErrMessage(error.message);
      console.log(error);
    }
  };
  const handleChange=()=>{
    setErrMessage("");
  }
  return (
    <div>
      <CardElement style={{ base: { fontSize: "14px" } }}  onChange={handleChange}/>
      <RegularButton onClick={handleSubmit} label={"カードの登録"}/>
      <Typography variant="caption" color="error">
        {errMessage}
      </Typography>
    </div>
  );
};

export default injectStripe(CheckoutForm);
