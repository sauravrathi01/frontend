import React from "react";
import "./Pricing.css";
import { NavLink } from "react-router-dom";
import team1 from "./images/1.jpg";
import team2 from "./images/10.jpg";
import team3 from "./images/2.jpg";
import team4 from "./images/3.jpg";
import team5 from "./images/4.jpg";
import team6 from "./images/7.jpg";
import { Link } from "react-router-dom";

const Partner=()=>{
    return(
        <>
        <div className="container-fluid p-0 overflow-hidden">
            <div className="teambg">
            <h1 className="teamcontent fw-bold pt-5 text-center d-none d-md-block">Leadership Team</h1>
                <h2 className="teamcontent text-center d-block d-md-none">Leadership Team</h2>
                <p className="aboutcontent opacity-75 text-center">NanoSoft Solution's leadership team has a long history of success in <br/> technology, business management, and franchising.</p>
            </div>

            <div className="row mt-5 justify-content-center">
                <div className="col-md-3">
                <div class="card" style={{ width: "18rem" }} > 
  <img src={team1} className="card-img-top" alt="team1"/>
  <div class="card-body colbg2 text-white">
    <h5 class="card-title ">Mark Potter</h5>
    <p class="card-text">President & CEO</p>
    
  </div>
</div>
                </div>
                <div className="col-md-3">
                <div class="card" style={{ width: "18rem" }}> 
  <img src={team2} className="card-img-top" alt="team1"/>
  <div class="card-body colbg2 text-white">
    <h5 class="card-title">Anna Baird</h5>
    <p class="card-text">Chief Information Officer</p>
    
  </div>
</div>
                </div>
                <div className="col-md-3">
                <div class="card" style={{ width: "18rem" }} > 
  <img src={team3} className="card-img-top" alt="team1"/>
  <div class="card-body colbg2 text-white">
    <h5 class="card-title">Gordon Hempton</h5>
    <p class="card-text">President & CEO</p>
    
  </div>
</div>
                </div>
            </div>

            <div className="row mt-5 justify-content-center">
                <div className="col-md-3">
                <div class="card" style={{ width: "18rem" }} > 
  <img src={team4} className="card-img-top" alt="team4"/>
  <div class="card-body colbg2 text-white">
    <h5 class="card-title ">Mark Potter</h5>
    <p class="card-text">President & CEO</p>
    
  </div>
</div>
                </div>
                <div className="col-md-3">
                <div class="card" style={{ width: "18rem" }}> 
  <img src={team5} className="card-img-top" alt="team5"/>
  <div class="card-body colbg2 text-white">
    <h5 class="card-title">Anna Baird</h5>
    <p class="card-text">Chief Information Officer</p>
    
  </div>
</div>
                </div>
                <div className="col-md-3">
                <div class="card" style={{ width: "18rem" }} > 
  <img src={team6} className="card-img-top" alt="team6"/>
  <div class="card-body colbg2 text-white">
    <h5 class="card-title">Gordon Hempton</h5>
    <p class="card-text">President & CEO</p>
    
  </div>
</div>
                </div>
            </div>

            <div className="row justify-content-center">
            <div className="col-12 col-md-4 mt-5">
                <NavLink to="/" className=" pb-0 text-decoration-none">
                    <h4 className="aboutcontent fw-bold ">VIPCARDS</h4>
        </NavLink>
        <p className="opacity-75 aboutcontent">NTSVIPCARDS.IN TEC-SOLVE PRIVATE LIMITED
        FLNO 13 NEELKANTH APT PLN, 21 SNO 46/3B WADGAONSHERI, Dukirkline, Pune City, Pune- 411014, Maharashtra</p>
                </div>
                
                <div className="col-5 col-md-3 mt-5">
                    <ul className="list-unstyled">
                        <li className="aboutcontent fw-bold">Company</li>
                        <li  >
                            <Link to="/about" className="text-decoration-none opacity-75 aboutcontent">About</Link>
                        </li>
                        <li  >
                            <Link to="/team" className="text-decoration-none opacity-75 aboutcontent">Leadership Team</Link>
                        </li>
                        <li  >
                            <Link to="/mission" className="text-decoration-none opacity-75 aboutcontent">IT Blogs</Link>
                        </li>
                       
                        <li  >
                            <Link to="/careers" className="text-decoration-none opacity-75 aboutcontent">Careers</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-5 col-md-3  mt-5">
                <ul className="list-unstyled">
                        <li className="aboutcontent fw-bold">IT Services</li>                    
                        <li  >
                            <Link to="/faqs" className="text-decoration-none opacity-75 aboutcontent">Help & FAQ</Link>
                        </li>
                        {/* <li  >
                            <Link to="/contactus" className="text-decoration-none opacity-75 aboutcontent">Contact Us</Link>
                        </li> */}
                       
                        <li  >
                            <Link to="/terms" className="text-decoration-none opacity-75 aboutcontent">Terms & Conditions</Link>
                        </li>
                        <li  >
                            <Link to="/privacypolicy" className="text-decoration-none opacity-75 aboutcontent">Privacy Policy </Link>
                        </li>
                        <li  >
                            <Link to="/refundpolicy" className="text-decoration-none opacity-75 aboutcontent">Refund Policy</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="my-2"/>
        <div className="row text-center pb-3">
            <div className="col-12">Copyright © 2018 NanoSoft. Designed and Developed by LineThemes Only on Envato Market.</div>
        </div>
        </div>
        </>
    )
}


export default Partner;