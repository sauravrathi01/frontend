import React, { useEffect, useState } from "react";
import './profile.css';
import './Home.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profilemain = ({ }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        user_id: "",
        user_name: "",
        user_email: "",
        user_mobile: "",
        aadhar: "",
        pan: "",
    });

    

    const fetchData = async () => {
        const userId = localStorage.getItem("user_id");
        try {
            const response = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/getBmartUsers",
                { user_id: userId },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
        //    console.log("My profile user Id: ", userId);

            if (response.data?.status && response.data.data.length > 0) {
                const user = response.data.data[0];
                setUserData({
                    user_id: user.user_id || "",
                    user_name: user.user_name.trim() || "",
                    user_email: user.user_email || "",
                    user_mobile: user.user_mobile || "",
                    aadhar: user.aadhar || "",
                    pan: user.pan || "",
                });
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

    useEffect(() => {
        fetchData()
    }, []); 

    return (
        <div className="container-fluid">
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left"></i></h5>
                </div>
                <div className="col-10">
                    <h4 className="ms-2 categorytext">My Profile</h4>
                </div>
            </div>

            <div className="row mt-5 pt-5 ">
                <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="Profile Code"
                        name="user_id" value={userData.user_id} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="Full Name"
                        name="user_name" value={userData.user_name} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="Mobile no"
                        name="user_mobile" value={userData.user_mobile} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="email" className="bg-white w-100" placeholder="Mail id"
                        name="user_email" value={userData.user_email} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="number" className="bg-white w-100" placeholder="Aadhar Card"
                        name="aadhar" value={userData.aadhar} onChange={handleChange} />
                </div>
                <div className="col-md-6 mx-auto my-1">
                    <input type="text" className="bg-white w-100" placeholder="Pan Card"
                        name="pan" value={userData.pan} onChange={handleChange} />
                </div>
            </div>

            <div className="row mx-auto my-2">
           <div className="col-6 col-md-4 px-1">
          
           <button className="btn btn-text1 w-100 py-1  text-white">UPDATE</button>
           </div>
           <div className="col-6 col-md-4 px-1"> 
           <button className="btn btn-text w-100 py-1  text-white">BANK SETTING </button>
           </div>
            </div>
        </div>
    );
};

export default Profilemain;
