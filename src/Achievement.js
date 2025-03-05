





import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Achievement.css";

const Achievement = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchSlots = async () => {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
            // console.error("User ID is missing");
            setError("User ID not found. Please log in again.");
            setLoading(false);
            return;
        }

        // console.log("Fetching slots for User ID:", userId);

        try {
            const response = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/getMySlots",
                { user_id: '10001' }, 
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            // console.log("API Response:", response.data);
            
            if (response.data.status) {
                setSlots(response.data.data); // Assuming the slot data is inside `data`
            } else {
                setError(response.data.message || "No data found");
            }
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchSlots();
    }, []);

    return (

       <>
<div className="container-fluid overflow-hidden p-0">
    
      

<div className="row mt-5 pt-5 justify-content-center">
  
  {slots.map((slot, index)=>{
     return  <Link to={`/achievement/${slot.slot_id}`} key={index} className="my-2 text-decoration-none border shadow py-2 mx-2 slotbg col-5 col-md-4 col-lg-3 text-center">
            <h6> <i class="fa-solid text-warning fa-circle-dollar-to-slot"></i></h6>
            <h6 className="slottext1 mb-0">SLOT ID {slot.slot_id}</h6>
            <div className="slottext2">{slot.created_at}</div>
            <p className="slottext3">Wallet</p>
        </Link>
       
    })}

</div>

<Link to="/subscribe-users" className="floating-button">
                    <i className="fa fa-plus"></i>
                </Link>

</div>
       </>
    );
};

export default Achievement;
