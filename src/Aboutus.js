import React from "react";
// import "./About.css";
import "./About.css";
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";


const Aboutus=()=>{
    return(
        <>
       <div className="container-fluid overflow-hidden p-0 ">
            
            <div className="aboutbg">
           <div className="row text-center aboutcontent pt-5 mt-5">
           <h2>About NanoSoft</h2>
           <p >NanoSoft has pioneered IT services in New York for 30 years, consistently <br/> delivering business value with the latest technology.</p>
           </div>
            </div>


           <div className="container">
           <div className="row mt-5">
                <h2 className="col-12 aboutcontent text-center fw-bold">
                Technology solutions to help businesses <br/> and societies flourish
                </h2>
                <p className="my-3 col-12 aboutcontent text-center">NanoSoft is a privately owned IT Support and IT Services business formed in 1988. Today we’re proud <br/> to boast a strong team of IT engineers who thrive on rolling up their sleeves and solving your IT <br/> problems and meeting your business needs. We are on a mission to exceed your expectations and <br/> form a long-term, mutually beneficial relationship with you.</p>
            </div>

            <div className="mx-auto my-3 text-center">
                <button className="btn btn-outline-danger py-2 px-5 rounded-pill">Download</button>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-md-3 mx-4 text-center bg-white shadow py-3">
                    <h4>What We Do</h4>
                    <h2 className="my-4 aboutcontent"><i class="fa-solid fa-code"></i></h2>
                    <h6>Technology can be complicated, but we’ve seen it all before and can help you with any IT issue.</h6>
                    <h6 className="my-3 text-info" style={{cursor:"pointer"}}><Link to="/services"  />View Our Services <i class="fa-solid fa-arrow-right"></i></h6>
                </div>
                <div className="col-md-3 mx-4 text-center bg-white shadow py-3">
                    <h4>Who We Help?</h4>
                    <h2 className="my-4 aboutcontent"><i class="fa-solid fa-chart-pie"></i></h2>
                    <h6>Our vertical solutions expertise allows your business to streamline workflow, and increase productivity.</h6>
                    <h6 className="my-3 text-info" style={{cursor:"pointer"}}><Link to="/services"  />Industries We Serve <i class="fa-solid fa-arrow-right"></i></h6>
                </div>
                <div className="col-md-3 mx-4 text-center bg-white shadow py-3">
                    <h4>Why Choose Us</h4>
                    <h2 className="my-4 aboutcontent"><i class="fa-solid fa-user"></i></h2>
                    <h6>We have a proven process to help you move your business forward and we’re with you every step of the way.</h6>
                    <h6 className="my-3 text-info" style={{cursor:"pointer"}}><Link to="/services"  />Find Out More <i class="fa-solid fa-arrow-right"></i></h6>
                </div>
            </div>

           
           </div>
           <div className="mt-5">
                <div className="historybg">
                    <h2 className="text-center fw-bold text-white pt-5 ">Our History</h2>

                    <div className="container">
                    <div className="row mx-auto py-5 justify-content-center">
                        <div className="col-md-4 text-center text-white">
                            <h3>1988 - 1990</h3>
                        </div>
                        <div className="col-md-8 text-light">
                        <p>NanoSoft begins life as the networking division of ThemeForest. ThemeForest is a <br/> software company that was formed in November 1988 following a management <br/> buyout of LineThemes.</p>
                        </div>
                    </div>
                    <div className="row mx-auto pb-5 justify-content-center">
                        <div className="col-md-4 text-center text-white">
                            <h3>2000 - 2009</h3>
                        </div>
                        <div className="col-md-8 text-light">
                        <p>NanoSoft launches as an independent business. NanoSoft moves into our New <br/> York offices. Those offices became home for the next 20 years as the business <br/> continued to grow from strength to strength.</p>
                        </div>
                    </div>
                    <div className="row mx-auto pb-5 justify-content-center">
                        <div className="col-md-4 text-center text-white">
                            <h3>2010 - 2017</h3>
                        </div>
                        <div className="col-md-8 text-light">
                        <p>NanoSoft successfully partners with Envato, a growing provider of local Australia IT <br/> Support and IT Services to both local and overseas businesses.</p>
                        </div>
                    </div>
                    <div className="row mx-auto pb-5 justify-content-center">
                        <div className="col-md-4 text-center text-white">
                            <h3>2018 - Present</h3>
                        </div>
                        <div className="col-md-8 text-light">
                        <p>The service team at NanoSoft made it through to the final of the Service Desk <br/> Industry (SDI) Best Small Managed Service Desk Provider (MSP) awards. We are <br/> incredibly proud of the external recognition for our team, who have completed <br/> extensive training and have worked incredibly hard over an extended period to <br/> ensure we consistently meet the needs of our customers.ers with CComm IT <br/> Solutions, a UK provider of outsourced IT Services.</p>
                        </div>
                    </div>
                    </div>

                    <div className="row py-3 text-white text-center">
                        <div className="col-12">
                            <h4>Outreach by the Numbers</h4>
                        </div>
                    </div>

                    <div className="row justify-content-center pb-5">
                        <div className="col-md-2 py-2 mx-3 text-center  border border-secondary">
                                <h1 className="text-info"><i class="fa-regular fa-user"></i></h1>
                            <h2 className="text-white">200<span className="text-secondary">+</span></h2>
                                <p className="text-light">Experts across a range <br/> of specializations</p>
                        </div>

                        <div className="col-md-2 py-2  mx-3 text-center border border-secondary">
                                <h1 className="text-info"><i class="fa-solid fa-medal"></i></h1>
                                <h2 className="text-white">128</h2>
                                <p className="text-light">Episerver Certified <br/> Developers</p>
                        </div>
                        <div className="col-md-2 py-2  text-center mx-3 border border-secondary">
                                <h1 className="text-info"><i class="fa-solid fa-award"></i></h1>
                                <h2 className="text-white">45</h2>
                                <p className="text-light">Certified Microsoft <br/>  Professionals</p>
                        </div>
                        <div className="col-md-2 py-2  text-center mx-3 border border-secondary">
                                <h1 className="text-info"><i class="fa-regular fa-map"></i></h1>
                                <h2 className="text-white">30</h2>
                                <p className="text-light">So far we have offices <br/>  across 30 countries</p>
                        </div>
                        <div className="col-md-2 py-2  text-center mx-3 border border-secondary">
                                <h1 className="text-info "><i class="fa-solid fa-dollar-sign"></i></h1>
                                <h2 className="text-secondary">$<span className="text-white">15</span>M</h2>
                                <p className="text-light">$0 to $15M in revenue <br/> in under 3 years</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h5 className="col-12 text-center aboutcontent">Let’s get started</h5>
                </div>
                <h2 className="my-3 text-center fw-bold aboutcontent">Are you ready for a better, more <br/> productive business?</h2>
                <p className="text-center my-3 aboutcontent">Stop worrying about technology problems. Focus on your business.<br/>
                Let us provide the support you deserve.</p>
                <div className="col-12 text-center ">
                <button className="btn bg-danger fs-5 mt-3 radius-3 py-3 px-5  text-white fw-bold">Contact us Now</button>
                </div>

            </div>
            <div className="peoplebg"></div>
        

            <div className="row commonfooter justify-content-center">
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

export default Aboutus;