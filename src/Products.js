import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Home.css';
import thumbnail from "./images/thumbnail.png";

const Products = () => {
    const { categoryId, title} = useParams();
    const [products, setProducts] = useState([]);
    const [baseUrl, setBaseUrl] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const getData = async () => {
        try {
          const response = await axios.post( "https://mrcartonline.com/kitty/index.php/User/getBrandListOfCategory",
            new URLSearchParams({ category_id: categoryId }), 
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (response.data.status) {
            setProducts(response.data.data);
            setBaseUrl(response.data.message);
          } else {
            console.error("API Error:", response.data.message);
            setError(response.data.message || "Unknown error occurred.");
          }
        } catch (error) {
          console.error("API Error:", error.message);
          setError(error.message || "Failed to fetch data.");
        }
      };
      
    
      useEffect(() => {
       
        if (categoryId) {
          getData();
        }
      }, [categoryId]);

      

  return (
    <div className="container-fluid">
      <div className="row fixedbg shadow pb-1">
        <div className="col-1"><Link to={'/'}>
       <h5 className="text-dark"><i class="fa-solid fa-arrow-left"></i></h5>
       </Link>  </div>
       <div className="col-10"> <h4 className=" ms-2 categorytext">{title}</h4></div>
       
      </div>
      <div className="row mt-5 pt-3 pt-md-5 justify-content-center ">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Link className="text-decoration-none col-md-6 text-dark" to={`/sub-products/${categoryId}/${product.brand_id}?mcn=${title}&bn=${product.brand_name}`}>
          
             <div
              className="col-12 text-center rounded-3 my-md-3 my-1 border border-2 shadow py-2 py-md-3"
              key={product.brand_id}>
              <div className="row">
              <div className="col-3">
              {product.brand_image ? (
                <img
                  src={`${baseUrl}${product.brand_image}`}
                  alt={product.brand_name}
                  className="logoimg p-1"
                 
                />
              ) : (
                <img src={thumbnail}  className="logoimg p-1"/>
              )}
              </div>
              <div className="col-6 ps-0 my-auto text-start">
              <h6 className="logotext1 fw-bold mb-0">{product.brand_name}</h6>
              </div>
              <div className="col-1"></div>
              <div className="col-1 text-end pe-0 my-auto">
         
                {/* <h6 ><i class="fa-solid iconbg fa-greater-than logotext"></i></h6> */}
                <h6><i class="fa-regular fa-circle-right logotext"></i></h6>
              </div>
              </div>
        
           </div>
           </Link>
          ))
        ) : (
        //   <p>No products available for this category</p>
        <h4 className="text-center mt-5"><i class="fa-solid fa-spinner"></i></h4>
        )}
      </div>
    </div>
  );
};

export default Products;
