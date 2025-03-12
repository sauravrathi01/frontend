
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import "./Login.css";

const WithdrawHistory = () => {
  
    const [History, setHistory] = useState([]);
    const [bankIfsc, setBankIfsc] = useState("");
    const [bankAccNo, setBankAccNo] = useState("");
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();

    useEffect(()=>{
        const storedIfsc = localStorage.getItem('bank_ifsc');
        const storedAccno = localStorage.getItem('bank_acc_no');

        if(storedIfsc && storedAccno){
            setBankIfsc(storedIfsc);
            setBankAccNo(storedAccno);
        }
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await axios.post(
                "https://mrcartonline.com/kitty/index.php/User/getMyPointHistory",
                { user_id: userId },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            if (response.data?.status && response.data.data.length>0) {
             setHistory(response.data.data);
            } else {
                setError(response.data?.message);
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    useEffect(()=>{
        fetchHistory();
    }, []);


    return (
        <div className="container-fluid">
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left"></i></h5>
                </div>
                <div className="col-10">
                    <h4 className="ms-2 categorytext">Withdraw History</h4>
                </div>
            </div>

          <div className="pt-2">
            {History.map((item, index)=>(
                  <div  className="row mb-2 py-1 mt-5 bg-light shadow-sm px-md-5">
                  <div key={index} className="col-5 d-flex flex-column justify-content-between">
                      <div className="histry-text1">{item.date_time}</div>
                      <div className="histry-text2 ">{bankAccNo}</div>
                  </div>
                  <div className="col-4 d-flex me-4 flex-column justify-content-between">
                      <div className=" fw-bold text-primary"></div>
                      <div className="histry-text3 mt-auto">{bankIfsc}</div>
                  </div>
                  <div className="col-2 d-flex px-0 flex-column justify-content-between ">
                  <div className="histry-text1 text-end">ID : {item.user_id}</div>
                  <div className=" histry-text4 text-end mt-auto">{item.debit_amt}</div>
                    </div>
                  </div>
            ))}
          </div>
        </div>
    );
};

export default WithdrawHistory;






