






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';
import mrlogo from "./images/mercart-logo.png";

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ user_mobile: '', user_password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const storedUserId = localStorage.getItem("user_id"); 
        if (storedUserId) {
            setIsLoggedIn(true);
            navigate("/");
        }
        const storedUserName = localStorage.getItem("userName");
        console.log(storedUserName);

        $("#loginForm").validate({
            rules: {
                user_mobile: { required: true, digits: true, minlength: 10, maxlength: 10 },
                user_password: { required: true, minlength: 6 }
            },
            messages: {
                user_mobile: { required: "Please enter your mobile number" },
                user_password: { required: "Please enter your password" }
            },
            errorClass: "error-message"
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const res = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/NewLogin",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",  // Ensure proper headers
                    },
                }
            );
            // console.log("API Response:", res.data); 

            if (res.data.status) {
                Swal.fire({
                    title: "Success!",
                    text: res.data.message || "Login successful!",
                    icon: "success",
                    confirmButtonText: "OK",
                });

                // Store user details in localStorage without token
                localStorage.setItem("user_id", res.data.data?.userId || res.data.userId);
                localStorage.setItem("user_name", res.data.data.user_name);
                localStorage.setItem("user_email", res.data.data.user_email);
                localStorage.setItem("user_mobile", res.data.data.user_mobile);
                localStorage.setItem("profile_img", res.data.data.profile_img);
                localStorage.setItem("isLoggedIn", "true");
   
                setIsLoggedIn(true); 
                navigate("/"); 
            } else {
                Swal.fire({
                    title: "Error!",
                    text: res.data.message || "Invalid credentials!",
                    icon: "error",
                    confirmButtonText: "OK",
                });

                // Remove user details from localStorage if login fails
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_email");
                localStorage.removeItem("user_mobile");
                localStorage.removeItem("profile_img");
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Something went wrong!",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center container my-5 mx-auto py-4 px-3">
                <div className='col-6 mb-4 col-lg-4 my-lg-auto'>
                     <img src={mrlogo} className='img-fluid'/>
                </div>
              <div className='col-12 col-lg-8'>
              <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
                    <div className="col-12 text-md-center">
                        <h2 className='text-primary mb-0'>Welcome</h2>
                        <h6 className='text-primary pt-0'>Sign In Your Account</h6>
                    </div>
                    <div className="row pt-3">
                        <div className="col-md-8 mx-auto">
                            <input
                                type="number"
                                className="border border-secondary border-2 ps-1 rounded-0 form-control"
                                name="user_mobile"
                                placeholder="Mobile"
                                value={formData.user_mobile}
                                onChange={handleChange}
                                id="user_mobile"
                            />
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-md-8 mx-auto">
                            <input
                                type="password"
                                className="border border-secondary border-2 ps-1 rounded-0 form-control"
                                name="user_password"
                                placeholder="Password"
                                value={formData.user_password}
                                onChange={handleChange}
                                id="user_password"
                            />
                        </div>
                    </div>

                    <div className='row justify-content-center pt-3'>
                        <div className='col-6 col-md-4 mx-0 px-1'>
                            <button type="submit" className='btn btn-primary sign-text py-0 w-100 rounded-pill' disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                        <div className='col-6 col-md-4 mx-0 px-1'>
                            <NavLink to='/signup' className='text-decoration-none'>
                                <button className='btn btn-primary sign-text py-0 w-100 rounded-pill'>
                                    Register Now
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6 '>
                            <h6>
                                <NavLink to='/' className='text-decoration-none text-dark'>
                                    <i className="fa-solid ms-md-5 ps-md-5 fa-arrow-right-from-bracket pe-1"></i> Back
                                </NavLink>
                            </h6>
                        </div>
                    </div>
                </form>
              </div>
            </div>
        </div>
    );
};

export default Login;
