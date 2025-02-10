import React from "react";
import "./App.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";



const UserLogin = ({ LoginStatus, setLoginStatus }) => {

  let navigate = useNavigate()
  const [userLogin, setuserLogin] = useState({ Eamil: "", Password: "" });
  const [LoginError, setLoginError] = useState("")
  const [loginBtnstatus,setloginBtnstatus] = useState()

  
  
  const handleChange = (field, value) => {
    setLoginError("")
    setuserLogin({ ...userLogin, [field]: value })
  }



  const LoginEvent = () => {
    setloginBtnstatus(true)
    axios.post("http://localhost:8080/userLogin", userLogin).then((res) => {
     // console.log(res.data.Token)
      if (res.data.Success) {
        setLoginError("")
        setLoginStatus(true)
        sessionStorage.setItem("Token", JSON.stringify(res.data.Token));
        setloginBtnstatus()
        alert("Logged Succesfully");
        navigate("/")
      }
    }).catch((err)=>{
          //console.log(err)
          setLoginStatus()
          setLoginError(err.response.data.Error)
          setloginBtnstatus()
    })
  }

  return (<>

    <div class="Logincontainer">
      <div className="Loginform">
        <h3><b>Plese LogIn</b></h3>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"><b>Email address:</b></label><br />
          <input
            onChange={(e) => { handleChange("Email", e.target.value) }}
            type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Your Email" />

        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"><b>Password:</b></label><br />
          <input
            onChange={(e) => { handleChange("Password", e.target.value) }}
            type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
        </div>
        <div className="Login-btn">
            {loginBtnstatus ? <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></button> 
            :<button onClick={() => { LoginEvent() }} type="submit" class="btn btn-primary" id="submit">LogIn</button> }
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}><b>Don't have An Account ?</b><br /> <NavLink to="/userRegister"><b>REGISTER</b></NavLink></div>
        <div>{LoginStatus == true ? <b style={{ color: "green" }}>Logged Succesfully , Plese Wait</b> : ""}
          {LoginError ? <b style={{ color: "red" }}>{LoginError}</b> : ""}
        </div>
      </div>
    </div>


  </>)
}

export default UserLogin