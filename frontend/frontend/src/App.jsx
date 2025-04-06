import {Navigate, Route, Routes} from 'react-router-dom'
import React, { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/signup'
import RefreshHandler from './RefreshHandler'
function App() {
   
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const PrivateRoute= ({element})=>{
     return isAuthenticated ? element : <Navigate to ="/login"/>
    }

      

  return (
    <div className='App'>
      <RefreshHandler setIsAuthenticated= {setIsAuthenticated}/>
     <Routes>
      <Route path='/' element={<Navigate to = '/login'/>}/>
      <Route path ='/login' element={<Login></Login>}/>
      <Route path ='/signup' element={<Signup></Signup>}/>
      <Route path ='/home' element={<PrivateRoute element={<Home/>}/>}/>
     </Routes>


    </div>
  )
}

export default App