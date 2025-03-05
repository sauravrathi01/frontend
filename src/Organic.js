import React, {useState, useEffect} from "react";
import './News.css';
// import { NavLink } from "react-router-dom";
const Organic=()=>{
     const [users, setUsers] = useState([]);
    
        useEffect(()=>{
            fetch('https://newsapi.org/v2/everything?q=Organic&apiKey=8debcee865044be39d0831baf5116735')
            .then((response)=>response.json())
            .then((data)=>{
                setUsers(data.articles);
            })
            .catch((error)=>{
                console.error('Error fetching data: ', error)
            })
        }, []);

    return(
        <>
        <div className="container-fluid overflow-hidden">
     
        <div className="row">
                 {users.map((user, index)=>(

                <div className="col-12 col-md-5 mx-auto my-md-4 mt-md-4" key={index}>
                <div className="row p-md-3 h-100 rounded shadow py-4 ">
                    <div className="col-md-12">
                        <h5 className="apititle">{user.title}</h5>
                    </div>
                    <div className="col-8 col-md-9 apitext">
                        <p>{user.description}</p>
                        <h6 className="mt-md-3 apiauthor text-secondary">{user.author}</h6>
                    </div>
                    <div className="col-4 col-md-3 text-center">
                        <img
                            className="img-fluid rounded-3 apiimg"
                            src={user.urlToImage || 'https://via.placeholder.com/150'}
                            alt="img not found"
                        />
                    </div>
                </div>
            </div>
                 ))}
            </div>




        </div>
        </>
    )
}

export default Organic;