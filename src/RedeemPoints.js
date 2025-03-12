import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import "./Login.css";
import Swal from "sweetalert2";

const RedeemPoints = () => {
    const [availPoints, setAvailPoints] = useState(0);
    const [error, setError] = useState("");
    const [enteredPoints, setEnteredPoints] = useState(""); // User input for points
    const [amount, setAmount] = useState(0); // Converted amount

    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();
    const conversionRate = 1/50;

    const fetchRedeemPoints = async () => {
        try {
            const response = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/redeemPoints",
                { user_id: userId, availPoints },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            if (response.data?.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    html: '<p class="swal-text">Points Redeemed Successfully!</p>',
                    confirmButtonColor: "#28a745",
                    customClass: {
                        popup: "custom-swal-popup", 
                    },
                });

                // Reduce the available points
                setAvailPoints((prevPoints) => prevPoints - enteredPoints);
                localStorage.setItem("availPoints", availPoints - enteredPoints);
                setAvailPoints("");
            } else {
                setError(response.data?.message || "Failed to fetch redeem points.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    useEffect(()=>{
        fetchRedeemPoints();
    });

    useEffect(() => {
        const storedPoints = localStorage.getItem("availPoints");
        if (storedPoints) {
            setAvailPoints(Number(storedPoints));
        }
    }, []);

  const handleRedeem =()=>{
    if (!enteredPoints || enteredPoints <= 5000) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input!",
            html: '<p class="swal-text">Minimum 5000 Points Required to Redeem</p>',
            confirmButtonColor: "#ff5722",
            customClass: {
                popup: "custom-swal-popup", 
            },
        }).then(()=>{
            navigate(-1);
        });
        return;
    }
  }

    // Handle input change
    const handlePointsChange = (e) => {
        let points = e.target.value;
    
        if (!/^\d*$/.test(points)) return; // Allow only numbers
        points = points === "" ? "" : Number(points); // Convert to number or keep empty
    
        if (points > availPoints) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Points",
                text: `You only have ${availPoints} points available.`,
                confirmButtonColor: "#3085d6",
                customClass: {
                    popup: "custom-swal-popup", 
                },
            });
            points = 0; 
            
        }
      
    
        setEnteredPoints(points);
        setAmount(points * conversionRate); // Convert points to Rs
    };
    

    return (
        <div className="container-fluid">
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left"></i></h5>
                </div>
                <div className="col-10">
                    <h4 className="ms-2 categorytext">Redeem Points</h4>
                </div>
            </div>

            <div className="row mt-5 pt-5">
                <div className="col-12 text-center">
                    <div>Available Points</div>
                    <div>{(availPoints - enteredPoints).toFixed(2)}</div>
                </div>  

                <div className="col-md-8 col-11 mx-auto pt-3">
                    <input 
                        className="border-0 border-bottom border-dark w-100" 
                        placeholder="Enter Points"
                        type="text"
                        value={enteredPoints}
                        onChange={handlePointsChange}
                    />
                </div>
                <div className="col-md-8 col-11 mx-auto pt-3">
                    <input 
                        className="border-0 border-bottom border-dark w-100" 
                        placeholder="Amount (Rs)"
                        type="text"
                        value={`₹ ${amount.toFixed(2)}`}
                        readOnly
                    />
                </div>
            </div>

            {/* {error && (
                <div className="row mt-3">
                    <div className="col-md-8 col-12 mx-auto text-danger text-center user-note fw-bold">
                        {error}
                    </div>
                </div>
            )} */}

            <div className="row justify-content-center pt-5">
                <div className="col-5 col-md-4 mx-0 px-1">
                    <button 
                        className="btn btn-success pass-text py-0 w-100 rounded-pill"
                        onClick={handleRedeem}
                        disabled={enteredPoints <= 0} // Disable if no points entered
                    >
                        Redeem
                    </button>
                </div>
                <div className="col-5 col-md-4 mx-0 px-1">
                    <button 
                        className="btn btn-success pass-text py-0 w-100 rounded-pill"
                        onClick={() => navigate("/")} 
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RedeemPoints;






