


import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useSearchParams, useLocation } from "react-router-dom";
import "./Home.css";
import "./Checkout.css";

const ProductDetails =()=>{
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState([]);
  const [productData, setProductData] = useState([]);
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [mainImage, setMainImage] = useState(null);

  // Set the initial main image when productInfo is available
  useEffect(() => {
    if (productInfo.length > 0) {
      setMainImage(productInfo[0].product_image); // Set 0th index image
    }
  }, [productInfo]);

  // console.log("Product Image:",  productInfo[0]?.product_image);
  // useEffect(()=>{
  //   console.log(productData);
    
  // }, [productData]);

  const updateCart = (qty) => {
    let updatedCart = [...cart];
    let existingProduct = updatedCart.find((item) => item.id === productId);
  
    if (existingProduct) {
      existingProduct.quantity = qty;
    } else {
      updatedCart.push({
        id: productId,
        name: product?.product_name,
        image:`${message}${mainImage}`,
        price: parseFloat(product?.product_mrp) || 0,  // Ensure it's a number
        discount: parseFloat(product?.discount) || 0,
        special_discount: parseFloat(product?.special_discount) || 0,
        quantity: qty
      });
    }
  
    setCart(updatedCart);
    updateCartCountAndTotal(updatedCart);
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const addTocart = () => {
    if (quantity === 0) {
      setQuantity(1);
      updateCart(1);
    }
  };
  

  const updateCartCountAndTotal = (updatedCart) => {
    let count = updatedCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    let total = updatedCart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity || 0), 0);
  
    setCartCount(count);
    setTotalPrice(total);
  
    localStorage.setItem("cartCount", count);
    localStorage.setItem("totalPrice", total);

    // window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent("cartUpdated", {detail: count}));
  };
  
  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQty = prev + 1;
      updateCart(newQty);
      return newQty;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      const newQty = prev - 1;
      if (newQty === 0) {
        removeProductFromCart();
      } else {
        updateCart(newQty);
      }
      return Math.max(newQty, 0);
    });
  };

  const removeProductFromCart = () => {
    let updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateCartCountAndTotal(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getDetails = async () => {
    try {
      const response = await axios.post(
        'https://mrcartonline.com/kitty/index.php/User/getProductDetailInformation',
        new URLSearchParams({ product_id: productId }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.data.status) {
        setProductInfo(response.data.data.image_list);
        setProductData(response.data.data_param);
        setMessage(response.data.message);
        setMessage1(response.data.base_url);
      } else {
        console.error('API Error', response.data.message);
      }
    } catch (error) {
      console.error('API Error', error.message);
    }
  };

  useEffect(() => {
    if (productId) {
      getDetails();
    }
  }, [productId]);

  useEffect(() => {
    if (location.state) {
      setProduct(location.state);
      localStorage.setItem('selectedPdt', JSON.stringify(location.state));
    } else {
      const storedData = localStorage.getItem('selectedPdt');
      if (storedData) {
        setProduct(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    updateCartCountAndTotal(storedCart);

    const existingProduct = storedCart.find((item) => item.id === productId);
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
    }

    const storedProduct = JSON.parse(localStorage.getItem("selectedPdt"));
    if (storedProduct && storedProduct.id === productId) {
      setProduct(storedProduct);
    }
  }, [productId]);

  const [searchParams] = useSearchParams();
  const mcn = searchParams.get('mcn');
  const ci = searchParams.get('ci');
  const bi = searchParams.get('bi');
  const bn = searchParams.get('bn');
    return(
        <>
        
<div className="container-fluid overflow-hidden ">
         <div className="row fixedbg shadow pb-1">
            <div className="col-1 ">
                <Link className="text-dark" to={`/sub-products/${ci}/${bi}?mcn=${mcn}&bn=${bn}`}> 
       <h5><i class="fa-solid fa-arrow-left"></i></h5></Link>  </div>
       <div className="col-10">
        <h4 className=" ms-2 categorytext">{product?.product_name}</h4>
        </div>
            </div>

            <div className="row mt-5 pt-3 pt-md-5 bg-white py-4">
      {Array.isArray(productInfo) && productInfo.length > 0 ? (
        productInfo.map((item, index) => {
          if (index === 0) {
            return (
              <>
                <div className="col-12 col-md-5 p-0 text-center" key={index}>
                  {mainImage ? (
                    <img
                      src={`${message}${mainImage}`}
                      alt={product?.product_name || 'Product Image'}
                      className="img-fluid main-image"
                    />
                  ) : (
                    <div className="img-fluid " style={{ backgroundColor: '#ccc' }}></div>
                  )}
                </div>
                <div className="col-6 ms-5 d-none d-md-block my-auto">
                  <h4 className="categorytext">{product?.product_name}</h4>
                  <div className="producttext1">{product?.description}</div>
                </div>
              </>
            );
          }

          if (index <= 3) {
            return (
              <div className="col-4 col-md-1 text-center p-0 " key={index}>
                {item.product_image ? (
                  <img
                    src={`${message}${item.product_image}`}
                    alt={product?.product_name || 'Product Image'}
                    className=" thumbnail-img"
                    onClick={() => setMainImage(item.product_image)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <div className="img-fluid" style={{ backgroundColor: '#ccc' }}></div>
                )}
              </div>
            );
          }

          return null;
        })
      ) : (
        <h4 className="text-center mt-5">
          <i className="fa-solid fa-spinner"></i>
        </h4>
      )}
    </div>
 
         </div>
        
<div className="container-fluid product-bg pb-5">
<div className="row pt-md-5 justify-content-center">
<div className="productoffer2 col-12 col-md-10  py-1 my-auto">
  <div className="row">
  <div className="col-4">
    {product?.discount !== undefined ? (
      <>
        <i className="fa-solid text-danger fa-arrow-down"></i> {product.discount} .00% Off
        <div className="productdesc">DISCOUNT</div>
      </>
    ) : (
      <div className="productdesc">Loading...</div>
    )}
  </div>

  <div className="col-4 text-danger">
    {product?.product_mrp !== undefined ? (
      <>
        <strike>&#8377; {product.product_mrp}.00</strike>
        <div className="productdesc">MRP</div>
      </>
    ) : (
      <div className="productdesc">Loading...</div>
    )}
  </div>

  <div className="col-4">
    {product?.product_mrp && product?.discount !== undefined ? (
      <>
        &#8377;{(product.product_mrp - (product.discount * product.product_mrp) / 100).toFixed(2)}
        <div className="productdesc">OFFERED PRICE</div>
      </>
    ) : (
      <div className="productdesc">Loading...</div>
    )}
  </div>
  </div>
</div>
</div>


<div className="row my-3">
  <div className="col text-end">
    {quantity === 0 ? (
      <button className="btn btn-success rounded-pill px-5 py-0" onClick={addTocart}>Add</button>
    ) : (
      <div className="d-flex align-items-center justify-content-end">
        <button className="btn btn-danger rounded-pill py-0 m-2" onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button className="btn btn-success  rounded-pill py-0 m-2" onClick={increaseQuantity}>+</button>
      </div>
    )}
  </div>
</div>

<div className="row bg-dark text-white py-2">
    <div className="col-12 col-md-8 ps-md-5 py-1">
        <div className="productdesc text-info">
            FOR SUBSCRIBED USERS ONLY
        </div>
        {product?.special_discount !== undefined ? (
            <div className="cashtext">CASHBACK &#8377;{product.special_discount}</div>
        ) : (
            <div className="productdesc">Loading...</div>
        )}
       
    </div>
</div>

<div className="row ">
    <div className="checktext3 col-8 my-2 ps-md-5">
        Highlights
    </div>
</div>

<div className="row my-3">
  {Array.isArray(productData) && productData.length > 0 ? (
    productData.map((item, index) => {
      return (
        <div className="row mx-auto bg-white py-md-3 py-2 border-bottom" key={index}>
          {item.para_icon ? (
            <div className="col-md-1 col-2">
             <img 
             className="img-fluid"
             src={`${message1}${item.para_icon}`}
             alt="Product Icon"
             />
            </div>
            
          ) : (
            <div className="col-2">NA</div>
          )}
          <div className="col-10">
           <div className="checktext5"> {item.para_name}</div>
            <div className="checktext3">{item.spe_details}</div>
            </div>
         
          
        </div>
      )
    })
  ) : (
    <p>Not applicable</p>
  )}
  </div>

<div className="row d-block d-md-none">
<div className="col-md-8 ps-md-5">
<h4 className="categorytext">{product?.product_name}</h4>
<div className="producttext1">
    {product?.description}
</div>
</div>
</div>

                
        </div>

<Link  to={{ 
    pathname: `/check-out/${productId}`, 
    search: `?mcn=${mcn}&bn=${bn}&ci=${ci}&bi=${bi}`, 
    state: {
      product,
      updateCart,
      increaseQuantity,
      decreaseQuantity,
      discount: product?.discount,       // Add discount
      special_discount: product?.special_discount,
      // product_image: productInfo.length > 1 ? productInfo[1].product_image : ""
      product_image: productInfo.length > 1 ? `${message}${productInfo[1].product_image}` : "",
  
    }
  }}

  className="text-decoration-none text-dark"
  onClick={() => {
    // const selectedImage = productInfo.length > 1 ? productInfo[1].product_image : "";
  
    localStorage.setItem(
      "saveddata",
      JSON.stringify({
        product_name: product?.product_name,
        product_image: product?.product_image,
        // product_image: selectedImage ? `${message}${selectedImage}` : "",
        product_mrp: product?.product_mrp,
        discount: product?.discount,
        special_discount: product?.special_discount,
        base_url: message,
        message,
      })
    );
  }}
>

<footer>
  <div className="row bg-white pt-3 pb-2 border border-2 border-secondary mx-0">
    <div className="col-2 text-end my-auto">
  <i class="fa-solid fa-cart-shopping text-primary fs-4  position-relative"> 
    {cartCount > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle">{cartCount}</span>}
    </i>
   
    </div>
    
    
    <div className="col-6">
      <span className="totaltext text-secondary">TOTAL </span>
      <span className="pricetext">&#8377; {totalPrice.toFixed(2)}</span>
    </div>
    <div className="col my-auto me-3 text-end">
        <div className="logotext1 fw-bold">Proceed</div>
    </div>
  </div>
</footer>
</Link>
        </>
    )
}

export default ProductDetails;