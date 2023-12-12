import React, { useState } from "react";
import styles from "./signup2.css"
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    
        const [formData,setformData] = useState({
            Email:'',
            Password:'',
            RePass:'',
            MobileNumber:'',
            Location:'',
        });

        const [error,seterror] = useState({
            Email:'',
            Password:'',
            RePass:'',
        });

        const navigate = useNavigate();

        const [user,setuser] = useState(()=>{
            const storedItem = localStorage.getItem('userData_todo');
            return storedItem ? JSON.parse(storedItem):[];
        });

        // console.log(user);

       
        //localStorage.setItem('userData_todo',JSON.stringify(user));

        const handleInputChange = (e)=>{
            //console.log(e.target)
            const {name,value} = e.target;
                setformData({
                    ...formData,[name]:value,
                });  
             //setformData(e.target.value)
        };

        const validate = ()=>{
            if(formData.Password !== formData.RePass){
                seterror({
                    ...error,RePass:'Password does not match'
                });
                alert('password does not match');
                return false;
            }
            if(formData.Email===''||formData.Password===''){
                alert("Fill the remaining fields")
                return false;
            }
            seterror({
                ...error,RePass:''
            });
            return true;
        };

        const isEmailExists = (Email)=>{
            return user.some((user)=>user.Email === Email)
        }

        const handleSubmit = (e)=>{
            e.preventDefault();
            console.log("handlesubmit invoked");

            if(!validate()){
                // alert('password does not match');
                return;
            }

            if(isEmailExists(formData.Email)){
                seterror({
                    ...error,Email:'email Already exists'
                });
                alert('Email Already Exists');
                return;
            }

            const newUser = {...formData};
            setuser(prevUser=>[...prevUser,newUser]);
            localStorage.setItem('userData_todo',JSON.stringify([...user,newUser]));
            

            setformData({
                Email: '',
                Password: '',
                RePass: '',
                MobileNumber: '',
                Location: '',
            });
            
            seterror({
                Email: '',
                Password: '',
                RePass: ''
            });
            
            navigate('/login');
            
        }
    
        


    return <>
    <>
  <title>SIGNUP PAGE</title>
  <link rel="stylesheet" type="text/css" href="signup2.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossOrigin="anonymous"
  />
<div className="container">
    <div className="headersignup">
        <img id="midpic" />
    </div>    
    <div className="middlesp">
        <div className="middleleftsp">
        </div>
        <div className="middlecentersp">
            <div id="register">REGISTER</div>
      
            <div id="inputdivsp">
                <label className="form-label">E-Mail</label>
                <input 
                    type="email"
                    name="Email" 
                    id="Email" 
                    className="form-control"
                    value={formData.Email}
                    onChange={handleInputChange} 
                />
            </div>
      
            <div id="inputdivsp">
                <label htmlFor="inputPassword5" className="form-label">
                Password
                </label>
                <input
                    type="password"
                    id="inputPassword5"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    name="Password"
                    value={formData.Password}
                    onChange={handleInputChange}
                />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and
                    numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>

            <div id="inputdivsp">
                <label htmlFor="inputPassword5" className="form-label">
                    Re-Password
                </label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    name="RePass"
                    value={formData.RePass}
                    onChange={handleInputChange}
                />
                <div id="passwordHelpBlock" 
                    className="form-text"
                    style={{color:'red'}}>
                        {error.RePass && <p>{error.RePass}</p>}
                </div>
            </div>

            <div id="inputdivsp">
                <label className="form-label">Address (optional)</label>
                <input 
                    type="text" 
                    id="address" 
                    className="form-control"
                />
            </div>

            <div id="inputdivsp">
                <label className="form-label">Location</label>
                <input 
                    type="Location" 
                    id="location" 
                    className="form-control"
                    name="Location"
                    value={formData.Location}
                    onChange={handleInputChange}
                />
            </div>
      
            <div id="inputdivsp">
                <label className="form-label">Mobile Number</label>
                <input 
                    type="Numbers" 
                    id="MobileNumber" 
                    className="form-control"
                    name="MobileNumber"
                    value={formData.MobileNumber}
                    onChange={handleInputChange} 
                />
            </div>
            <div id="buttondivsp">
                {/* <button id="buttonsp">Submit</button> */}
                <button  
                className=" buttonsp btn btn-primary" 
                style={{margin:'10px'}}
                onClick={handleSubmit}
                >
                Submit
                </button>
            </div>
        </div>
        <div className="middlerightsp" />
        </div>
    <div/>
    <div className="footersignup">
        <img id="midpic"/>
    </div>
</div>
</>

</>
}
export default Signup;