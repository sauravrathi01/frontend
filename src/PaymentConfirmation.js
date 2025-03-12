import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./profile.css";

const PaymentConfirmation = () => {
  const [storedUserId] = useState(localStorage.getItem("user_id"));
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    user_flat: "",
    user_building: "",
    address1: "",
    address2: "",
  })

  const handleInputChange=(e)=>{
    const {name, value} = e.target;
   setFormData((prevdata)=>({
    ...prevdata, 
    [name]: value,
   }))
    setError({
      ...error, [e.target.name] : "",
    });
  }

  const order = JSON.parse(localStorage.getItem("order")) || {};
  const availBalance = Number(localStorage.getItem("avail_balance")) || 0;
  const finalAmount = Number(order.finalAmount) || 0;



  const validateForm = () => {
    let newErrors = {};
    if (!formData.user_flat.trim()) newErrors.user_flat = "Flat number is required";
    if (!formData.user_building.trim()) newErrors.user_building = "Building name is required";
    if (!formData.address1.trim()) newErrors.address1 = "Address Line 1 is required";
    if (!formData.address2.trim()) newErrors.address2 = "Address Line 2 is required";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    if (!paymentMethod) {
      setError({
        paymentMethod: "Please select a payment method"
      });
      return;
    }
    // if (!order.order_address) {
    //   setError("All fields are required");
    //   return;
    // }
    setError("");
    

    if (paymentMethod === "wallet") {
      if (availBalance >= finalAmount) {
        let newBalance = availBalance - finalAmount;
        localStorage.setItem("avail_balance", newBalance);

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `₹${finalAmount} has been deducted from your wallet.`,
          customClass: {
            popup: "custom-swal-popup", 
        },
        });

        setPaymentMethod("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Insufficient Balance!",
          customClass: {
            popup: "custom-swal-popup", 
        },
        });
      }
    }
  };

  const handleRazorpayPayment = async () => {
  
    try {
      const options = {
        key: "rzp_live_w6fv8fQgqoPYMw",
        amount: finalAmount * 100,
        currency: "INR",
        name: order.userName || "User",
        description: "Subscription Payment",
        handler: async function (response) {
          console.log("Payment Details:", response);
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your online payment was successful!",
            customClass: {
              popup: "custom-swal-popup", 
          },
          });

          if (paymentMethod === "online") {
            let newBalance = availBalance - finalAmount;
            if (newBalance < 0) newBalance = 0;
            localStorage.setItem("avail_balance", newBalance);
          }
        },
        prefill: {
          name: order.userName || "User",
          email: order.user_email || "",
          contact: order.user_mobile || "",
        },
        notes: {
          user_id: storedUserId,
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
        customClass: {
          popup: "custom-swal-popup", 
      },
      });
    }
  };

  return (
    <>
      <div className="container-fluid overflow-hidden p-0">
        <div className="row fixedbg m-0 shadow pb-1">
          <div className="col-1">
            <Link to={-1} className="text-decoration-none text-dark">
              <h5>
                <i className="fa-solid fa-arrow-left"></i>
              </h5>
            </Link>
          </div>
          <div className="col-10">
            <h4 className="categorytext">Payment Confirmation</h4>
          </div>
        </div>
  
        <div className="row mt-5">

          <div className="col-12 text-center my-2">
            <h5>&#8377;{availBalance.toFixed(2)}</h5>
          </div>

          <div className="row justify-content-center">
            <div className="col-10 col-md-6 mt-2 ps-0 border-bottom border-1 border-secondary">
              <div className="slottext2">User Name</div>
              <h6 className="mb-0">{order.userName || "Guest"}</h6>
            </div>
          </div>

          <div className="row my-2 justify-content-between">
            <div className="col-md-2"></div>
            <div className="col-6 col-md-3 mt-2">
              <input
                type="text"
                className="w-100 ms-3 border-0 mx-md-0 border-bottom border-1 border-secondary"
                name="user_flat"
                placeholder="Flat no"
                value={formData.user_flat}
                onChange={handleInputChange}
              />
               {error.user_flat && <div className="error-text ms-3">{error.user_flat}</div>}
            </div>
            <div className="col-6 col-md-3 mt-2">
              <input
                type="text"
                className="w-100 border-0 mx-md-0 border-bottom border-1 border-secondary"
                placeholder="Building"
                name="user_building"
                value={formData.user_building}
                onChange={handleInputChange}
              />
               {error.user_building && <div className="error-text ">{error.user_building}</div>}
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row my-2 mx-auto">
            <div className="col-12 my-2 mx-auto col-md-7">
              <input
                type="text"
                className="w-100 border-0 border-bottom border-1 border-secondary"
                name="address1"
                placeholder="Address Line 1"
              value={formData.address1}
              onChange={handleInputChange}
              />
               {error.address1 && <div className="error-text">{error.address1}</div>}
            </div>
            <div className="col-12 mx-auto my-2 col-md-7">
              <input
                type="text"
                className="w-100 border-0 border-bottom border-1 border-secondary"
                placeholder="Address Line 2"
                name="address2"
                onChange={handleInputChange}
                value={formData.address2}
              />
               {error.address2 && <div className="error-text">{error.address2}</div>}
            </div>
          </div>

          <div className="row my-2 mx-auto">
            <div className="col-6 mx-auto col-md-4">
              <div className="pay-text1">Total</div>
            </div>
            <div className="col-6 mx-auto col-md-4">
              <div className="pay-text2 fw-bold">&#8377;{order.totalAmount}</div>
            </div>
          </div>

          <div className="row my-2 mx-auto">
            <div className="col-6 mx-auto col-md-4">
              <div className="pay-text1">Coupon Discount</div>
            </div>
            <div className="col-6 mx-auto col-md-4">
              <div className="pay-text2 fw-bold" style={{ color: "red" }}>
                Rs: {order.coupon_discount}.00
              </div>
            </div>
          </div>

          <div className="row my-2 mx-auto">
            <div className="col-6 mx-auto col-md-4">
              <div className="pay-text1">Net Payable</div>
            </div>
            <div className="col-6 mx-auto col-md-4">
              <div className="pay-text2 fw-bold" style={{ color: "green" }}>
                Rs: {finalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="row ms-5 my-2">
            <div className="col-4 fw-bold">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Wallet
              </label>
            </div>
            <div className="col-4 fw-bold">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Online
              </label>
            </div>
          </div>

          <div className="row bottom-fixed">
            <div className="col-11 my-2 col-md-5 mx-auto pe-0">
              <button
                className="text-center border-0 placed-order w-100 py-2 text-white"
                onClick={() => {
                  if (paymentMethod === "wallet") {
                    handlePayment();
                  } else if (paymentMethod === "online") {
                    handleRazorpayPayment();
                  }
                }}
              >
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmation;











