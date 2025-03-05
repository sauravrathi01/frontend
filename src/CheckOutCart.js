
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams, useParams } from "react-router-dom";
import "./Checkout.css";

const CheckOutCart=()=>{
    const { productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
  const [cart, setCart] = useState([]); // For storing cart items
  const [totalAmount, setTotalAmount] = useState(0); // Total product price before discount
  const [totalDiscount, setTotalDiscount] = useState(0); // Total discount
  const [totalSpecialDiscount, setTotalSpecialDiscount] = useState(0); // Total special discount
  const [finalAmount, setFinalAmount] = useState(0); // Final amount after discounts
  const [isCashbackApplied, setIsCashbackApplied] = useState(false);
//   const [isModalOpen , setIsModalOpen] = useState(false);

  const savedData = JSON.parse(localStorage.getItem("saveddata")) || {};
  const { product_image, base_url} = location.state || savedData
  // console.log(location.state);
// console.log("Product Image:", product_image);

 const handleCashback =()=>{
  setIsCashbackApplied((prevState)=>{
    const newCashback = !prevState;
    calculateAmounts(cart, newCashback);
    return newCashback;
  })
  // calculateAmounts(cart);
 }



 


 const handleClearCart=()=>{
  setCart([]);
  localStorage.removeItem('cart');
 }

  useEffect(() => {
    // Retrieve cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    calculateAmounts(storedCart);
  }, []);

  // Calculate Total Amount, Discounts, and Final Amount
  const calculateAmounts = (updatedCart, isCashbackApplied) => {
    let total = 0;
    let discountTotal = 0;
    let specialDiscountTotal = 0;

    updatedCart.forEach((product) => {
      const price = product.price || 0;
      const quantity = product.quantity || 1;
      const discount = product.discount || 0;
      const specialDiscount = product.special_discount || 0;

      total += price * quantity; // Total amount before discount
      // discountTotal += discount * quantity; 
      discountTotal += (price * discount/100) * quantity;
      specialDiscountTotal += specialDiscount * quantity;
    });

    setTotalAmount(total);
    setTotalDiscount(discountTotal);
    setTotalSpecialDiscount(specialDiscountTotal);

    // Final amount after applying all discounts
    const finalAmountCalc = isCashbackApplied ? total - (discountTotal + specialDiscountTotal) : total - discountTotal;
    setFinalAmount(finalAmountCalc);
  };

  // Handle increasing quantity
  const handleIncrease = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
    calculateAmounts(updatedCart); // Recalculate total amount after update
  };

  // Handle decreasing quantity or removing product if quantity is 0
  const handleDecrease = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove item if quantity is 0
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
    calculateAmounts(updatedCart); // Recalculate total amount after update
  };

  // Update localStorage with new cart data
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const [searchParams] = useSearchParams();
  const mcn = searchParams.get('mcn');
  const ci = searchParams.get('ci');
  const bi = searchParams.get('bi');
  const bn = searchParams.get('bn');
  const [checkoutData, setCheckoutData] = useState(null);


  const handleProceed=()=>{
    const checkOutData= {
        cart,
        totalAmount,
        totalDiscount,
        isCashbackApplied,
        totalSpecialDiscount,
        finalAmount,
    };
    localStorage.setItem("checkOutData", JSON.stringify(checkOutData));
    // alert('Oreder');

    navigate(`/check-out/${productId}?mcn=${mcn}&bn=${bn}&ci=${ci}&bi=${bi}`)
    // navigate('/chek-out')
  }

  

    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem("checkOutData");
        if (storedData) {
            setCheckoutData(JSON.parse(storedData));
        }
    }, []);

    return(
        <>
         {cart.length > 0 ? (
        <div className="container-fluid">
         

          <div className="container-fluid bg-light pb-5 px-0 cart-sidebar1 px-2 shadow">
            {cart.map((product) => (
              <div className="row " key={product.id}>
                <div className="col-12 bg-white border shadow border-secondary ">
                  <div className="row  py-3 mb-md-3 ">
                    <div className="col-3 col-md-2">
                    { product_image ? (
                          <img src={`${base_url}${product_image}`} className="img-fluid rounded-4" alt="Product" />
                        ) : (
                          <p className="checktext5">No img</p>
                        )}

                    
                     
                    </div>

                    <div className="col-7 col-md-7">
                      <div className="checktext1">{product.name || "No Name"}</div>
                      <div className="checktext2">{product.name || "No Name"}</div>
                      <div className="checktext3 py-md-1">
                        ₹{product.price || "N/A"}
                      </div>
                      <div className="checktext1 py-1 text-danger">
                        {product.discount !== undefined ? `${(product.discount).toFixed(2)}% Off` : "No Discount"}
                      </div>
                      <div className="checktext4">
                        Cashback: ₹{product.special_discount ? `${product.special_discount}` : "No Cashback"}
                      </div>
                    </div>

                    <div className="col-2 col-md-3 my-auto">
                      <div className="d-flex align-items-center justify-content-end">
                        <button
                          className="btn btn-danger rounded-pill py-0 m-md-2 m-1 px-2"
                          onClick={() => handleDecrease(product.id)}
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="btn btn-success rounded-pill py-0 m-md-2 m-1 px-2"
                          onClick={() => handleIncrease(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="my-3 row amountPay">
              <div className="col-4">
                <div className="checktext5">Total Amount</div>
                <h6>₹{totalAmount.toFixed(2)}</h6>
              </div>
              <div className="col-4">
                <div className="checktext5">Total Discount</div>
                <h6>&#8377;{totalDiscount.toFixed(2)}</h6>
              </div>
              <div className="col-4">
                
              </div>
            </div>

            <div className="row">
              <div className="col-6">
              <div className="checktext5">Cashback For Subscribed*</div>
              <h6 className="text-success">&#8377;{totalSpecialDiscount.toFixed(2)}</h6>
              </div>
              <div className="col-4">
              <div className="checktext5">Net Payable</div>
              <h5 className="totalpay">&#8377;{finalAmount.toFixed(2)}</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <input  type="checkbox" checked={isCashbackApplied} onClick={handleCashback}/> <span className="fw-bold checktext5">Redeem Cashback</span>
              </div>
            </div>

            <div className="row">
              <div className="col-12 my-2 col-md-5 mx-auto">
                <button className="text-center border-0 placed-order w-100 py-2 text-white"
                onClick={handleProceed}
                >PLACE ORDER</button>
   
              </div>
              <div className="col-12 col-md-8 mx-auto pb-4">
               <div className="text-center checktext5" onClick={handleClearCart} style={{cursor: 'pointer'}}>Clear Cart</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-2 bg-light pb-5 px-0 cart-sidebar1 px-2 shadow">
          
     
          <div className="my-3 row amountPay">
              <div className="col-4">
                <div className="checktext5">Total Amount</div>
                <h6>₹0.00</h6>
              </div>
              <div className="col-4">
                <div className="checktext5">Total Discount</div>
                <h6>₹0.00</h6>
              </div>
              <div className="col-4">
                
              </div>
            </div>

            <div className="row">
              <div className="col-6">
              <div className="checktext5">Cashback For Subscribed*</div>
              <h6 className="text-success">₹0.00</h6>
              </div>
              <div className="col-4">
              <div className="checktext5">Net Payable</div>
              <h5 className="totalpay">&#8377;0.00</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input  type="checkbox" checked={isCashbackApplied} onClick={handleCashback}/> <span className="fw-bold checktext5">Redeem Cashback</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12 my-2 col-md-5 mx-auto">
                <button className="text-center border-0 placed-order w-100 py-2 text-white"
                // onClick={handleOpenModal}
                >PLACE ORDER</button>
              </div>
              <div className="col-12 col-md-8 mx-auto pb-5">
               <div className="text-center checktext5" onClick={handleClearCart} style={{cursor: 'pointer'}}>Clear Cart</div>
              </div>
            </div>
        </div>
      )}

        </>
    )
}

export default CheckOutCart;