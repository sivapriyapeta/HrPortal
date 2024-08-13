import React, { useContext, useEffect } from "react";
import { user, loggedIn } from "./Context";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();
    const [userRole, setUserRole] = useContext(user);
    const [loginStatus, setLoginStatus] = useContext(loggedIn);

    window.localStorage.removeItem("userType");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("isloggedIn");

    useEffect(() => {
        setUserRole(null);
        setLoginStatus(false);
    }, [setUserRole, setLoginStatus])
    
    return(
        <>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h4 id="employeeDashboard" className="formHeading mb-4" style={{textAlign:"right"}}>
                        Successfully LoggedOut!
                    </h4>
                    <button type="submit" name="login" className="btn btn-primary mt-3" onClick={() => navigate('/login') }>
                        Back To Login</button>
                </div>
            </div>
        </>
    );
}