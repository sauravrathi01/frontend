


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import "./Login.css";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 

    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        setError(""); 
        setSuccess("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("old_password", oldPassword);
        formData.append("new_password", newPassword);

        try {
            const response = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/change_password",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("API Response:", response.data);

            if (response.data?.status === "success") {
                setSuccess(response.data?.message || "Password changed successfully!");
                setOldPassword(""); 
                setNewPassword("");
                setConfirmPassword("");

               
            } else {
                setError(response.data?.message || "Failed to change password.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("An error occurred. Please try again.");
        }

        setOldPassword(""); 
    setNewPassword("");
    setConfirmPassword("");
    };

    return (
        <div className="container-fluid">
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left"></i></h5>
                </div>
                <div className="col-10">
                    <h4 className="ms-2 categorytext">Change Password</h4>
                </div>
            </div>

            <div className="row mt-5 pt-5">
                <div className="col-md-8 col-10 mx-auto">
                    <input 
                        className="border-0 border-bottom border-dark w-100" 
                        placeholder="OLD PASSWORD"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>  
                <div className="col-md-8 col-10 mx-auto pt-3">
                    <input 
                        className="border-0 border-bottom border-dark w-100" 
                        placeholder="NEW PASSWORD"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-8 col-10 mx-auto pt-3">
                    <input 
                        className="border-0 border-bottom border-dark w-100" 
                        placeholder="CONFIRM PASSWORD"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            {success && (
                <div className="row mt-3">
                    <div className="col-md-8 col-12 mx-auto text-success text-center text-dark fw-bold">
                        {success}
                    </div>
                </div>
            )}

         
            {error && (
                <div className="row mt-3">
                    <div className="col-md-8 col-12 mx-auto text-center text-dark fw-bold">
                        {error}
                    </div>
                </div>
            )}

            <div className="row justify-content-center pt-5">
                <div className="col-5 col-md-4 mx-0 px-1">
                    <button 
                        className="btn btn-success pass-text py-0 w-100 rounded-pill"
                        onClick={handleChangePassword}
                    >
                        Set Password
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

export default ChangePassword;
