import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../cart/Cart";
import { getCart, getTotalCartPrice } from "../../store/slices/cartSlice";
import EmptyCart from "../cart/EmptyCart";

import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../../store/slices/userSlice";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [address, setAddress] = useState("");
  const {
    username,
    status: addressStatus,
    position,
    address: deliveryAddress,
    error: errorAddress,
  } = useSelector((state) => state.user);

  console.log(position.latitude);
  console.log(position.latitude);

  function handleAddress(e) {
    setAddress(e.target.value);
  }

  function handleDeliveryAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  useEffect(
    function () {
      setAddress(deliveryAddress);
    },
    [deliveryAddress],
  );

  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6 ">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            defaultValue={username}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input  w-full" />
            {formErrors?.phone && (
              <p className="text-sx mt-2 text-red-700 rounded-md bg-red-100 p-2">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              value={address}
              onChange={handleAddress}
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="text-sx mt-2 text-red-700 rounded-md bg-red-100 p-2">
                {errorAddress}
              </p>
            )}
          </div>

          <span className="absolute right-0.75 top-2 z-10">
            {!position.latitude && !position.longitude && address === "" && (
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={handleDeliveryAddress}
              >
                Get position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="size-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to your give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing Order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
