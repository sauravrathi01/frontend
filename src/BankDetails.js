import React, { useEffect, useState } from "react";
import './profile.css';
import './Home.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BankDetails = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        bank_ifsc: "",
        avail_balance: 0,
        bank_acc_no: "",
        amount: "",
        bank_name: "",
        bank_address: "",
    });
    
    const [withdrawAmount, setWithdrawAmount] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            const response = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/getBmartUsers",
                { user_id: userId },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            if (response.data?.status && response.data.data.length > 0) {
                const user = response.data.data[0];
                console.log("User Data:", user);


                localStorage.setItem("bank_ifsc", user.bank_ifsc);
                localStorage.setItem("bank_acc_no", user.bank_acc_no);

                setUserData(prevState => ({
                    ...prevState,
                    avail_balance: user.avail_balance || 0,
                    bank_ifsc: user.bank_ifsc || "",
                    bank_acc_no: user.bank_acc_no || ""
                }));
                
                if (user.bank_ifsc) {
                    fetchBankDetails(user.bank_ifsc);
                }
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const fetchBankDetails = async (ifsc) => {
        try {
            const response = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
            if (response.data) {
                setUserData(prevState => ({
                    ...prevState,
                    bank_name: response.data.BANK || "",
                    bank_address: response.data.ADDRESS || ""
                }));
            }
        } catch (error) {
            console.error("Invalid IFSC Code", error);
        }
    };

    const handleWithdraw = () => {
        const amountToWithdraw = parseFloat(withdrawAmount);
        if (!amountToWithdraw || amountToWithdraw <= 0) {
            Swal.fire({
                icon: "error", 
                title: "Invalid Amount",
                html: '<p class="swal-text">Please enter a valid withdrawal amount.</p>',
               customClass: {
                popup: "custom-swal-popup", 
            }, });
            return;
        }

        if (amountToWithdraw < 5000) {
            Swal.fire({
                icon: "error",
                html: "The minimum withdrawal amount is ₹5000.",
                confirmButtonColor: "#ff5722",
                customClass: {
                    popup: "custom-swal-popup", 
                },
            });
            return;
        }

        if (amountToWithdraw > userData.avail_balance) {
            Swal.fire(
                { 
                    icon: "error",
                     title: "Insufficient Balance",
                     html: "You do not have enough balance to withdraw this amount.",
                     customClass: {
                        popup: "custom-swal-popup", 
                    },
                     }
            );
            return;
        }

        const updatedBalance = userData.avail_balance - amountToWithdraw;
        setUserData(prevState => ({ ...prevState, avail_balance: updatedBalance }));
        localStorage.setItem("avail_balance", updatedBalance);
        setWithdrawAmount("");
        Swal.fire(
            {
                 icon: "success",
                 title: "Withdrawal Successful",
                 text: `You have successfully withdrawn ₹${amountToWithdraw}.`,
                    customClass: {
                         popup: "custom-swal-popup", 
                                }, })
                                return;
    };

    return (
        <div className="container-fluid overflow-hidden">
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left"></i></h5>
                </div>
                <div className="col-10">Bank Details</div>
            </div>

            <div className="row mt-5 pt-5">
                <div className="row text-center mb-3">
                    <h4 className="mb-0">₹{userData.avail_balance}</h4>
                    <div className="bank-text1 mt-0 pt-0">ACCOUNT BALANCE</div>
                </div>
                <div className="row">
                <div className="col-md-6 mx-auto my-1">
                    <label name="bank_address" className="label-text1" readOnly>{userData.bank_address}</label>
                    </div>
                    <div className="col-md-6 mx-auto my-1">
                        <label className="label-text">BANK IFSC CODE</label>
                        <input type="text" className="bg-white w-100" value={userData.bank_ifsc} readOnly />
                    </div>
                    <div className="col-md-6 mx-auto my-1">
                        <label className="label-text">BANK NAME</label>
                        <input type="text" className="bg-white w-100" value={userData.bank_name} readOnly />
                    </div>
                 
                    <div className="col-md-6 mx-auto my-1">
                        <label className="label-text">ACCOUNT NUMBER</label>
                        <input type="text" className="bg-white w-100" value={userData.bank_acc_no} readOnly />
                    </div>
                    <div className="col-md-6 mx-auto my-1">
                        <label className="label-text">AMOUNT</label>
                        <input type="number" className="bg-white w-100" placeholder="Enter Amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="row mx-auto my-2">
                <div className="col-6 col-md-4 px-1">
                    <button className="btn btn-text1 w-100 py-1 text-white" onClick={handleWithdraw}>WITHDRAW</button>
                </div>
                <NavLink to='/withdraw-history' className="text-decoration-none text-dark col-6 col-md-4 px-1">
                    <button className="btn btn-text1 w-100 py-1 text-white">HISTORY</button>
                </NavLink>
            </div>
        </div>
    );
};

export default BankDetails;
