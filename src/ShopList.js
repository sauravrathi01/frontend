import React, {useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./ShopList.css";

function ShopList({}){
    const [data , setData] = useState([]);
       const [error, setError] = useState(null);
    //    const [baseUrl, setBaseUrl] = useState('');

     useEffect(() => {
         fechData();
     }, []);

     const fechData = async () => {
        try{
            const response  = await axios.get('https://mrcartonline.com/admin/get_shop_list');
            if(response.data.status){
                setData(response.data.data);
                // setBaseUrl(response.data.base_url)
            }else{
                setError(response.data.message || 'No Shop Found');
            }

        }catch(error){
            setError('error feching data');
        }
            }
            
    return(
        <>

<section className="shop_section">
  <div className="container-fluid">
    <div className="row shop_card"> 
      {data.map((item) => (
        <div key={item.id} className="col-12 col-md-6 shop_list"> 
          <div className="details">
            <h5>{item.shop_name ? item.shop_name : "-"}</h5>
            <p><b>Address : {item.shop_address ? item.shop_address : "-"}</b></p>
            <p><b>Tehasil Name : {item.tehasil_name ? item.tehasil_name : "-"}</b></p>
          </div>
          <div className="icon">
            <a href={`tel:${item.shop_contact}`}>
              <img src="https://img.icons8.com/ios-filled/50/000000/phone.png" alt="Call Icon" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        </>
    );


}
export default ShopList;