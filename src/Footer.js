import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = ({isLoggedIn}) => {
    useEffect(() => {
        // When Footer is mounted, add margin-bottom
        document.body.style.marginBottom = "60px";

        // Cleanup function: When Footer unmounts, remove margin-bottom
        return () => {
            document.body.style.marginBottom = "0px";
        };
    }, []);

    
    return (
        <>
            <footer className="footer d-lg-none d-block">
                <div className="container-fluid p-0 overflow-hidden">
                    <div className="d-flex justify-content-between mx-1">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "text-center text-decoration-none active" : "text-center text-decoration-none")}>
                            <div className="icon-text"><i className="fa-solid fa-house icon-style"></i></div>
                            <div className="icon-text2">Home</div>
                        </NavLink>
                        <NavLink to="/offers" className={({ isActive }) => (isActive ? "text-center text-decoration-none   active" : "text-center text-decoration-none")}>
                            <div className="icon-text"><i className="fa-solid fa-bell"></i></div>
                            <div className="icon-text2">Offers</div>
                        </NavLink>
                        {/* <NavLink to="/refer" className={({ isActive }) => (isActive ? "text-center text-decoration-none   active" : "text-center text-decoration-none")}>
                            <div className="icon-text fw-bold"><i>&#8377;</i></div>
                            <div className="icon-text2">Refer & Earn</div>
                        </NavLink> */}
                        <NavLink to="/slots" className={({ isActive }) => (isActive ? "text-center text-decoration-none active " : "text-center text-decoration-none")}>
                            <div className="icon-text"><i className="fa-solid fa-gift"></i></div>
                            <div className="icon-text2">Achievement</div>
                        </NavLink>
                        <NavLink to="/shoplist" className={({ isActive }) => (isActive ? "text-center text-decoration-none active " : "text-center text-decoration-none")}>
                            <div className="icon-text"><i class="fa-solid fa-store"></i></div>
                            <div className="icon-text2">Stores</div>
                        </NavLink>
                        {isLoggedIn && (
                            <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-center text-decoration-none active " : "text-center text-decoration-none")}>
                            <div className="icon-text"><i className="fa-solid fa-user"></i></div>
                            <div className="icon-text2">Profile</div>
                        </NavLink>
                        )}
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
