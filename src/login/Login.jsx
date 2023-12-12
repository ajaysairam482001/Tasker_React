import React, { useState } from "react";
import styles from "./login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//passwords were not hashed make them secure soon (both login and signup)

const Login = ()=>{
    const user = JSON.parse(localStorage.getItem('userData_todo')) || [];

    const [loginToken,setLoginToken] = useState("");

    const [formData,setformData] = useState({
      Email:'',
      Password:''
    });

    const navigate = useNavigate();

    const handleInputChange = (e)=>{
      const {name,value} = e.target; 
      setformData({
        ...formData,[name]:value,
    });
    }

    const handlelogin = ()=>{
      if(formData.Email==='' || formData.Password===''){
        alert("Email OR Password were not entered");
        return;
      }
      if(user.some((user)=>user.Email === formData.Email)){

        const founduser = user.find((u)=>u.Email === formData.Email);
        console.log(founduser);

        if(founduser){
          if(founduser.Password === formData.Password){
            //console.log("pass match!");
            setLoginToken("101");
            localStorage.setItem('token',JSON.stringify("101"));
            navigate("/todo");
            window.location.reload();
          }
          else{
            //console.log("not matched");
            alert("Incorrect Password");
          }
        }

      }
      else{
        //console.log("Not Found");
        alert("Email does not Exists");
        setformData({Email:''});
      }
      
    };

    return <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Login Page</title>
    <link rel="stylesheet" type="text/css" href="login.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
      crossOrigin="anonymous"
    />
    <div className="container">
      <div className="row header">
        hello
        <div className="col-lg box1" />
      </div>
       <div className="row middle">
        <div className="col-lg-3" />
        <div className="col-lg-6 box2">
          <div className="login_text">LOGIN</div>
          <div className="m-4 input">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              &nbsp;&nbsp;Email
            </label>
            <input
              type="email"
              name="Email"
              className="form-control border-2"
              id="Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="m-4 input">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              &nbsp;&nbsp;Password
            </label>
            <input
              type="password"
              name="Password"
              className="form-control border-2"
              id="Password"
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" id="buttton" onClick={handlelogin}>
            LOG-IN
          </button>
          <Link to='/signup'  className="btn btn-primary" id="buttton" >SIGN-UP</Link>
        </div>
        <div className="col-lg-3"/>
      </div> 
      <div className="row footer">
        <div className="col-lg box1"/>
      </div>
    </div>
  </>
  
}
export default Login;