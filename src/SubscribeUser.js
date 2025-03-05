
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SubscribeUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");


  const [storedUserId, setStoredUserId] = useState(localStorage.getItem("user_id"));
//   const userId = localStorage.getItem("user_id"); 
  const hasFetched = useRef(false);

  useEffect(() => {
    // console.log("🚀 Component rendered at:", new Date().toISOString());
    let isMounted = true; // Prevent state updates after unmount

    if (!storedUserId || hasFetched.current) return; // Ensure API runs only once
    hasFetched.current = true; // Mark as fetched

    const fetchUsers = async () => {
        
    
      try {
        // console.log("User ID:", storedUserId);
        
        const response = await axios.post(
          "https://mrcartonline.com/kitty/index.php/User/getBmartUsers",
          { user_id: storedUserId },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        // console.log("✅ API Response:", response.data);
        if (response.data.status) {
            const uniqueUsers = response.data.data.filter(
              (user, index, self) =>
                index === self.findIndex((u) => u.user_id === user.user_id)
            );
            setUsers(uniqueUsers);
          }
         else {
          setError(response.data.message || "No users found.");
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  

    fetchUsers();

  }, [storedUserId]);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleSlotClick = (balance) => {
    if (selectedPayment === "wallet" && balance < 999) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Insufficient Balance!",
      });
      return;
    }
  };

  const handleRazorpayPayment = async () => {
    if (!storedUserId) {
      Swal.fire({
        icon: "error",
        title: "User ID Missing",
        text: "Please log in again.",
      });
      return;
    }

    const user = users[0];

    try {
      const options = {
        key: "rzp_live_w6fv8fQgqoPYMw",
        amount: 999 * 100, // Amount in paise
        currency: "INR",
        name: user.user_name,
        description: "Subscription Payment",
        handler: async function (response) {
          // console.log("Payment Details:", response);
          
          // Step 3: Verify Payment with Backend (if required)
        },
        prefill: {
          name: user.user_name,
          email: user.user_email,
          contact: user.user_mobile,
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

  return (
    <div className="container-fluid overflow-hidden p-0">
      <div className="row fixedbg shadow pb-1 m-0">
        <div className="col-1" onClick={() => navigate(-1)}>
          <h5>
            <i className="fa-solid fa-arrow-left" style={{ cursor: "pointer" }}></i>
          </h5>
        </div>
        <div className="col-11">Subscribe Premium</div>
      </div>

      <div className="mt-5 pt-3 container">
        <div className="row">
          {users.map((user, index) => (
            <div key={index} className="col-12">
              <div className="col-12 text-center my-2">
                <h5> &#8377;{user.avail_balance}</h5>
              </div>
              <div className="row justify-content-center">
                <div className="col-10 col-md-6 my-2">
                  <div className="slottext2">Name</div>
                  <h6>{user.user_name}</h6>
                </div>
                <div className="col-10 mx-auto col-md-6 my-2">
                  <div className="slottext2">Mobile</div>
                  <h6>{user.user_mobile}</h6>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-4 mx-auto col-md-6 border border-secondary">
                  <div className="slottext4 py-1">Subscription</div>
                </div>
                <div className="col-4 mx-auto text-start border border-secondary">
                  <div className="slottext4 py-1">&#8377;999</div>
                </div>
                <div className="col-12 slottext2 ms-5 my-2 fw-bold">
                  Choose Payment Method
                </div>
                <div className="row ms-5">
                  <div className="col-4 fw-bold">
                    <label>
                      <input type="radio" name="payment" value="wallet" onChange={handlePaymentChange} /> Wallet
                    </label>
                  </div>
                  <div className="col-4 fw-bold">
                    <label>
                      <input type="radio" name="payment" value="online" onChange={handlePaymentChange} /> Online
                    </label>
                  </div>
                </div>
                <div className="row justify-content-center my-4">
                  <div className="col-5 col-md-2">
                    <button className="border-0 slot-btn1 py-1 w-100 rounded-pill" onClick={() => {
                      if (selectedPayment === "wallet") {
                        handleSlotClick(user.avail_balance);
                      } else if (selectedPayment === "online") {
                        handleRazorpayPayment();
                      }
                    }}>
                      Create Slot
                    </button>
                  </div>
                  <div className="col-5 col-md-2 mx-0 px-1">
                    <button className="border-0 slot-btn2 py-1 w-100 rounded-pill" onClick={() => navigate(-1)}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscribeUser;
