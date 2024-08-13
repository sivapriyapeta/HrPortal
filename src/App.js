import './App.css';
import Login from './Components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logout from './Components/Logout';
import EmployeeDetails from './Components/EmployeeDetails';
import AdminDashboard from './Components/AdminDashboard';
import LeaveRequests from './Components/LeaveRequests';
import AddEmployee from './Components/AddEmployee';
import NavigationBar from './Components/NavigationBar';
import {user, loggedIn} from './Components/Context';
import { useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({
    isLoggedIn : window.localStorage.getItem("isloggedIn")
  });
  const [role, setRole] = useState({role : window.localStorage.getItem("userType")});
  
  return (
    <loggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <user.Provider value = {[role, setRole]}>
        <BrowserRouter>
          <div className='container-fluid'>
            <NavigationBar/>
            <Routes>
              <Route path="/" exact Component={Login}/>
              <Route path="/login" exact Component={Login}/>
              <Route path="/logout" exact Component={Logout}/>
              {/* <Route element={<ProtectedRoute/>}> */}
                <Route path="/employeeDetails" exact Component={EmployeeDetails}/>
                <Route path="/admin-dashboard" exact Component={AdminDashboard}/>
                <Route path="/leaveRequests" exact Component={LeaveRequests}/>
                <Route path="/addEmployee" exact Component={AddEmployee}/>
              {/* </Route> */}
            </Routes>
          </div>
        </BrowserRouter>
      </user.Provider>
    </loggedIn.Provider>
  );
}

export default App;