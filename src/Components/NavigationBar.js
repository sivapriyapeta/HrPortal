import React, { useContext } from "react";
import { Link} from 'react-router-dom';
import { user, loggedIn } from "./Context";

export default function NavigationBar(){
    const [userRole] = useContext(user);
    const [loginStatus] = useContext(loggedIn);

    return(
            <>
            {
                loginStatus.isLoggedIn &&
                    <div className="row">
                        <nav className="navbar navbar-expand-lg hr_navbar">
                            <ul className="navbar-nav navBarUnOrderedList">
                                {/* <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li> */}
                                <li className="nav-item">
                                    {
                                        userRole.role === "Admin" &&
                                            <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
                                    }
                                </li>
                                <li className="nav-item">
                                    {
                                        userRole.role === "Admin" &&
                                            <Link to="/addEmployee" className="nav-link">Add Employee</Link>
                                    }
                                </li>
                                <li className="nav-item">
                                    <Link to="/leaveRequests" className="nav-link">Leave Requests</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/employeeDetails" className="nav-link">Employee Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link">Logout</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
            }
        </>
    );
}