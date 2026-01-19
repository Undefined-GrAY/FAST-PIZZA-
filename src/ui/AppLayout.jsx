import React from "react";
import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  //loader component is the laoding animation in the background anytime we swith between pages 
  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto]  ">

      
      {isLoading && <Loader />}
      
      
      <Header />
      <div className="overflow-scroll">
        <main className=" max-w-3xl mx-auto ">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
