

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Checkout.css";
import Swal from "sweetalert2";
import thumbnail from "./images/thumbnail.png";
import qs from "qs";

const CheckOut=()=>{
  const navigate = useNavigate();
    const location = useLocation();
  const [cart, setCart] = useState([]); // For storing cart items
  const [totalAmount, setTotalAmount] = useState(0); // Total product price before discount
  const [totalDiscount, setTotalDiscount] = useState(0); // Total discount
  const [totalSpecialDiscount, setTotalSpecialDiscount] = useState(0); // Total special discount
  const [finalAmount, setFinalAmount] = useState(0); // Final amount after discounts
  const [isCashbackApplied, setIsCashbackApplied] = useState(false);
  const [isModalOpen , setIsModalOpen] = useState(false);

  const savedData = JSON.parse(localStorage.getItem("saveddata")) || {};

  const { product_image, base_url} = location.state || savedData


  const handleOpenModal =()=>{
    setIsModalOpen(true);
  }

  const handleCloseModal =()=>{
    setIsModalOpen(false);
  }

  
const handleProceed = async () => {

  const userId = localStorage.getItem("user_id");
    // console.log("place userid",userId);
    if(!userId){
      // alert('Please Login First');
      Swal.fire({
        title: "Login Required!",
        text: "Please login beore placing an order",
        icon: "warning",
        showCancelButton: true,
        confirmButtomText: "Login Now",
        cancelButtonText: "Cancel",
      }).then((result)=>{
        if(result.isConfirmed){
          navigate('/login');
        }
      });
      return;
    }

  const order = {
      "product_list": JSON.stringify([
          {
              "size": "M",
              "product_id": "788",
              "gift_id": "0",
              "unit_value": "0",
              "discount": "67",
              "product_qty": "1",
              "gift_name": "0",
              "product_price": "550",
              "product_unit": "",
              "cashback": "5.5"
          },
          {
              "size": "M",
              "product_id": "789",
              "gift_id": "0",
              "unit_value": "0",
              "discount": "80",
              "product_qty": "1",
              "gift_name": "0",
              "product_price": "250",
              "product_unit": "",
              "cashback": "2.5"
          }
      ]),
     cart: cart,
     totalAmount: totalAmount,
     totalDiscount: totalDiscount, 
     totalSpecialDiscount: totalSpecialDiscount, 
     finalAmount: finalAmount,
      "user_id": "10002",
      "store_id": "1",
      "order_address": "fg, fff, rft, - 411028",
      "location_id": "1",
      "bill_amount": "288.0",
      "payment_type": "2",
      "ref_bill_no": "10002",
      "coupon_code": "0",
      "delivery_charges": "57",
      "coupon_discount": 0,
      "referUserId": "10001",
      "expected_deldate": "10/02/2024"
  };

   const userName = localStorage.getItem('user_name');
  //  const availBalance = JSON.parse(localStorage.getItem("avail_balance"));
   order.userName = userName;
  //  order.availBalance = availBalance;
 

  try {
    const response = await axios.post(
      "https://mrcartonline.com/kitty/index.php/User/sendOrder3",{order:order},
      {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
              // "Content-Type": "application/json"

          }
      }
  );
  

      // console.log("Order Response:", response.data);

      if (response.status === 200) {
          // alert("Order placed successfully!");
          navigate("/payment-confirmation");
          localStorage.setItem("order", JSON.stringify(order));
          setIsModalOpen(false); // Close modal
      } else {
          alert(`Order failed: ${response.data.message || "Unknown error"}`);
      }
  }
  catch (error) {
    if (error.response) {
        console.error("Response Error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
    } else if (error.request) {
        console.error("Request Error:", error.request);
        alert("No response received. Server may be down.");
    } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
    }
}

};

 const handleCashback =()=>{
  setIsCashbackApplied((prevState)=>{
    const newCashback = !prevState;
    calculateAmounts(cart, newCashback);
    return newCashback;
  })
  // calculateAmounts(cart);
 }

 const handleClearCart=()=>{
  setCart([]);
  localStorage.removeItem('cart');
 }

  useEffect(() => {
    // Retrieve cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    calculateAmounts(storedCart);
  }, []);

  // Calculate Total Amount, Discounts, and Final Amount
  const calculateAmounts = (updatedCart, isCashbackApplied) => {
    let total = 0;
    let discountTotal = 0;
    let specialDiscountTotal = 0;

    updatedCart.forEach((product) => {
      const price = product.price || 0;
      const quantity = product.quantity || 1;
      const discount = product.discount || 0;
      const specialDiscount = product.special_discount || 0;

      total += price * quantity; // Total amount before discount
      // discountTotal += discount * quantity; 
      discountTotal += (price * discount/100) * quantity;
      specialDiscountTotal += specialDiscount * quantity;
    });

    setTotalAmount(total);
    setTotalDiscount(discountTotal);
    setTotalSpecialDiscount(specialDiscountTotal);

    // Final amount after applying all discounts
    const finalAmountCalc = isCashbackApplied ? total - (discountTotal + specialDiscountTotal) : total - discountTotal;
    setFinalAmount(finalAmountCalc);
  };

  // Handle increasing quantity
  const handleIncrease = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
    calculateAmounts(updatedCart); // Recalculate total amount after update
  };

  // Handle decreasing quantity or removing product if quantity is 0
  const handleDecrease = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove item if quantity is 0
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
    calculateAmounts(updatedCart); // Recalculate total amount after update
  };

  // Update localStorage with new cart data
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
    return(
        <>
         {cart.length > 0 ? (
        <div className="container-fluid mt-5 p-0 pt-2">
         
          <div className="row fixedbg m-0 shadow pb-1">
            <div className="col-1 ms-2">
              <Link to={-1} className="text-decoration-none text-dark">
                <h5>
                  <i className="fa-solid fa-arrow-left"></i>     
                  </h5>
              </Link>
            </div>
            <div className="col-10">
              <h4 className="ms-2 categorytext">Checkout</h4>   
            </div>
          </div>


          <div className="container-fluid bg-light pb-5">
            {cart.map((product) => (
              <div className="row" key={product.id}>
                <div className="col-12 pipebg2 mt-3">
                  <div className="row shadow-sm p-md-3 p-1 mb-md-3 rounded">
                    <div className="col-3 col-md-2">
                    { product_image ? (
                          <img src={`${base_url}${product_image}`} className="img-fluid rounded-4" alt="Product" />
                        ) : (
                         <img src={thumbnail}  className="img-fluid rounded-4" alt="product"/>
                        )}
                     
                    </div>

                    <div className="col-7 col-md-7">
                      <div className="checktext1">{product.name || "No Name"}</div>
                      <div className="checktext2">{product.name || "No Name"}</div>
                      <div className="checktext3 py-md-1">
                        ₹{product.price || "N/A"}
                      </div>
                      <div className="checktext1 py-1 text-danger">
                        {product.discount !== undefined ? `${(product.discount).toFixed(2)}% Off` : "No Discount"}
                      </div>
                      <div className="checktext4">
                        Cashback: ₹{product.special_discount ? `${product.special_discount}` : "No Cashback"}
                      </div>
                    </div>

                    <div className="col-2 col-md-3 my-auto">
                      <div className="d-flex align-items-center justify-content-end">
                        <button
                          className="btn btn-danger rounded-pill py-0 m-md-2 m-1 px-2"
                          onClick={() => handleDecrease(product.id)}
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="btn btn-success rounded-pill py-0 m-md-2 m-1 px-2"
                          onClick={() => handleIncrease(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="my-3 row amountPay">
              <div className="col-4">
                <div className="checktext5">Total Amount</div>
                <h6>₹{totalAmount.toFixed(2)}</h6>
              </div>
              <div className="col-4">
                <div className="checktext5">Total Discount</div>
                <h6>&#8377;{totalDiscount.toFixed(2)}</h6>
              </div>
              <div className="col-4">
                
              </div>
            </div>

            <div className="row">
              <div className="col-6">
              <div className="checktext5">Cashback For Subscribed*</div>
              <h6 className="text-success">&#8377;{totalSpecialDiscount.toFixed(2)}</h6>
              </div>
              <div className="col-4">
              <div className="checktext5">Net Payable</div>
              <h5 className="totalpay">&#8377;{finalAmount.toFixed(2)}</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <input  type="checkbox" checked={isCashbackApplied} onClick={handleCashback}/> <span className="fw-bold checktext5">Redeem Cashback</span>
              </div>
            </div>

            <div className="row">
              <div className="col-12 my-2 col-md-5 mx-auto">
                <button className="text-center border-0 placed-order w-100 py-2 text-white"
                onClick={handleOpenModal}
                >PLACE ORDER</button>
              </div>
              <div className="col-12 col-md-8 mx-auto">
               <div className="text-center checktext5" onClick={handleClearCart} style={{cursor: 'pointer'}}>Clear Cart</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-2">
           <div className="row fixedbg shadow pb-1">
            <div className="col-1 ms-2">
              <Link to={-1} className="text-decoration-none text-dark">
                <h5>
                  <i className="fa-solid fa-arrow-left"></i>
                </h5>
              </Link>
            </div>
            <div className="col-10">
              <h4 className="ms-2 categorytext">Checkout</h4>
            </div>
          </div>
          <h3 className="mt-5 pt-2">Your cart is empty!</h3>
          <div className="my-3 row amountPay">
              <div className="col-4">
                <div className="checktext5">Total Amount</div>
                <h6>₹0.00</h6>
              </div>
              <div className="col-4">
                <div className="checktext5">Total Discount</div>
                <h6>₹0.00</h6>
              </div>
              <div className="col-4">
                
              </div>
            </div>

            <div className="row">
              <div className="col-6">
              <div className="checktext5">Cashback For Subscribed*</div>
              <h6 className="text-success">₹0.00</h6>
              </div>
              <div className="col-4">
              <div className="checktext5">Net Payable</div>
              <h5 className="totalpay">&#8377;0.00</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input  type="checkbox" checked={isCashbackApplied} onClick={handleCashback}/> <span className="fw-bold checktext5">Redeem Cashback</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12 my-2 col-md-5 mx-auto">
                <button className="text-center border-0 placed-order w-100 py-2 text-white"
                onClick={handleOpenModal}
                >PLACE ORDER</button>
              </div>
              <div className="col-12 col-md-8 mx-auto ">
               <div className="text-center checktext5" onClick={handleClearCart} style={{cursor: 'pointer'}}>Clear Cart</div>
              </div>
            </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
            <div className="row">
              <div className="col-5 mx-auto text-centerfw-bold"><i class="fa-solid text-warning fs-2 fa-circle-exclamation"></i></div>
              <p className="pb-0 mb-1 col-12">Place Order Confirmation</p>
              <div className="modaltext text-center ">Are you sure you want <br/> to place Order ?</div>
              <div className="modal-buttons">
        <button className="btn btn-danger" onClick={handleCloseModal}>Cancel</button>
        <button className="btn btn-success" onClick={handleProceed}>Proceed</button>
      </div>
            </div>
          </div>
        </div>
      )}
        </>
    )
}

export default CheckOut;