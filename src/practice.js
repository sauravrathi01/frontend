import { useState } from "react";
import axios from "axios";

const Practice = () => {
    const [referralCode, setReferralCode] = useState("");
    const [users, setUsers] = useState([]); // Stores multiple users if returned
    const [isReferralValid, setIsReferralValid] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "refer_user_id") {
            setReferralCode(value);
            setIsReferralValid(null);
            setUsers([]); // Reset user list when input changes
            setErrorMessage(""); // Clear previous error
        }
    };

    const checkReferralCode = async () => {
        if (!referralCode.trim()) {
            setErrorMessage("Please enter a referral mobile number.");
            return;
        }

        try {
            console.log("Sending request with user_mobile:", referralCode);
            const res = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/getUserDetailbyMobile",
                { user_mobile: referralCode },
                {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            console.log("API Response:", res.data.data);

            if (res.data?.status && Array.isArray(res.data.data) && res.data.data.length > 0) {
                setUsers(res.data.data);
                setIsReferralValid(true);
                setErrorMessage("");
            } else {
                console.warn("Invalid Referral Code", res.data);
                setUsers([]);
                setIsReferralValid(false);
                setErrorMessage("Invalid referral code. Please enter a valid one.");
            }
        } catch (error) {
            console.error("API Error:", error);
            setUsers([]);
            setIsReferralValid(false);
            setErrorMessage("Failed to verify referral code. Try again later.");
        }
    };

    return (
        <div>
            {/* Referral Input */}
            <div className="row pt-3 pt-md-4">
                <div className="col-md-8 mx-auto">
                    <input
                        type="text"
                        className="w-100 border-0 border-bottom border-1 border-secondary"
                        name="refer_user_id"
                        placeholder="REFERRAL MOBILE NO"
                        value={referralCode}
                        onChange={handleChange}
                        onKeyUp={checkReferralCode} 
                        id="refer_user_id"
                    />
                </div>
            </div>

            {/* Display User Names Dynamically */}
            {isReferralValid && users.length > 0 ? (
                users.map((user, index) => (
                    <div className="row pt-3 pt-md-4" key={index}>
                        <div className="col-md-8 mx-auto">
                            <input
                                type="text"
                                className="w-100 border-0 border-bottom border-1 border-secondary"
                                name="user_name"
                                placeholder="USER NAME"
                                value={user.user_name || "No Name Available"} // Handle missing name
                                id={`user_name_${index}`}
                                readOnly
                            />
                        </div>
                    </div>
                ))
            ) : null}

            {/* Error Message (If Referral Code is Invalid) */}
            {errorMessage && (
                <div className="row pt-2">
                    <div className="col-md-8 mx-auto">
                        <p className="text-danger">{errorMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Practice;
