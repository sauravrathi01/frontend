import React, {useEffect, useState} from "react"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./profile.css";
// import "./Offer.css";

const Offers=({userId})=>{
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [baseUrl, setBaseUrl] = useState('');

    
    const decodeHTML = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, "").trim(); 
    };
  
    const trimText =(text, limit) =>{
        return text.length > limit ? text.substring(0, limit) : text
      }

    const fetchItems = async()=>{
        try{
            const userId = localStorage.getItem("user_id");
            const response = await axios.post("https://mrcartonline.com/kitty/index.php/User/getOffersList",
            {user_id: userId, records: 10},
            {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
            );
            if(response.data?.status){
                setItems(response.data.data);
                setBaseUrl(response.data.message);
                
            }else{
                console.log("Noo products found");
            }
        } catch(error){
            console.error('Error fetching data', error);
        }
    }


    useEffect(()=>{
        fetchItems();
    }, []);


    return(
        <>
        <div className="container-fluid">
        <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left" style={{cursor: 'pointer'}}></i></h5>
                </div>
                <div className="col-10">Offers </div>
         </div>
        



<div className="container-fluid mt-5">
    
            <div className="row justify-content-center">
                    {items.map((item, index)=>(
                       
                        <Link className="text-decoration-none p-1 bg-white col-6 col-md-4 my-2 border border-2 mx-auto col-lg-3 text-dark"  to={`/product-details/${item.product_id}?mcn=${item.category_name}&bn=${item.brand_name}&ci=${item.category_id}&bi=${item.brand_id}`}>
                        <div key={index} className="card my-1 border-0 " >
                       <div className="image-container my-0">
                       <img src={`${baseUrl}${item.product_image}`} 
                                alt={item.product_name}
                                className="offer-img mx-auto rounded-0 card-img-top " />
                       </div>
                        <div class="card-body px-0 ">
                            <div class="card-title offer-text1">{item.product_name}</div>
                            <div class="card-text offer-text2">{trimText(decodeHTML(item.description), 58)}</div>
                           
                        </div>
                        </div>
                        </Link>
              ) )} </div>  
</div>
        </div>
        </>
    )
}

export default Offers;