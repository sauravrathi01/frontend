import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Login.css";

const MyProfile =()=>{
    const navigate = useNavigate();
    return(
        <>
        <div className="conatiner-fluid">
        <div className="row fixedbg shadow pb-1">
       <div className="col-1 " onClick={()=>navigate(-1)}>
       <h5><i class="fa-solid fa-arrow-left"></i></h5> </div>
       <div className="col-10"><h4 className=" ms-2 categorytext">My Profile</h4></div>
      </div>


      <div className="row mt-5 pt-5">
        <div className="col-md-8 col-12 bg-white mx-auto">
        <input className="border-0 border-bottom border-dark w-100 " placeholder="Profile Code"/>
        </div>
        <div className="col-md-8 col-10 mx-auto pt-3">
        <input className="border-0 border-bottom border-dark w-100 " placeholder="NEW PASSWORD"/>
        </div>
        <div className="col-md-8 col-10 mx-auto pt-3">
        <input className="border-0 border-bottom border-dark w-100 " placeholder="CONFIRM PASSWORD"/>
        </div>
      </div>

        </div>
        </>
    )
}
