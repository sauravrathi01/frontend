import React, { useState } from "react";
import {  Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./profile.css";

const PaymentConfirmation =()=>{

     const [storedUserId, setStoredUserId] = useState(localStorage.getItem("user_id"));
    const [paymentMethod, setPaymentMethod] = useState('');
  
    

    const order = JSON.parse(localStorage.getItem("order")) || {};

    const availBalance = Number(localStorage.getItem("avail_balance"));
    // console.log(availBalance);
    const finalAmount = Number(order.finalAmount);

    const handlePayment =()=>{
        if(!paymentMethod){
            alert('Please select a payment method');
            return;
        }

        if (paymentMethod === "wallet" && availBalance <= order.finalAmount) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Insufficient Balance!",
                  });
                  return;
             }
             else{
                let newBalance = finalAmount - availBalance;
                localStorage.setItem("avail_balance",newBalance);
                // console.log("updated balance", newBalance);

                setPaymentMethod("");
             }
            }

            const handleRazorpayPayment = async () => {
                // if (!storedUserId) {
                //   Swal.fire({
                //     icon: "error",
                //     title: "User ID Missing",
                //     text: "Please log in again.",
                //   });
                //   return;
                // }
            
                // const user = users[0];
            
                try {
                  const options = {
                    key: "rzp_live_w6fv8fQgqoPYMw",
                    amount: order.finalAmount * 100, 
                    currency: "INR",
                    name: order.userName,
                    description: "Subscription Payment",
                    handler: async function (response) {
                      console.log("Payment Details:", response);

                      if (paymentMethod === "online"){
                        let newBalance = finalAmount - availBalance;
                        if (newBalance < 0) newBalance = 0; 
                        localStorage.setItem("avail_balance", newBalance);
                      }
                     
                      // Step 3: Verify Payment with Backend (if required)
                    },
                    prefill: {
                      name: order.userName,
                      email: order.user_email,
                      contact: order.user_mobile,
                    },
                    notes: {
                      user_id: storedUserId,
                    //   soolegal_order_id: "123",
                    },
                    theme: {
                      color: "#3399cc",
                    },
                  };
            
                  const rzp = new window.Razorpay(options);
                  rzp.open();
                } catch (error) {
                  console.error("Payment Error:", error);
                  Swal.fire({
                    icon: "error",
                    title: "Payment Error",
                    text: "Failed to initiate payment. Please try again.",
                  });
                }
              };


    return(
        <>
        <div className="container-fluid overflow-hidden p-0">
        <div className="row fixedbg m-0 shadow pb-1">
            <div className="col-1 ">
              <Link to={-1} className="text-decoration-none text-dark">
                <h5>
                  <i className="fa-solid fa-arrow-left"></i>     
                  </h5>
              </Link>
            </div>
            <div className="col-10">
              <h4 className=" categorytext">Payment Confirmation</h4>   
            </div>
         </div>
          <div className="row mt-5 ">
          <div className="col-12 text-center my-2">
                <h5> &#8377;{availBalance}</h5>
              </div>
          <div className="row justify-content-center">
                <div className="col-10 col-md-6 mt-2 ps-0 border-bottom border-1 border-secondary">
                  <div className="slottext2 ">User Name</div>
                  <h6 className="mb-0">{order.userName || "Guest"}</h6>
                </div>
              </div>
              <div className="row my-2  justify-content-between">
                <div className="col-md-2"></div>
              <div className="col-6 col-md-3 mt-2">
              <input type="text" className='w-100 ms-3 border-0 mx-md-0 border-bottom border-1 border-secondary' name="user_flat" placeholder="Flat no " />
                </div>
                <div className="col-6  col-md-3 mt-2">
                  <input type="text" className='w-100 border-0 mx-md-0  border-bottom border-1 border-secondary' placeholder="Building" name="user_building"/>
                </div>
                <div className="col-md-2"></div>
              </div>


              <div className="row my-2 mx-auto">
              <div className="col-12 my-2 mx-auto col-md-7">
              <input type="text" className='w-100 border-0  border-bottom border-1 border-secondary' name="address1" placeholder="Address Line 1 " value={order.order_address} />
                </div>
                <div className="col-12 mx-auto my-2 col-md-7">
            <input type="text" className='w-100 border-0  border-bottom border-1 border-secondary' placeholder="Address Line 2" name="address2" value={order.order_address}/>
                </div>
              </div>

          </div>

          <div className="row my-2 mx-auto">
            <div className="col-6 mx-auto col-md-4">
                <div className="pay-text1">
                    Total
                </div>
            </div>
            <div className="col-6 mx-auto col-md-4">
                <div className="pay-text2 fw-bold">
                    &#8377;{order.totalAmount}
                </div>
            </div>
          </div>

          <div className="row my-2 mx-auto">
            <div className="col-6 mx-auto col-md-4">
                <div className="pay-text1">
                Coupon Discount
                </div>
            </div>
            <div className="col-6 mx-auto col-md-4">
                <div className="pay-text2 fw-bold " style={{color: 'red'}}>
                   Rs : {order.coupon_discount}.00
                </div>
            </div>
          </div>

          <div className="row my-2 mx-auto">
            <div className="col-6 mx-auto col-md-4" >
                <div className="pay-text1">
                    Net Payable
                </div>
            </div>
            <div className="col-6 mx-auto col-md-4">
                <div className="pay-text2 fw-bold " style={{color: 'green'}}>
                Rs : {order.finalAmount}.00
                </div>
            </div>
          </div>

          <div className="row ms-5 my-2">
                  <div className="col-4 fw-bold">
                    <label>
                      <input type="radio" name="payment" value="wallet"  onChange={(e) => setPaymentMethod(e.target.value)} /> Wallet
                    </label>
                  </div>
                  <div className="col-4 fw-bold">
                    <label>
                      <input type="radio" name="payment" value="online" onChange={(e) => setPaymentMethod(e.target.value)} /> Online
                    </label>
                  </div>
                </div>

            <div className="row bottom-fixed">
            <div className="col-11 my-2 col-md-5 mx-auto pe-0">
                <button className="text-center border-0 placed-order w-100 py-2 text-white"  onClick={()=>{
                      if (paymentMethod === "wallet") {
                        handlePayment(order.avail_balance);
                      } else if (paymentMethod === "online") {
                        handleRazorpayPayment();
                      }
                }}>PAY NOW</button>
              </div>
            </div>
        
        </div>
        </>
    )


}

export default PaymentConfirmation;