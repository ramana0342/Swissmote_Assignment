import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import UserRegister from './registerUser'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import UserLogin from './loginUser'
import ManageUserPost from './manageUserEvents'
import axios from 'axios';
import DisplayAllPost from './displayAllEvents'
import { useNavigate } from 'react-router-dom'


export const store = createContext()

function TaskApp() {

  
  const userToken = JSON.parse(sessionStorage.getItem("Token"))
  const [LoginStatus, setLoginStatus] = useState(userToken)


  // useEffect(()=>{

  //     axios.get("http://localhost:8080/getAllPostsData").then((res)=>{
  //          //console.log(res.data.allPostsData)
  //          setAllPostData(res.data.allPostsData)
  //     }).catch((err)=>{
  //         console.log(err)
  //     })
      
  // },[])
  
 

  return (
    <store.Provider value={{LoginStatus, setLoginStatus}}>
    <BrowserRouter>
   <div className='navBar'>
    <NavLink className="navLink" to="/"><b>Home</b></NavLink>
    <NavLink className="navLink" to= "/createPost"><b>User Events/Manage</b></NavLink>
   { LoginStatus ? <NavLink><b onClick={()=>{setLoginStatus();sessionStorage.clear();}}>LogOut</b></NavLink> :  <NavLink className="navLink" to="/userLogin"><b>Login</b></NavLink> }
    </div>
    <Routes>
      <Route path="/userLogin" element={<UserLogin LoginStatus={LoginStatus} setLoginStatus={setLoginStatus} />}  />
      <Route path='/userRegister' element={<UserRegister/>}  />
      <Route path="/createPost"  element = {<ManageUserPost/>} />
      <Route path='/' element = {<DisplayAllPost/>} />
    </Routes>
  
      
      </BrowserRouter>
      </store.Provider>
  )
}

export default TaskApp