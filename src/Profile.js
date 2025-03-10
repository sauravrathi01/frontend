

import React, { useEffect, useState } from "react";
import axios from "axios";
import './profile.css';
import './Home.css';
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  // alert(userId);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
//   const storedUserId = localStorage.getItem("user_id");
// console.log("Stored User ID:", storedUserId);

const availBalance = Number(localStorage.getItem("avail_balance"));




const fetchList = async () => {
  try {
    // const storedUserId = localStorage.getItem("user_id");
    const storedUserId = '10000';

    if (!storedUserId) {
      console.error("No user_id found in localStorage");
      return;
    }

    // console.log("Making request with user_id:", storedUserId);

    const response = await axios.post(
      "https://mrcartonline.com/kitty/index.php/User/getUserDashboardCounts",
      new URLSearchParams({ user_id: storedUserId }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: false,
      }
    );

    // console.log("Full API Response:", response); 
    // console.log("API Response Data:", response.data);  

    if (response.data && response.data.data) {
      setUserData(response.data.data[0]);
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Status Code:", error.response.status);
    } else if (error.request) {
      console.error("Request Sent, No Response:", error.request);
    } else {
      console.error("General Error:", error);
    }
  }
};



useEffect(() => {

    fetchList();
  
}, []);

// useEffect(() => {
//   if (localStorage.getItem("user_id")) {
//     fetchList();
//   } else {
//     console.error("User ID is missing in localStorage");
//   }
// }, []);


  return(
    <>
        <div className="container-fluid p-0  pt-5 pb-4 overflow-hidden body-bg">
           <div className="bg-white rounded-2 m-2">
           <div className="row py-1 text-center">
             <div className="col-md-4 col-6">
             <h5><i class="fa-solid fa-coins text-warning"></i>
                </h5>
                {/* <h6 className="text-center">{userData?.availBalance ?? "N/A"}</h6> */}
                <h6 className="text-center">{availBalance}</h6>
                <div className="profile-text1">AVAILABLE BALANCE</div>
             </div>
             <div className="col-md-4 col-6">
             <h5><i class="fa-solid fa-coins text-warning"></i>
                </h5>
                {/* <h6 className="text-center">{userData?.availBalance ?? "N/A"}</h6> */}
                <h6 className="text-center">{userData?.availPoints ?? "N/A"}</h6>
                <div className="profile-text1">AVAILABLE POINTS</div>
             </div>
            </div>
            <div className="row py-2 justify-content-center p-3">
                <NavLink to='/subscribe-users' className="col-6 col-md-3 pe-1">
                    <button className="btn btn-text1 w-100 text-white  border rounded-0">ACTIVE</button>
                </NavLink>
                <div className="col-6 col-md-3 ps-1">
                    <button className="btn btn-text w-100 text-white border rounded-0">NEW UPDATE</button>
                </div>
            </div>
           </div>


        <div className="m-2 m-md-4">
        <div className="row mx-1 p-1 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <NavLink to="/user-profile" className="text-decoration-none text-dark col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">Personal Details</div>
            </NavLink>
            <div className="col-2"></div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
            
            <div className="row mx-1 p-1 mt-1 mt-md-2 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">Reward Points</div>
            </div>
            <div className="col-2">{userData?.availPoints ?? "N/A"}</div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
            <div className="row mx-1 p-1 mt-1 mt-md-2  bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">My Active Referrals</div>
            </div>
            <div className="col-2">{userData?.activeDirectReferral ?? "N/A"}</div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
            <div className="row mx-1 p-1 mt-1 mt-md-2  bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">My In-Active Referrals</div>
            </div>
            <div className="col-2">{userData?.inactiveDirectReferral ?? "N/A"}</div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
            <NavLink to='/orders' className="text-decoration-none text-dark row mx-1 p-1 mt-1 mt-md-2 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className=" profile-text2 ms-2" style={{cursor: 'pointer'}}>My Total Orders</div>
            </div>
            <div className="col-2">{userData?.totalOrders ?? "N/A"}</div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </NavLink>
            <div className="row mx-1 p-1 mt-1 mt-md-2 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">My Deposits</div>
            </div>
            <div className="col-2"></div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
            <div className="row mx-1 p-1 mt-1 mt-md-2 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">Total Withdraw</div>
            </div>
            <div className="col-2"></div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
            <div className="row mx-1 p-1 mt-1 mt-md-2 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">Vendor Panel</div>
            </div>
            <div className="col-2"></div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
        
           <div className="row mx-1 p-1 mt-1 mt-md-2 bg-white" onClick={()=>navigate('/change-password')}>
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">Change Password</div>
            </div>
            <div className="col-2"></div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
        

            <div className="row mx-1 p-1 mt-1 mt-md-2 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">Help</div>
            </div>
            <div className="col-2"></div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
            <div className="row mx-1 p-1 mt-1 mt-md-2 bg-white ">
            <div className="col-1">
            <i class="fa-solid fa-grip-vertical"></i>
           </div>
     
            <div className="col-8 ps-0 my-auto text-start">
           <div className="profile-text2 ms-2">Refer And Earn</div>
            </div>
            <div className="col-2"></div>
            <div className="col-1 text-end pe-0 my-auto">
       
              <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
            </div>
            </div>
        </div>
      
          
        </div>
    </>
)
}

export default Profile;