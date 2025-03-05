import React, {useState} from "react";
import "./Pricing.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Pricing=()=>{

    const [plan, setPlan] = useState('monthly');

    const PricingData={
        silver: {monthly: `${String.fromCharCode(8377)}199`, annual: `${String.fromCharCode(8377)}999` },
        golden: {monthly: `${String.fromCharCode(8377)}299`, annual: `${String.fromCharCode(8377)}1999`},
        platinum: {monthly: `${String.fromCharCode(8377)}499`, annual: `${String.fromCharCode(8377)}2999`}
    }



    return(
        <>
        <div className="container-fluid  overflow-hidden p-0">

            <div className="row">
                <h2 className="aboutcontent fw-bold text-center mt-5">PRICING AND PLANS</h2>
                <p className="aboutcontent opacity-75 text-center">Flexible, transparent pricing that adapts to your needs</p>
            </div>
                
         <div className="row py-5 bgimg ">
            <div className="container">
                
                <div className=" d-flex justify-content-center  py-4">
         <div class="form-check ">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={plan === 'monthly'} onChange={()=> setPlan('monthly')}/>
  <label class="form-check-label  pe-4" for="flexRadioDefault1">
    Monthly
  </label>
</div>
<div class="form-check">
  <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={plan === 'annual'} onChange={()=> setPlan('annual')} />
  <label class="form-check-label  " for="flexRadioDefault2">
    Annual
  </label>
</div>
         </div>
         <div className="row justify-content-center container mx-auto">
                    <div className="col pricesection p-5 mx-2 rounded-5">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-4 pt-2">
                                    <img className="bg-info p-2 rounded-3" src="https://wcardcdn.b-cdn.net/assets/img/landing/saas-1/pricing/starter.svg" alt="svgimg"/>
                                    </div>
                                    <div className="col-8">
                                    <h4 className="mb-0">Silver</h4>
                                    <span className="h2 mb-0">{PricingData.silver[plan]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 wfont2 text-secondary">
                            1 User
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-12 ">
                            <p>For individuals with basic customizations.  </p> 
                            </div>
                        </div>
                        <div className="row my-2 ">
                            <div className="col-12 ">
                            <button className="btn px-4 py-1 btn-outline-success" type="submit">
              Signup for Free
            </button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 py-2">
                                <h5>No Credit Card Required!</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 ">
                               <ul className=" ms-3" style={{listStyle: "square"}}>
                                <li className="wfont2 py-1">Digital Business Card for yourself</li>
                                <li className="wfont2 py-1">Basic customizations</li>
                                <li className="wfont2 py-1">wCard Branding</li>
                                <li className="wfont2 py-1">Include a profile image</li>
                                <li className="wfont2 py-1">Include a cover image</li>
                                <li className="wfont2 py-1">Add Education and Experience Tabs</li>
                                <li className="wfont2 py-1">Add Contact Form</li>
                                

                               </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col pricesection border border-success p-5 mx-2 rounded-5">
                    <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-4 pt-2">
                                    <img className="bg-info p-2 rounded-3" src="https://wcardcdn.b-cdn.net/assets/img/landing/saas-1/pricing/starter.svg" alt="svgimg"/>
                                    </div>
                                    <div className="col-8">
                                    <h4 className="mb-0">Golden</h4>
                                    <span className="h3 mb-0">{PricingData.golden[plan]} <small className="h6 text-secondary">{plan==='monthly' ? 'per month' : 'per year'}</small></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 wfont2 text-secondary">
                            1 User
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-12 ">
                            <p>For individuals with basic customizations.  </p> 
                            </div>
                        </div>
                        <div className="row my-2 ">
                            <div className="col-12 ">
                            <button className="btn px-4 py-1 btn-outline-success" type="submit">
              Signup for Free
            </button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 py-2">
                                <h5>No Credit Card Required!</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 ">
                               <ul className=" ms-3" style={{listStyle: "square"}}> 
                                <li className="wfont2 py-1">Digital Business Card for yourself</li>
                                <li className="wfont2 py-1">Basic customizations</li>
                                <li className="wfont2 py-1">wCard Branding</li>
                                <li className="wfont2 py-1">Include a profile image</li>
                                <li className="wfont2 py-1">Include a cover image</li>
                                <li className="wfont2 py-1">Add Education and Experience Tabs</li>
                                <li className="wfont2 py-1">Add Contact Form</li>
                                

                               </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col pricesection  p-5 mx-2  rounded-5">
                    <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-4 pt-2">
                                    <img className="bg-info p-2 rounded-3" src="https://wcardcdn.b-cdn.net/assets/img/landing/saas-1/pricing/starter.svg" alt="svgimg"/>
                                    </div>
                                    <div className="col-8">
                                    <h4 className="mb-0">Platinum</h4>
                                    <span className="h3 mb-0">{PricingData.platinum[plan]} <small className="h6 text-secondary">{plan==='monthly' ? 'per month' : 'per year'}</small></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 wfont2 text-secondary">
                            1 User
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-12 ">
                            <p>For individuals with basic customizations.  </p> 
                            </div>
                        </div>
                        <div className="row my-2 ">
                            <div className="col-12 ">
                            <button className="btn px-4 py-1 btn-outline-success" type="submit">
              Signup for Free
            </button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 py-2">
                                <h5>No Credit Card Required!</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 ">
                               <ul className=" ms-3" style={{listStyle: "square"}}>
                                <li className="wfont2 py-1">Digital Business Card for yourself</li>
                                <li className="wfont2 py-1">Basic customizations</li>
                                <li className="wfont2 py-1">wCard Branding</li>
                                <li className="wfont2 py-1">Include a profile image</li>
                                <li className="wfont2 py-1">Include a cover image</li>
                                <li className="wfont2 py-1">Add Education and Experience Tabs</li>
                                <li className="wfont2 py-1">Add Contact Form</li>
                                

                               </ul>
                            </div>
                        </div>
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
export default Pricing;