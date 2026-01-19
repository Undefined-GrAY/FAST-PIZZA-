import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
// import { useSelector } from "react-redux";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}


export default Menu;
