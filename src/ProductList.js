



import React, { useState, useEffect } from "react";
import { useParams, Link,useSearchParams } from "react-router-dom";
import axios from "axios";
import './Home.css';

const ProductList = () => {
    const { categoryId, brandId} = useParams();
    const [searchParams]=useSearchParams();
     const mcn=searchParams.get('mcn');
     const bn=searchParams.get('bn');
    const [productsList, setProductList] = useState([]);
    const [error, setError] = useState("");
    const baseUrl = "https://mrcartonline.com/admin/assets/product/";

    // Fetch products by category ID
    const getList = async () => {
        try {

            const requestBody = new URLSearchParams({ category_id: categoryId, brand_id:brandId });
            // console.log("Request Body:", requestBody.toString());

            const response = await axios.post(
                'https://mrcartonline.com/kitty/index.php/User/getProductListbyBrandCategory',
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                }
            );

            // console.log("API Response:", response.data);

            if (response.data && response.data.status) {
                setProductList(response.data.data);
            } else {
                setError(response.data.message || "No products found");
            }
        } catch (error) {
            console.error("API Fetch Error:", error);
            setError("Failed to fetch product data. Please try again.");
        }
    };

    useEffect(() => {
        if (!categoryId && !brandId) {
            setError("Invalid category ID");
            return;
        }else{
            getList();
        }
       
    },[brandId]);

   
    
    const decodeHTML = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, "").trim(); 
    };
  
  const trimText =(text, limit) =>{
    return text.length > limit ? text.substring(0, limit) : text
  }

    return (
        <div className="container-fluid">
             <div className="row fixedbg shadow pb-1">
       <div className="col-1 "><Link className="text-dark" to={`/products/${categoryId}/${mcn}`}> 
       <h5><i class="fa-solid fa-arrow-left"></i></h5></Link>  </div>
       <div className="col-11"><h4 className=" ms-2 categorytext">{bn}</h4></div>
      </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="row mt-5">
    {Array.isArray(productsList) && productsList.length > 0 ? (
        productsList.map((product) => (
            <Link className="text-decoration-none text-dark" 
            to={`/product-details/${product.product_id}?mcn=${mcn}&bn=${bn}&ci=${categoryId}&bi=${brandId}`}
            onClick={()=>{
                localStorage.setItem('selectedPdt',JSON.stringify({
                    product_name: product.product_name,
                    description: decodeHTML(product.description),
                    product_mrp: product.product_mrp,
                    discount: product.discount,
                    special_discount: product.special_discount
                }));
            }}
            >
            <div className="row my-2 productlist-bg rounded-2 mx-1 shadow py-2 border my-md-5 pe-0" key={product.category_id}>
                <div className="col-3 col-md-4 p-0 my-auto text-center">
                    {product.product_image ? ( 
                        <img
                            src={`${baseUrl}${product.product_image}`}
                            className="phoneimg"
                            alt={product.product_name}
                        />
                    ) : (
                        <div className="logoimg" style={{ backgroundColor: "#ccc" }}></div>
                    )}
                </div>
                <div className="col-md-8 col-9 my-auto pe-0">
                    <h4 className="producttext pb-1 mb-0">{product.product_name}</h4>
                   
                    <ul className="list-unstyled pe-0">
                        <li className="productdesc d-block d-md-none">
                            {trimText(decodeHTML(product.description), 72)}
                        </li>
                        <li className="productdesc d-none d-md-block w-75 py-2">
                            {/* {decodeHTML(product.description)} */}
                            {trimText(decodeHTML(product.description), 201)}
                        </li>
                        <li className="productoffer d-block d-md-none">
                            <div className="d-flex justify-content-between ">
                            <div className=""> <i class="fa-solid text-danger fa-arrow-down"></i> {product.discount} .00% Off</div>
                            <div className="">&#8377;{(product.product_mrp - (product.discount * product.product_mrp)/100).toFixed(2)}</div>
                        
                            <div className="fw-light ps-2"><strike>{product.product_mrp}</strike></div>
                            </div>
                        </li>

                    <li  className="d-none d-md-block">
                            <div className="row justify-content-between ">
                            <div className="col-3 ms-3 productoffer"> <i class="fa-solid text-danger fa-arrow-down"></i> {product.discount} .00% Off</div>
                            <div className="col-5 col-md-2 text-end fw-bold">&#8377;{(product.product_mrp - (product.discount * product.product_mrp)/100).toFixed(2)}</div>
                            <div className="col-4 col-md-2"><strike>{product.product_mrp}</strike></div>
                            <div className="col-4"></div>
                            </div>
                        </li>
                       <div className="offertext pt-1">
                        SPECIAL OFFERS FOR SUBSCRIBED USERS ONLY !
                       </div>
                       <div className="d-flex cashback">
                        <div className="me-3"><i class="fa-solid fa-coins"></i></div>
                        <div className="text-primary fw-bold">&#8377;{product.special_discount}<span className="px-1">CASHBACK</span></div>
                       </div>
                      
                    </ul>

                </div>
            </div>
            </Link>
        ))
    ) : (
        // <p>No products available for this category.</p>
        <h4 className="text-center mt-5"><i class="fa-solid fa-spinner"></i></h4>
    )}
</div>

        </div>
    );
};

export default ProductList;
