import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {user, loggedIn} from './Context';
import { useContext } from "react";

export default function Login() 
{
    window.localStorage.clear();
    const navigate = useNavigate();
    const [role, setRole] = useContext(user);
    const [logStatus, setLogStatus] = useContext(loggedIn);

    const [loginStatus, setLoginStatus] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        "id":"",
        "password":""
    })

    function validateLogin(e){
        e.preventDefault();
        const encodedValue = encodeURIComponent(loginInfo.id);
        axios.get(`http://localhost:5000/Employee_Details?id=${encodedValue}`)
        .then((data) => {
            if(data.data.length === 0){
                setLoginStatus("No Profile");
            }
            else if(data.data[0]?.password !== loginInfo.password){
                setLoginStatus("Pwd Error");
            }
            else{
                window.localStorage.setItem("token", data.data[0]);
                window.localStorage.setItem("userType", data.data[0].Role);
                window.localStorage.setItem("id", data.data[0].id);
                window.localStorage.setItem("isloggedIn", true);
                navigate('/employeeDetails');
                setLogStatus({isLoggedIn : true});
                setRole({role : data.data[0].Role});
            }
        })
    }

    return(
        <>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-4 formSection">
                    <h4 className="mt-4 mb-4 formHeading">Welcome to HR Portal</h4>
                    <h4 className="mt-4 mb-4 formHeading">Login</h4>
                    <form className="formFieldsAlign" onSubmit={validateLogin}>
                        <input type="text" name="loginId" placeholder="Employee Id" className="form-control"
                        onChange={(e) => {setLoginInfo({...loginInfo, id:e.target.value})}}/>
                        <br/>
                        <input type="password" name="loginPassword" placeholder="Password" className="mb-3 form-control"
                        onChange={(e) => {setLoginInfo({...loginInfo, password:e.target.value})}}/>
                        {
                            loginStatus === "No Profile" && 
                                <p id="errorMessage">
                                    <span id="validationError">No Profile Found!</span>
                                </p>
                        }
                        {
                            loginStatus === "Pwd Error" && 
                                <p id="errorMessage">
                                    <span id="validationError">Wrong Password!</span>
                                </p>
                        }
                        <p id="errorMessage"></p>
                        <p><button type="submit" name="login" className="btn btn-primary mt-3">Login</button></p>
                    </form>
                </div>
                <div className="col-1"></div>
                <div className="col-5">
                    <img src= '..\Images\HR_Portal_Launch.jpg' alt="Hr Portal Responsibilities"
                    className="login_sideNav_img"/>
                </div>
            </div>
        </>
    );
}