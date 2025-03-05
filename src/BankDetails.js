import React, { useEffect, useState } from "react";
import './profile.css';
import './Home.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BankDetails = ({ userId }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        bank_ifsc: "",
        avail_balance: "",
        bank_acc_no: "",

    });

    useEffect(() => {
        fetchData()
    }, []); 

    // useEffect(() => {
    //     if (userData.avail_balance !== null && userData.avail_balance !== undefined) {
    //         localStorage.setItem("avail_balance", userData.avail_balance);
    //     }
    // }, [userData.avail_balance]); 

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            const response = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/getBmartUsers",
                { user_id: userId },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            // console.log("This is response"+response)

            if (response.data?.status && response.data.data.length > 0) {
                const user = response.data.data[0];
                setUserData({
                    user_id: user.user_id || "", 
                    avail_balance: user.avail_balance || "",
                         bank_ifsc: user.bank_ifsc || "",
                        avail_balance: user.avail_balance || "",
                        bank_acc_no: user.bank_acc_no || "",
                });
                localStorage.setItem("avail_balance", user.avail_balance);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="container-fluid  overflow-hidden">
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left"></i></h5>
                </div>
                <div className="col-10">Bank Details </div>
            </div>

            <div className="row mt-5 pt-5 ">
                <div className="row text-center mb-3">
                <h4 className="mb-0">&#8377;{userData.avail_balance}</h4>
                <div className="bank-text1 mt-0 pt-0 ">ACCOUNT BALANCE</div>
                </div>
               <div className="row">
               <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="BANK IFSC CODE"
                        name="user_id" value={userData.bank_ifsc} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="BANK NAME"
                        name="user_name" value={userData.bank_name} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="ACCOUNT NUMBER"
                        name="user_mobile" value={userData.bank_acc_no} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="AMOUNT"
                        name="amount" onChange={handleChange} />
                </div>
               
               </div>
            </div>

            <div className="row mx-auto my-2">
           <div className="col-6 col-md-4 px-1">
          
           <button className="btn btn-text1 w-100 py-1  text-white">WITHDRAW</button>
           </div>
           <div className="col-6 col-md-4 px-1"> 
           <button className="btn btn-text1 w-100 py-1  text-white">HISTORY </button>
           </div>
            </div>
        </div>
    );
};

export default BankDetails;
