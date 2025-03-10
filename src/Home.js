import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams, useSearchParams } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import "./Home.css";
import Brands from "./Brands";
import Offers from "./Offers";

const Home = () => {
  const [searchParams] = useSearchParams();
  const mcn=searchParams.get('mcn');

  const [baseUrl, setBaseUrl] = useState('');
  const [searchBaseUrl, setsearchBaseUrl] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  const baseUrlCategory = "https://mrcartonline.com/admin/assets/category/";
 
  const apiUrl = "https://mrcartonline.com/kitty/index.php/User/";

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  



  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.post(
        "https://mrcartonline.com/kitty/index.php/User/getSearchProduct",
        new URLSearchParams({ search_string: searchQuery }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data?.status) {
        setSearchResults(response.data.data || []);
        setsearchBaseUrl(response.data.message);
        // console.log(response.data.message);
       
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("API Error:", error.message);
      setSearchResults([]);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}getAllTypes`);
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axios.post("https://mrcartonline.com/kitty/index.php/User/getBannerList");
      setBanners(response.data?.data || []);
      setBaseUrl(response.data.base_url);

    } catch (error) {
      console.error("Error fetching banners:", error);
    }
};

  // Load data on component mount
  useEffect(() => {
    fetchCategories();
    fetchBanners();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
  navigate(`/products/${categoryId}/${categoryName}`);
  };

  return (
    <>
   <Header showSearch={isSticky} />  
    <div className="container-fluid p-0 mt-4 pt-4 overflow-hidden body-bg">
    
    <div id="uniqueprod">

      
<div className="mt-md-5 ms-md-4 mt-3 ps-md-2 ms-3 search-text">Search For The Products & Services</div>

<div className="row mx-md-5 mx-4 my-lg-3 searchwidth">
      <input
        className="form-control me-2 border-0"
        type="search"
        placeholder="🔍 Search the product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchResults.length > 0 && (
        <ul className="list-group search-dropdown pe-0">
          {searchResults.map((product) => (
            
            <Link className="text-decoration-none col-md-6 text-dark w-100 mx-0"
            
             to={`/sub-products/${product.category_id}/${product.brand_id}?mcn=${product.category_name}&bn=${product.brand_name}`}
             >
            <li
              key={product.id}
              className="list-group-item d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <img src={`${searchBaseUrl}${product.product_image} `}alt={product.product_name}
              className="me-2" style={{width: '45px', height: '45px', objectFit: 'cover', border: '1px solid #dfd1d1', borderRadius: '5%'}}/>
              <span className="pricetext">{product.product_name.length>20 ? product.product_name.slice(0,20) + '...' : product.product_name}</span>
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
     

    <div id="carouselExampleInterval" className="carousel mt-2 slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {banners.map((banner, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={banner.id}>
                <img src={`${baseUrl}${banner.banner_image}`} className="w-100 bannerimg" alt={`Banner ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
     

        <div >
          <div className="row">
            <h4 className="col-12 my-2 ms-md-5 categorytext  ps-4 ">Top Product Categories</h4>
          </div>
          <div className="row justify-content-center mx-auto py-2 ps-md-3 m-1 catbg border rounded-4">
            {categories.length > 0 ? (
              categories.map((item) => (
                <div
                  className="col-3 text-center col-lg-1 my-md-3 my-2 p-0 mx-lg-3 px-0"
                  key={item.category_id}
                  onClick={() => handleCategoryClick(item.category_id, item.category_name)}
                  style={{ cursor: "pointer" }} >
                  {item.category_image ? (
                    <img src={`${baseUrlCategory}${item.category_image}`} alt={item.category_name} className="category-item logoimg border border-1 border-secondary rounded p-1" />
                  ) : (
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#ccc" }}></div>
                  )}
                  <h6 className="logotexthome fw-bold pt-1 text-center">{item.category_name || "Unnamed Category"}</h6>
                </div>
              ))
            ) : (
              // <p>No categories available</p>
              // <h4 className="text-center"><i class="fa-solid fa-spinner"></i></h4>
              <img src="https://d37oebn0w9ir6a.cloudfront.net/account_6827/customerio-loading-animation_244ab356f603e104472b77ceb1e5add4.gif" className="img-fluid h-100"/>
            )}
          </div>


        </div>
    </div>



    <Brands limit={12}/>
    <div className="row">
        <h4 className="col-12 mt-2 ps-4 ms-3 categorytext">Offers</h4>
      </div>
    <Offers/>
      
      </div>
    
    </>
  );
};

export default Home;
