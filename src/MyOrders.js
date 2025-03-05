import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./orders.css";

const MyOrders = ()=>{
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("user_id");

    const getPaymentType=(type)=>{
       return  type === "1" ? "Wallet" : "Online";
    }

    

    const getOrderStatus=(status)=>{
        switch(status){
            case "1" :
                return "Pending";
            case "2" :
                return "Processed";
            case "3" :
                return "Reject";
            case "4" :
                return "Delivered";
            default:
                return "unknown";
        }
    };

    useEffect(()=>{
        fetchOrders();
    }, []);

    const fetchOrders = async()=>{
        try{
            const response = await axios.post('https://mrcartonline.com/kitty/index.php/User/getMyOrder',
                {user_id: "10000"},
                {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            if(response.data?.status){
                setOrders(response.data.data);
                // console.log(response.data.data);
            }else{
                console.log("Noo products found");
            }
        }
        catch(error){
            console.log('Error fetching order details', error);
        }
    }

    return(
        <>
        <div className="container-fluid overflow-hidden p-0">
        <div className="row fixedbg shadow pb-1 m-0">
        <div className="col-1" onClick={() => navigate(-1)}>
          <h5>
            <i className="fa-solid fa-arrow-left" style={{ cursor: "pointer" }}></i>
          </h5>
        </div>
        <div className="col-11">Orders</div>
      </div>

      <div className="container mt-5 pt-3">
    


{orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderno} className="row bg-light p-3 mb-3 mx-1 rounded shadow-sm">
            <div className="col-md-3">
              <strong>Order No:</strong> {order.orderno}
            </div>
            <div className="col-md-3">
              <strong>Payment Type:</strong> {getPaymentType(order.payment_type)}
            </div>
            <div className="col-md-3">
             <span> <strong>Status:</strong> {getOrderStatus(order.status)}</span>

            </div>
            <div className="col-md-2  col-5 pe-0 ms-auto">
            <button
            onClick={()=>window.open(`https://mrcartonline.com/admin/sale_invoice/${order.orderno}`, "_blank")}    className="py-1 w-100 rounded-1 order-btn order-btn border-1" >View Invoice</button>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-warning text-center">No orders found</div>
      )}

    </div>
        </div>
        </>
    )
}

export default MyOrders;