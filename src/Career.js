import React from "react";
import "./Pricing.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Career =()=>{
    return(
        <>
        <div className="container-fluid mt-5 pt-5 p-0 overflow-hidden">
            <div className="careerbg mt-5">
            <row className="careercontent aboutcontent text-center">
                <h1 className="fw-bold">Work With Us</h1>
                <p className="opacity-75">We help companies reach their full potential. Are you ready to reach yours? <br/> Come join us.</p>
            </row>
            </div>

            <div className="row">
                <h2 className="fw-bold text-center aboutcontent">Nice to Meet You</h2>
                <p className="text-center aboutcontent opacity-75">There are many IT companies in US, but none quite like NanoSoft. We’ve been around for over 30 <br/> years but you wouldn’t guess it from the energy in the place. Along the way, we have picked up plenty <br/> of awards, we currently rank 3rd in the Great Place to Work’s Best Workplaces and have been a <br/> Deloitte Best Managed Company for over 10 years.</p>
            </div>

            <div className="row py-4">
                <h2 className="fw-bold text-center aboutcontent">Current Openings</h2>
                <p className="text-center aboutcontent opacity-75">Feel fulfilled. Have fun. Help us to shape the future.</p>
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

export default Career;