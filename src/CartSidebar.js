import React from "react";
// import CheckOut from "./CheckOut";
import CheckOutCart from "./CheckOutCart";
import "./Checkout.css";

const CartSidebar = () => {
  return (
    <>
 <div className="cart-content">
    
    {/* <div className="cart-sidebar">
    <CheckOutCart />
    </div> */}
  </div>
   <div className="cart-sidebar">
   <CheckOutCart />
   </div>
    </>
  );
};

export default CartSidebar;
