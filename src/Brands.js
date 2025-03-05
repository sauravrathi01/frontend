import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import thumbnail from "./images/thumbnail.png";

const Brands = ({ limit = 12 }) => {
  const [brands, setBrands] = useState([]);
  const [baseurl, setBaseUrl] = useState('');
  // const baseUrlBrand = "https://moneyrain.in/kitty/assets/images/brand/";
  const defaultImg = "https://images.pexels.com/photos/9488235/pexels-photo-9488235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const fetchBrands = async () => {
    try {
      
      const response = await axios.post(
        "https://mrcartonline.com/kitty/index.php/User/getAllBrandList",
        new URLSearchParams({ limit }), // Sending limit instead of brand_id
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      // console.log("Brand API Response:", response.data);
      setBrands(response.data?.data || []);
      setBaseUrl(response.data.base_url);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [limit]); // Fetch brands when `limit` changes

  return (
    <div className="container-fluid body-bg">
      <div className="mx-md-5 py-3">
      <div className="row">
        <h4 className="col-12 my-2 ps-4 categorytext">Top Brands</h4>
      </div>
      <div className="row justify-content-center border rounded-4">
        {brands.length > 0 ? (
          brands.map((brand) => (
           
            <div className="col-3 col-md-2 text-center my-md-3 my-2">
               <Link className="text-decoration-none text-dark"
            to={`/sub-products/1/${brand.brand_id}?mcn=Mobiles&bn=${encodeURIComponent(brand.brand_name)}`}
            key={brand.brand_id}
          >
              {brand.brand_image ? (
                <img
                  src={`${baseurl}${brand.brand_image}`}
                  className="logoimg category-item border border-1 border-dark"
                  alt={brand.brand_name || "Brand Logo"}
                />
              ) : (
                <img src={thumbnail}  className="logoimg category-item border border-1 border-dark"
                alt={brand.brand_name || "Brand Logo"}/>
              )}
              <h6 className="logotexthome text-center fw-bold" style={{ marginTop: "5px" }}>{brand.brand_name}</h6>
              </Link>
            </div>
     
          
          ))
        ) : (
        //   <p className="text-center">No brands available</p>
        <h4 className="text-center"><i class="fa-solid fa-spinner"></i></h4>
        )}
      </div>



    </div>
    </div>
  );
};

export default Brands;
