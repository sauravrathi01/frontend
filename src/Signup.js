                                                                
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import mrlogo from "./images/mercart-logo.png";

import $ from 'jquery';
import 'jquery-validation';
import './Login.css';

const Signup = () => {
    const [referralCode, setReferralCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_mobile: '',
        refer_user_id: '',
        district_code: '',
        sub_district_code: '',
        village_code: ''
    });
    const [isReferralValid, setIsReferralValid] = useState(null);
    // const [errorMessage, setErrorMessage] = useState("");
    // const [stateId, setStateId] = useState('');
    const [districts, setDistricts] = useState([]);
    const [subDistricts, setSubDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [villages,setVillages] = useState([]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
    const navigate = useNavigate();

   

    useEffect(() => {
        $('#signupForm').validate({
            rules: {
                user_name: { required: true, minlength: 3 },
                user_email: { required: true, email: true },
                user_password: { required: true, minlength: 6 },
                user_mobile: { required: true, digits: true, minlength: 10, maxlength: 10 },
                refer_user_id: {required: true, digits: true, minlength: 10, maxlength: 10 }
            },
            messages: {
                user_name: { required: 'Please enter your name', minlength: 'At least 3 characters' },
                user_email: { required: 'Please enter your email', email: 'Enter a valid email' },
                user_password: { required: 'Please enter a password', minlength: 'At least 6 characters' },
                user_mobile: { required: 'Please enter your mobile number', digits: 'Only numbers allowed', minlength: 'Must be 10 digits', maxlength: 'Must be 10 digits' },
                refer_user_id: { required: 'Please enter your referral mobile', digits: 'Only numbers allowed', minlength: 'Must be 10 digits', maxlength: 'Must be 10 digits' },
            },
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(value);
        if (name === "refer_user_id") {
            setReferralCode(value);
            setIsReferralValid(null);
            setUsers([]); // Reset user list when input changes
 
        }
    };
 

    useEffect(()=>{
        fetchDistricts();
    }, []);

   useEffect(()=>{
    if(selectedDistrict){
        fetchSubDistricts(selectedDistrict);
    }
   }, [selectedDistrict]);
   
   useEffect(()=>{
    if(selectedSubDistrict){
        fetchVillage(selectedSubDistrict);
    }
   }, [selectedSubDistrict])

   const checkReferralCode = async () => {
    if (!referralCode.trim()) {
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
            // setErrorMessage("");
        } else {
            console.warn("Invalid Referral Code", res.data);
            setUsers([]);
            setIsReferralValid(false);
            // setErrorMessage("Invalid referral code.");
        }
    } catch (error) {
        console.error("API Error:", error);
        setUsers([]);
        setIsReferralValid(false);
        // setErrorMessage("Failed to verify referral code. Try again later.");
    }
};



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const res = await axios.post('https://mrcartonline.com/kitty/index.php/User/member_registration', formData);
  
    
            if (res.data?.status) {
                await Swal.fire({
                    title: 'Success!',
                    text: res.data.message || 'Signup successful!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
             
                // console.log(res.data);
                localStorage.setItem('userId', res.data.userId);
                // localStorage.setItem('userName', res.data.userName);
                navigate('/login');
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: res.data.message || 'Signup failed! Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            // console.error('Signup Error:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'OK',    
            });
        } finally {
            setLoading(false);
        }
    };


    const fetchDistricts = async ()=>{
        try{
            const response = await axios.post('https://mrcartonline.com/kitty/index.php/User/getDistrictList',
                {state_id: "27"},
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            if(response.data.status){
                setDistricts(response.data.data);
                
            }else{
                console.log('Invalid data');
            }
        }catch(error){
            console.error('Error fetching districts', error);
        }
    }

    const fetchSubDistricts = async (districtId)=>{
        try{
            const response = await axios.post('https://mrcartonline.com/kitty/index.php/User/getSubDistrictList',
                {district_id: districtId},
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            if(response.data.status){
                setSubDistricts(response.data.data);
                // console.log(response.data);
            }else{
                console.log('Invalid data');
            }
        }catch(error){
            console.error('Error fetching subdistricts', error);
        }
    }

    const fetchVillage = async(subDistrictId)=>{
        try{
            const response = await axios.post('https://mrcartonline.com/kitty/index.php/User/getVillageList',
                {sub_district_id: subDistrictId},
                {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            if(response.data.status){
                setVillages(response.data.data)
                // console.log(response.data);
            }
        }
        catch(error){
            console.log('Error feteching villages', error);
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center container   mx-auto py-4 px-3'>
                 <div className='col-6 mb-4 col-lg-4 my-lg-auto'>
                      <img src={mrlogo} className='img-fluid'/>
                 </div>
              <div className='col-12 col-lg-8'>
              <form id="signupForm" className='auth-form' onSubmit={handleSubmit}>
                    <div className='col-12 mt-2 text-center'>
                    <h5 className='d-md-block d-none'>New Registration</h5>
                    <h6 className='d-block d-md-none'>New Registration</h6>
                    </div>
                    <div className='row pt-2 pt-md-3'>
                        <div className='col-md-8 mx-auto '>
                            {/* <h6><label htmlFor="username" className="form-label mb-0">Name*</label></h6> */}
                            <input type="text" className='w-100 border-0 border-bottom border-1 border-secondary' name="user_name" placeholder="NAME" value={formData.user_name} onChange={handleChange} id='username' required />
                        </div>
                    </div>
                    <div className='row pt-3 pt-md-4'>
                        <div className='col-md-8 mx-auto'>
                            <input type="number" className='w-100 border-0 border-bottom border-1 border-secondary' name="user_mobile" placeholder="MOBILE" value={formData.user_mobile} onChange={handleChange} id='user_mobile' required />
                        </div>
                        {/* <div className='col-md-8 mx-auto d-none'>
                            <input type="text" className='w-100 border-0 border-bottom border-1 border-secondary' name="user_name" placeholder="USER NAME" value={formData.user_name} id='user_name' disabled />
                        </div> */}
                    </div>
                    <div className='row pt-3 pt-md-4'>
                        <div className='col-md-8 mx-auto'>
                            {/* <h6><label htmlFor="user_password" className="form-label mb-0">Password*</label></h6> */}
                            <input type="password" className='w-100 border-0 border-bottom border-1 border-secondary' name="user_password" placeholder="PASSWORD" value={formData.user_password} onChange={handleChange} id='user_password' required />
                        </div>
                    </div>
                    <div className='row pt-3 pt-md-4'>
                        <div className='col-md-8 mx-auto'>
                            {/* <h6><label htmlFor="inputEmail1" className="form-label mb-0">Email*</label></h6> */}
                            <input type="email" className='w-100 border-0 border-bottom border-1 border-secondary' name="user_email" placeholder="EMAIL" value={formData.user_email} onChange={handleChange} id='inputEmail1' required />
                        </div>
                    </div>
                   
                 
                    <div className='row pt-3 pt-md-4'>
                       
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
                    {/* {errorMessage && (
                                <div className="row pt-2">
                                    <div className="col-md-8 mx-auto">
                                        <p className="text-danger">{errorMessage}</p>
                                    </div>
                                </div>
                   )} */}

                    {isReferralValid && users.length > 0 ? (
                users.map((user, index) => (
                    <div className="row pt-3 pt-md-4" key={index}>
                        <div className="col-md-8 mx-auto">
                            <input
                                type="text"
                                className="w-100 border-0 border-bottom border-1 border-secondary"
                                name="user_name"
                                placeholder="USER NAME"
                                value={user.user_name || ""} 
                                id={`user_name_${index}`}
                                readOnly
                            />
                        </div>
                    </div>
                ))
            ) :     <div className="row pt-3 pt-md-4">
            <div className="col-md-8 mx-auto">
                <input
                    type="text"
                    className="w-100 border-0 border-bottom border-1 border-secondary"
                    name="user_name"
                    placeholder="REFERRAL NAME"
                    value=""
                    id="user_name_initial"
                    readOnly
                />
            </div>
        </div>
    }

                


                 

                    <div className='row pt-3 pt-md-4'>
                        <div className='col-md-8 mx-auto'>
                          
                           <select className="form-select w-100 rounded-0 ps-0 border-0 border-bottom border-1 border-secondary"
                           name='district_code'
                            onChange={(e) =>{
                                const districtId = e.target.value;
                                setSelectedDistrict(districtId);
                                setFormData((prev)=>({...prev, district_code: districtId, sub_district_code: '', village_code: ''}))
                            }} aria-label="Select District">
                              <option value="">Select District</option>
                              {districts.map((district, index)=>(
                                <option key={index} value={district.id}>{district.name}</option>
                              ))}     
                           </select>
                        </div>
                    </div>

                    <div className='row pt-3 pt-md-4'>
                        <div className='col-md-8 mx-auto'>
                          
                           <select class="form-select w-100 rounded-0 ps-0 border-0 border-bottom border-1 border-secondary"
                           name='sub_district_code'
                           onChange={(e)=>{
                            const subDistrictId = e.target.value;
                            setSelectedSubDistrict(subDistrictId)
                            setFormData((prev)=>({...prev,  sub_district_code: subDistrictId, village_code: ''}))
                           }} aria-label="Default select example">
                                    <option value="">Select Tehasil</option>
                                   {subDistricts.map((subdistrict, index)=>(
                                    <option key={index} value={subdistrict.id}>{subdistrict.name}</option>
                                   ))}
                           </select>
                        </div>
                    </div>

                    <div className='row pt-3 pt-md-4'>
                        <div className='col-md-8 mx-auto'>
                           <select class="form-select w-100 rounded-0 ps-0 border-0 border-bottom border-1 border-secondary"
                           name='village_code'
                           onChange={(e)=>{
                            setFormData((prev)=>({...prev, village_code: e.target.value}));
                           }} aria-label="Default select example">
                                    <option value="">Select Village</option>
                                   {villages.map((village, index)=>(
                                     <option key={index} value={village.id}>{village.name}</option>
                                   ))}
                           </select>
                        </div>
                    </div>

                    <div className='user-note py-2 text-center'>Already a user? <NavLink to='/login' >Login</NavLink></div>
                    <div className='row justify-content-center '>
                        <div className='col-6 col-md-4 mx-0 px-1'>
                            <button type="submit" className='btn btn-primary sign-text py-0 w-100 rounded-pill' disabled={loading}>
                                {loading ? 'Signing up...' : 'SUBMIT'}
                            </button>
                        </div>
                        <div className='col-6 col-md-4 mx-0 px-1'>
                           <NavLink to='/' className='text-decoration-none'>
                           <button className='btn btn-primary sign-text py-0 w-100 rounded-pill' >
                                BACK
                            </button>
                           </NavLink>
                        </div>
                    </div>
                  
                </form>
              </div>
            </div>
        </div>
    );
};

export default Signup;

