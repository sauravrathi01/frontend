
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Checkout.css";

const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState(null);

  // Get increase/decrease actions from location state
  const increaseQuantity = location.state?.increaseQuantity;
  const decreaseQuantity = location.state?.decreaseQuantity;

  // Initialize product state based on location or localStorage
  useEffect(() => {
    if (location.state) {
      setProduct(location.state);
      localStorage.setItem("saveddata", JSON.stringify(location.state));
    } else {
      const storedData = localStorage.getItem("saveddata");
      if (storedData) {
        setProduct(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  // Sync quantity with localStorage after page refresh
  useEffect(() => {
    if (product) {
      const storedData = localStorage.getItem("cart");
      if (storedData) {
        const cart = JSON.parse(storedData);
        const cartItem = cart.find((item) => item.id === product.id);
        if (cartItem) {
          setQuantity(cartItem.quantity); // Set quantity from cart data in localStorage
        }
      }
    }
  }, [product]);

  // Increase quantity handler
  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQty = prev + 1;
      // Update cart in localStorage directly
      updateCartInLocalStorage(newQty);
      return newQty;
    });
  };

  // Decrease quantity handler
  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQty = Math.max(prev - 1, 0);
      if (newQty === 0) {
        // Remove product from localStorage
        removeProductFromCart();
        setProduct(null); 
    //     localStorage.removeItem("product");
    //   localStorage.removeItem("quantity");
      } else {
        // Update cart in localStorage
        updateCartInLocalStorage(newQty);
      }
      return newQty;
    });
  };

  const removeProductFromCart = () => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((item) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.removeItem("product");
      localStorage.removeItem("quantity");
    } catch (error) {
      console.error("Error removing product from cart in localStorage:", error);
    }
  };

  // Update cart in localStorage
  const updateCartInLocalStorage = (qty) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: qty,
              price: product?.product_mrp,
              totalPrice: qty * product.product_mrp,
            }
          : item
      );

      // If product does not exist, add it to the cart
      if (!updatedCart.find((item) => item.id === product.id)) {
        updatedCart.push({
          id: product.id,
          name: product?.product_name,
          price: product?.product_mrp,
          quantity: qty,
          totalPrice: qty * product.product_mrp,
        });
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error updating cart in localStorage:", error);
    }
  };



return (
    <>
      {product ? (
        <div className="container-fluid">
          <div className="row">Checkout</div>
  
          <div className="row fixedbg shadow pb-1">
            <div className="col-1 ms-3">
              <Link to={-1} className="text-decoration-none text-dark">
                <h5>
                  <i className="fa-solid fa-arrow-left"></i>
                </h5>
              </Link>
            </div>
            <div className="col-10">
              <h4 className="ms-2 categorytext">Checkout</h4>
            </div>
          </div>
  
          <div className="row mt-5">
            <div className="col-3 col-md-3">
              {product?.base_url && product?.product_image ? (
                <img
                  src={`${product.base_url}${product.product_image}`}
                  alt={product.product_name || "Product Image"}
                  className="img-fluid w-100 h-100"
                />
              ) : (
                <p>Loading image...</p>
              )}
            </div>
  
            <div className="col-5 col-md-6">
              <div className="checktext1">{product?.product_name}</div>
              <div className="checktext2 py-md-1">{product?.product_name}</div>
              <div className="checktext3 py-md-1">{product?.product_mrp}</div>
              <div className="checktext1 text-danger py-1">
                {product?.discount}.00% Off
              </div>
  
              <div className="d-flex align-items-center justify-content-end">
                <button
                  className="btn btn-danger rounded-pill py-0 m-2"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-success rounded-pill py-0 m-2"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Show this when the product is removed
        <div className="container-fluid text-center mt-5">
          <h2>Your cart is empty!</h2>
          <p>Please add products to continue checkout.</p>
          <Link to="/" className="btn btn-primary">
            Go to Shop
          </Link>
        </div>
      )}
    </>
  );
  
};


export default CheckOut;