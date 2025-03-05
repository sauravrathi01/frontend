import React from "react";
import './News.css';
import { NavLink } from "react-router-dom";
import Organic from "./Organic";

const News =()=>{
    //  const [users, setUsers] = useState([]);
        
    //         useEffect(()=>{
    //             fetch('https://newsapi.org/v2/everything?q=Organic&apiKey=8debcee865044be39d0831baf5116735')
    //             .then((response)=>response.json())
    //             .then((data)=>{
    //                 setUsers(data.articles);
    //             })
    //             .catch((error)=>{
    //                 console.error('Error fetching data: ', error)
    //             })
    //         }, [])

    return(
        <>
        <div className="container-fluid overflow-hidden">
           <div className="row justify-content-center my-3 mx-auto">
                                   <div className="col-6 col-md">
                                   <NavLink  className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   }  to='/news'>Organic</NavLink>
                                   </div>
                                   <div className="col-6 col-md">
                                   <NavLink className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   } to='/solar'>Solar</NavLink>
                                   </div>
                                   <div className="col-6 col-md">
                                   <NavLink className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   } to='/economic'>Economic</NavLink>
                                   </div>
                                   <div className="col-6 col-md">
                                   <NavLink className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   } to='/electric'>Electric</NavLink>
                                   </div>
                                   <div className="col-6 col-md">
                                   <NavLink className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   } to='/games'>Games</NavLink>
                                   </div>
                                   <div className="col-6 col-md">
                                   <NavLink className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   } to='/sports'>Sports</NavLink>
                                   </div>
                                   <div className="col-6 col-md">
                                   <NavLink className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   } to='/technology'>Technology</NavLink>
                                   </div>
                                   <div className="col-6 col-md">
                                   <NavLink className={({ isActive }) =>
                                     `fs-5 text-decoration-none apititle ${isActive ? "activelink " : "text-dark"}`
                                   } to='/health'>Health</NavLink>
                                   </div>
              </div>

                <Organic/>
            {/* <div className="row">
                 {users.map((user, index)=>(
                    <div className="row my-md-5 mt-5 mt-md-2 justify-content-center" key={index}>
                        <div className="col-md-12 ">
                        <h5 className="apititle">{user.title}</h5>
                   </div>
                   <div className="col-12 col-md-10 apitext">
                    <p>{user.description}</p>
                    <h6 className="mt-md-3 apiauthor text-secondary">{user.author}</h6>
                   </div>
                   <div className="col-12 col-md-2">
                   <img className="img-fluid rounded-3 border apiimg" src={user.urlToImage} alt="img not found"/>
                   </div>
                    </div>
                 ))}
            </div> */}
          
        </div>
        </>
    )
}

export default News;