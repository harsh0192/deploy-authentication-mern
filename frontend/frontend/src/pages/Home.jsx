import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from './util';
import {ToastContainer} from 'react-toastify'


function Home() {
  const [loggedInUser, setLoggedInUser]=  useState("");
  const [products, setProducts]=  useState([]);
  const navigate= useNavigate();
  
useEffect(()=>{
     setLoggedInUser(localStorage.getItem('loggedInUser'))
     fetchProducts();
},[])

    const handleLogout = (e) => {
      // here we delete the token and loggedInUser 
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      handleSuccess("User logout")
      setTimeout(()=>{
            navigate('/login')
      },1000)
    }
   const fetchProducts= async ()=>{
    try{
     const url = "http://localhost:8080/products"
     const headers= {
     headers : {
      'Authorization' : localStorage.getItem('token')
     }
     }
     const response= await fetch(url,headers);
     const result = await response.json();
     console.log(result);
     setProducts(result);
    }catch(e){
  handleError(err);
    }
   }
    useEffect(()=>{

    })

  return (
    <div>
      <h1> Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
           products && products?.map((item,index)=>(
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
           ))
        }
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Home