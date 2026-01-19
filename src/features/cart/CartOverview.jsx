import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../../store/slices/cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  //the reduce method is used to counbte the total number of product in an array, it takes to arghuement the first is two paramter in a parenthasis(the accumalor value and the item), second is the accumulator expression, and trhe accumaulator value staring at zero.

  const totalCartQuantity = useSelector(getTotalCartQuantity);

  const totalCartPrice = useSelector(getTotalCartPrice);
  console.log(totalCartQuantity, totalCartPrice, "hi");

  if (!totalCartQuantity) return null;

  return (
    <div className="bg-stone-800 text-zinc-200 px-4 py-4 uppercase sm:px-6 flex items-center justify-between">
      <p className=" text-zinc-200 font-semibold space-x-4 sm:space-x-6 text-sm md:text-base">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
