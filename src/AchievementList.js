
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Achievement.css";


const AchievementList=()=>{

    const [progress, setProgress] = useState(0);
    const totalPercentage = 100; // Change this as needed

    useEffect(() => {
        // Simulating percentage increase over time
        const interval = setInterval(() => {
            setProgress((prev) => (prev < totalPercentage ? prev + 10 : totalPercentage));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const {slot_id} = useParams();
    const [achievements, setAchievements] = useState([]);
    const [totalRecieved, setTotalRecieved] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchAchievements= async()=>{
        try{
            const response = await axios.post('https://mrcartonline.com/kitty/index.php/User/getNewAchievementList',
                {slot_id: slot_id, type_id: 0},
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            // console.log('Api response', response.data);

            if (response.data.status) {
                const data = response.data.data || []
                setAchievements(data);  

                const total = data.reduce((sum, item)=> sum + Number(item.total_business), 0);
                setTotalRecieved(total);

                const calculatedPercentage = (total * 100)/200000;
                setPercentage(calculatedPercentage.toFixed(2));
            } else {
                setError(response.data.message || "No achievement details found.");
            }
        }
       catch (error){
        console.error('Error fetching data', error.response ? error.response.data : error.message);
       }
    }

    useEffect(()=>{
        fetchAchievements();
    }, [slot_id])

    return(
        <>
         <div className="container-fluid overflow-hidden p-0">
         <div className="row fixedbg shadow pb-1 m-0">
                <div className="col-1">
                    <h5><i className="fa-solid fa-arrow-left" onClick={()=> navigate(-1)} style={{cursor: 'pointer'}}></i></h5>
                </div>
                <div className="col-10">Achievement </div>
         </div>

         <div className="mt-5">

         <div className="row">
            <div className="col-12 text-center">
            {/* <div className="progress-circle-container text-center mt-4">
                    <svg width="120" height="120">
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            stroke="#01939D"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            stroke="#4caf50"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray="314.2"
                            strokeDashoffset={(1 - percentage / 100) * 314.2}
                            strokeLinecap="round"
                            transform="rotate(-90 60 60)"
                        />
                        <text x="60" y="65" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#333">
                            {percentage}%
                        </text>
                    </svg>
                </div> */}


<div className="progress-circle-container text-center mt-4">
    <svg width="200" height="200">
        {/* Background Circle */}
        <circle
            cx="100"
            cy="100"
            r="80"   // Increased radius for a bigger circle
            stroke="#01939D"
            strokeWidth="20"  
            fill="none"
        />
        
        {/* Progress Circle */}
        <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#4caf50"
            strokeWidth="12"
            fill="none"
            strokeDasharray="502.4"  // New circumference (2 * π * 80)
            strokeDashoffset={(1 - percentage / 100) * 502.4}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
        />

        {/* Percentage Text */}
        <text x="100" y="110" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#333">
            {percentage}%
        </text>
    </svg>
</div>

            </div>
         </div>

      
         {error && <p style={{ color: "red" }}>{error}</p>}
         <div className="row">
          
                <div className="row justify-content-center mt-3 bg-light mx-2 py-1 shadow">
                    <div className="col-5 col-md-4 slotclr1 text-center">
                        <div className="reward-text1 ">TOTAL REWARD</div>
                        <h5 className="reward-text2">&#8377;200000</h5>
                    </div>
                    <div className="col-5 col-md-4 slotclr2 text-center">
                        <div className="reward-text1 ">TOTAL RECIEVED</div>
                        <h5 className="reward-text2">&#8377;{totalRecieved}.00</h5>
                    </div>
                 
                </div>
          
         </div>
         </div>
         </div>
        </>
    )
}

export default AchievementList;