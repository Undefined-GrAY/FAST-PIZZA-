import { redirect } from "react-router-dom";

import store from "../store/store";
import { createOrder } from "../services/apiRestaurant";
import { clearCart } from "../store/slices/cartSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export async function action({ request }) {
  const formData = await request.formData(); // this is where the form request is made 
  const data = Object.fromEntries(formData); //

  //getting the cart data thru the hidden input from the create order component by givng the striginfied cart object as value and parsing it here to fix it in an object for usage
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(data);
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please provide a valid number so we can contact you";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);

  console.log(newOrder);
  // do not oversue store
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
