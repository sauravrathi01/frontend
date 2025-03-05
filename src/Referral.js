import React, { useEffect, useState } from "react";
import axios from "axios";
import './profile.css';
import './Home.css';
import { useNavigate } from "react-router-dom";

const Referral =({userId})=>{
    const [items, setItems] = useState([]);
    const [expandLevels, setExpandLevels] = useState({});
    const navigate = useNavigate();

    const fetchList = async()=>{
        try{
            const response = await axios.post('https://mrcartonline.com/kitty/index.php/User/getMygeneologylevelwise',
            {user_id: userId},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if(response.data?.status){
            setItems(response.data.data || []);
        } else{
            console.log("No data recieved")
        }
        }catch(error){
            console.error('Error fetching data', error);
        }
   
    }

    const toggleLevel=(levelname)=>{
        setExpandLevels((prev)=>({
            ...prev,
            [levelname]: !prev[levelname],
        }));
    }

    useEffect(()=>{
        fetchList();
    }, [userId]);

    

    return(
        <>
            <div className="container-fluid">
                <div className="row fixedbg shadow pb-1">
                    <div className="col-1" onClick={() => navigate(-1)}>
                        <h5><i className="fa-solid fa-arrow-left"></i></h5>
                    </div>
                    <div className="col-10">
                        <h4 className="ms-2 categorytext">My Network</h4>
                    </div>
                </div>

                <div className="mt-5 pt-3">
                {items.map((item, index) => (
                    <div key={index}>
                 <div className="row mb-2 bg-light shadow-sm px-md-5" 
                    onClick={() => toggleLevel(item.levelname)} 
                    style={{ cursor: 'pointer' }}>
                    <div className="col-6">
                        <div className="level-text1">{item.levelname}</div>
                        <span className="level-text3">Total Sales </span> 
                        <span className="ms-3 level-text2"> &#8377;{item.total_business}</span>
                    </div>
                    <div className="col-4 ms-auto">
                        <div className="level-text2 fw-bold text-primary">
                            {item.total_team}
                        </div>
                        <div className="level-text3 mt-2">Team</div>
                    </div>
                    <div className="col-2 level-text2"><div className="col-2">{item.level_percent}</div></div>
                   
                    
                    </div>


                        {expandLevels[item.levelname] && (
                            <div className="row mt-2">
                                {item.userlist.map((user) => (
                                    <div className="row p-2 border-bottom " key={user.user_id}>
                                     <div className="row">
                                        <div className="col-10 level-text4">
                                            <strong>{user.user_id}: {user.user_name}</strong>
                                        </div>
                                        <div className="col-1">
                                        </div>
                                     </div>
                                     <div className="row">
                                        <div className="col-6 level-text3">
                                        Total Sales
                                        </div>
                                        <div className="col-2 level-text2">
                                        &#8377;{user.user_repurchase}
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default Referral;