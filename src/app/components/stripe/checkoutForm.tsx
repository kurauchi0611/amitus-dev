import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import {db} from "../../firebase/firebase"
import { RegularButton } from "../regularButton";
const CheckoutForm = ({userData,stripe,elements}) => {
  console.log(userData);
  console.log(stripe);
  console.log(elements);
  
  const handleSubmit=async()=> {
    let { token } = await stripe.createToken();
    console.log(token);
    db
      .collection("users")
      .doc(userData.uid)
      .collection("tokens")
      .add({ token: token.id })
      .then(() => {
        // _element.clear();
      });
  }
  return (
    <div>
      <CardElement style={{base: {fontSize: '14px'}}}/>
      <RegularButton onClick={handleSubmit} label={"カードの登録"}/>
    </div>
  );
};

export default injectStripe(CheckoutForm);
