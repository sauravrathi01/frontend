import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Header.css';
import mrlogo from "./images/mercart-logo.png";
import CartSidebar from './CartSidebar';

const Header = ({ showSearch }) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const userName = localStorage.getItem('user_name');
  const userPhone = localStorage.getItem('user_mobile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_mobile");
    localStorage.removeItem("profile_img");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setCartCount(0);

    // Dispatch event to notify other components to update cart count
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/login");
  };

  const handleCloseMobileMenu = (e) => {
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.navbar-toggler')) {
      setShowMobileMenu(false);
      document.body.style.overflow = 'auto';
    }
  };

  const handleClickOutside = (e) => {
    e.stopPropagation();
    setIsCartOpen(false);
  };

  const toggleCartSidebar = (e) => {
    e.stopPropagation();
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.getElementById('uniqueprod').addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (showMobileMenu) {
      document.addEventListener('click', handleCloseMobileMenu);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('click', handleCloseMobileMenu);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('click', handleCloseMobileMenu);
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  useEffect(() => {
    const updateCartCount = () => {
      const count = JSON.parse(localStorage.getItem("cart"))?.length || 0;
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

    return (
      <>


<nav className="navbar navbar-expand-lg py-0 d-block d-lg-none">
        <div className="container-fluid py-2 border-bottom border-dark overflow-hidden">
          <button className="navbar-toggler  border-0 text-info fw-bold" onClick={() => setShowMobileMenu(true)}>
            ☰
          </button>
          
          <h3 className="navbrand pe-2 col-4 col-md-3 ms-2 me-auto my-auto px-md-4">
            <NavLink to="/" className="navbrand text-decoration-none maintext">
            <img src={mrlogo} className='img-fluid nav-image'/>
              {/* <span className='text-info'>MR</span><span className='text-danger'>CART</span> */}
            </NavLink>
          </h3>
         
         
              

                <h6 className="col-2 text-end my-auto" onClick={toggleCartSidebar} style={{ cursor: "pointer" }}>
                  <i class="fa-solid fa-cart-shopping text-primary fs-4  position-relative"> 
                    {cartCount > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle">{cartCount}</span>}
                  </i>
                 </h6>

          {isCartOpen &&  
             <>
             <div className='cart-back' id='uniqueprod'></div>
             <div className="cart-sidebar " onClick={(e) => e.stopPropagation()}>
             <CartSidebar onClose={() => setIsCartOpen(false)} />
           </div>
             </>
          }

          {showSearch && (
          <div className="search-bar-header2 ms-auto">
            <input className="form-control me-2 py-1" type="search" placeholder="🔍 Search" aria-label="Search" />
          </div>
        )}
        </div>
      </nav>
      
        <nav className="navbar navbar-expand-lg py-0 d-none d-lg-block">
        <div className="container-fluid py-2 border-bottom border-dark overflow-hidden">
         
          <h3
            className="navbrand pe-2 col-2 my-auto px-md-4"
            // onClick={handleToggleNavMenu}
          >
            <NavLink to="/" className="navbrand text-decoration-none maintext">
            <img src={mrlogo} className='img-fluid'/>
            </NavLink>
          </h3>
  
          {showSearch && (
          <div className="search-bar-header">
            <input className="form-control me-2" type="search" placeholder="🔍 Search" aria-label="Search" />
          </div>
        )}
         
            <ul className="navbar-nav  ms-auto mt-2 me-4 pb-2 mb-lg-0">
              <li className="nav-item mx-2 d-none d-lg-block">
                <NavLink
                  to="/aboutus"
                  className="nav-link active nav-link1 rounded-2 text-dark"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item mx-2 d-none d-md-block">
                <NavLink
                  to="/pricing"
                  className="nav-link nav-link1 rounded-3 text-dark"
                >
                  Pricing
                </NavLink>
              </li>
              <li className="nav-item mx-2 d-none d-md-block">
                <NavLink
                  to="/service"
                  className="nav-link nav-link1 rounded-2 text-dark"
                >
                  Consulting Services
                </NavLink>
              </li>
              <li className="nav-item mx-2 d-none d-md-block">
                <NavLink
                  to="/partners"
                  className="nav-link nav-link1 rounded-3 text-dark"
                >
                  Partner Program
                </NavLink>
              </li>
              <li className="nav-item mx-2 d-none d-md-block">
                <NavLink
                  to="/contactus"
                  className="nav-link nav-link1 rounded-2 text-dark"
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item mx-2 d-none d-md-block">
                <NavLink
                  to="/careers"
                  className="nav-link nav-link1 rounded-2 text-dark"
                >
                  Career
                </NavLink>
              </li>
              <li className="nav-item mx-2 d-none d-md-block">
                <NavLink
                  to="/news"
                  className="nav-link nav-link1 rounded-2 text-dark"
                >
                  News
                </NavLink>
              </li>

              <li className="nav-item mx-2 d-none d-md-block">
                <NavLink
                  to="/shoplist"
                  className="nav-link nav-link1 rounded-2 text-dark"
                >
                  Stores
                </NavLink>
              </li>
  
              {isLoggedIn ? (
                    <li className="nav-item mx-2 my-auto">
                      <NavLink  className="bg-danger text-decoration-none text-white px-2 py-1 rounded-2"  style={{ cursor: 'pointer' }} onClick={handleLogout}>
                        Logout
                      </NavLink>
                    </li>
                  ) : (
                    <li className="nav-item mx-2">
                      <NavLink to="/login" className="btn btn-primary py-1"  style={{ cursor: 'pointer' }}>
                        Signup
                      </NavLink>
                    </li>
                  )}
             
            </ul>
          </div>
  
         
      </nav>
 
{showMobileMenu && (
  <div className='mobile-menu'>
    <div className="row">
      <div className="col-10 col-md-9">
        <img src={mrlogo} className='img-fluid' />
        <h5 className="navname pt-2 mb-0">{userName}</h5>
        <p className="numfont">{userPhone}</p>
      </div>
    </div>

    <div className="row">
      {isLoggedIn ? (
      // {localStorage.getItem('token') ? (
        <>
          <NavLink to="/user-profile" className="col-12 text-decoration-none text-dark my-md-2 my-1">
            <h6 className="itemsfont"><i className="fa-regular fa-user itemsfont2"></i> Personal</h6>
          </NavLink>
          <NavLink to='/bank-details' className="col-12 text-decoration-none text-dark my-md-2 my-1">
            <h6 className="itemsfont"><i className="fa-solid fa-building-columns itemsfont2"></i> Bank Details</h6>
          </NavLink>
          <NavLink to="/profile" className="col-12 text-decoration-none text-dark my-md-2 my-1">
            <h6 className="itemsfont"><i className="fa-solid fa-user-gear itemsfont2"></i> Dashboard</h6>
          </NavLink>
          <NavLink to="/referral" className="col-12 text-decoration-none text-dark my-md-2 my-1">
            <h6 className="itemsfont"><i className="fa-solid fa-share-nodes itemsfont2"></i> Referrals</h6>
          </NavLink>
          <NavLink to="/transactions" className="col-12 my-md-2 my-1 text-decoration-none text-dark">
              <h6 className="itemsfont"><i className="fa-solid fa-file-invoice itemsfont2"></i> Transactions</h6>
            </NavLink>
           
            <div className="col-12 my-md-2 my-1 ">
              <h6 className="itemsfont"><i className="fa-brands fa-facebook itemsfont2"></i> Facebook</h6>
            </div>
            <div className="col-12 my-md-2 my-1 ">
              <h6 className="itemsfont"><i className="fa-brands fa-instagram itemsfont2"></i> Instagram</h6>
            </div>
            <div className="col-12 my-md-2 my-1 ">
              <h6 className="itemsfont"><i className="fa-solid fa-shield-halved itemsfont2"></i> Privacy Policy</h6>
            </div>
            <div className="col-12 my-md-2 my-1 ">
              <h6 className="itemsfont"><i className="fa-solid fa-sack-dollar itemsfont2"></i> Refund Policy</h6>
            </div>
            <NavLink to="/login" className="col-12 my-md-2 my-1 text-decoration-none text-dark">
              <h6 className="itemsfont"  onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-arrow-right-from-bracket itemsfont2"></i> Logout
              </h6>
            </NavLink>
          </>
        ) : (
          <NavLink to='/signup' className="col-12 my-md-2 my-1 text-decoration-none text-dark">
            <h6 className="itemsfont" style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-arrow-right-from-bracket itemsfont2"></i> Signup
            </h6>
          </NavLink>
        )}
      </div>
    </div>
  )}

      
          </>
      );
  };

  export default Header;







