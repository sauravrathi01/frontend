import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, useLocation, Navigate, matchPath } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './Signup';
import Login from './Login';
import Aboutus from './Aboutus';
import Pricing from './Pricing';
import Service from './Service';
import Partner from './Partner';
import Career from './Career';
import News from './News';
import Solar from './Solar';
import Games from './Games'; 
import Economic from './Economic';
import Electric from './Electric';
import Sports from './Sports';
import Technology from './Technology';
import Health from './Health';
import Header2 from './Header2';
import Products from './Products';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import CheckOut from './CheckOut';
import Footer from './Footer';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import App2 from "./App2";
import Referral from './Referral';
import Profilemain from './Profilemain'
import BankDetails from './BankDetails';
// import Transactions from './Transactions';
import Transaction from './Transaction';
import Offers from './Offers';
import { AuthProvider } from "./AuthContext";
import Achievement from './Achievement';
import AchievementList from './AchievementList';
import SubscribeUser from './SubscribeUser';
import ShopList from './ShopList';
import PaymentConfirmation from './PaymentConfirmation';
import MyOrders from './MyOrders';
import TransactionDetails from './TransactionDetails';

function App() {
  const location = useLocation();

  // const isAchievementDetailPage = matchPath("/achievement/:slot_id", location.pathname)

  const showHeader = ["/", "/slots", "/profile", "/shoplist"].includes(location.pathname); 
  const showFooter = ["/", "/profile", "/slots", "/offers", "/subscribe-users", "/shoplist"].includes(location.pathname);

  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
        setIsLoggedIn(true);  // User is logged in if user_id exists in localStorage
    }
}, []);

useEffect(()=>{
  const checkAuth = ()=>{
    setIsLoggedIn(!!localStorage.getItem('token'));
    setUserId(localStorage.getItem("userId") || "");
  };

  window.addEventListener("storage", checkAuth);
  return () => {
    window.removeEventListener("storage", checkAuth);
};
}, []);

const baseUrl = "https://mrcartonline.com/admin";



  return (
    <div>
      {showHeader && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      
      <Routes>
        <Route path='/app2' element={<App2 />} />
        <Route path='/' element={<Home />} />
        <Route path="/brands/:brandId" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/service' element={<Service />} />
        <Route path='/partners' element={<Partner />} />
        <Route path='/careers' element={<Career />} />
        <Route path='/news' element={<News />} />
        <Route path='/solar' element={<Solar />} />
        <Route path='/games' element={<Games />} />
        <Route path='/economic' element={<Economic />} />
        <Route path='/electric' element={<Electric />} />
        <Route path='/sports' element={<Sports />} />
        <Route path='/technology' element={<Technology />} />
        <Route path='/health' element={<Health />} />
        <Route path='/header2' element={<Header2 />} />
        <Route path="/products/:categoryId/:title" element={<Products />} />
        <Route path='/sub-products/:categoryId/:brandId/' element={<ProductList />} />
        <Route path='/product-details/:productId' element={<ProductDetails />} />
        <Route path='/check-out/:categoryId/' element={<CheckOut />} />
        <Route path='/profile' element={isLoggedIn ? <Profile userId={userId} /> : <Navigate to="/login" />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/referral' element={<Referral />} />
        <Route path='/user-profile' element={<Profilemain />} />
        <Route path='/bank-details' element={<BankDetails/>}/>
        <Route path='/offers' element={<Offers/>}/>
        <Route path='/slots' element={<Achievement/>}/>
        <Route path='/transactions' element={<Transaction/>}/>
        <Route path='/achievement/:slot_id' element={<AchievementList/>}/>
        <Route path='/subscribe-users' element={<SubscribeUser/>}/>
        <Route path='/shoplist' element={<ShopList baseUrl={baseUrl}/>}/>
        <Route path='/payment-confirmation' element={<PaymentConfirmation/>}/>
        <Route path='/orders' element={<MyOrders/>}/>
        <Route path='/transaction-details/:type_id' element={<TransactionDetails/>}/>
      </Routes>

      {showFooter && <Footer isLoggedIn={isLoggedIn} />}
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
