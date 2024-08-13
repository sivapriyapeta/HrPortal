import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons" ;
import { faTrashCan } from "@fortawesome/free-regular-svg-icons" ;
import axios from "axios";
import { Form } from "react-bootstrap";

export default function AdminDashboard(){

    const[editInfo, setEditInfo] = useState(false);
    const[empinfo, setEmpInfo] = useState([]);
    //const[deleteId, setDeleteId] = useState("");
    const[empModify, setEmpModify] = useState(
        // {
        //     "id" : "",
        //     "firstName" : "",
        //     "lastName" : "",
        //     "email":"",
        //     "designation":"",
        //     "gender":"",
        //     "role":"",
        //     "baselocation":"",
        //     "salary" : ""
        // }
    );
    useEffect(() => {
        axios.get('http://localhost:5000/Employee_Details')
        .then((res) => {
            setEmpInfo(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    function UpdateEmployee(e){
        e.preventDefault();
        const updateEmployee = {
            "FirstName": empModify.FirstName,
            "LastName": empModify.LastName,
            "Email": empModify.Email,
            "Role": empModify.Role,
            "id": empModify.id,
            "Designation": empModify.Designation,
            "Gender": empModify.Gender,
            "JoiningDate": empModify.JoiningDate,
            "BaseLocation": empModify.BaseLocation,
            "Salary": empModify.Salary,
            "Password":empModify.password,
        }
        axios.put(`http://localhost:5000/Employee_Details/${empModify.id}`, updateEmployee)
        .then((res) => {
            ResetValues();
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }
    function DeleteEmployee(empId){
        window.confirm("Are you sure to delete the associate?") && 
        axios.delete(`http://localhost:5000/Employee_Details/${empId}`)
        .then((res) => {
            window.location.reload();
            console.lo(res);
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    function ResetValues(){
        setEditInfo(false);
    }
    
    return(
        <>
            <div className="row">
                <div className="col-12">
                    <h4 className="formHeading mb-4">Employee Information</h4>
                    <table className="table table-striped table-primary">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Base Location</th>
                                <th>Salary</th>
                                <th></th>
                            </tr>
                            {
                                empinfo.map((emp,index) => (
                                    <tr key={index}>
                                        <td>{emp.id}</td>
                                        <td>{emp.FirstName}</td>
                                        <td>{emp.LastName}</td>
                                        <td>{emp.Email}</td>
                                        <td>{emp.Designation}</td>
                                        <td>{emp.Gender}</td>
                                        <td>{emp.BaseLocation}</td>
                                        <td>{emp.Role}</td>
                                        <td>{emp.Salary}</td>
                                        <td>
                                            <FontAwesomeIcon className="me-3" icon={faPenToSquare} onClick={() => {setEditInfo(true); setEmpModify(emp)}}/>   
                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => {DeleteEmployee(emp.id)}}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        editInfo &&
                        <>
                            <form id="" className="formFieldsAlign" method="POST" onSubmit={UpdateEmployee}>
                                <div className="row">
                                    <div className="col-6">
                                        <h4 className="mt-4 mb-4 formHeading">Personal Details</h4>
                                        <Form.Control
                                            type="text" 
                                            className="form-control mb-3" 
                                            placeholder="First Name" 
                                            name="firstName"
                                            label = "First Name"
                                            value={empModify.FirstName}
                                            onChange={(e) => {setEmpModify({...empModify, FirstName:e.target.value})}}
                                        />
                                        <Form.Control 
                                            type="text" 
                                            className="form-control mb-3" 
                                            placeholder="Last Name" 
                                            name="lastName"
                                            label = "Last Name"
                                            value={empModify.LastName}
                                            onChange={(e) => {setEmpModify({...empModify, LastName:e.target.value})}}
                                        />
                                        <Form.Control 
                                            type="email" 
                                            className="form-control mb-3" 
                                            placeholder="Email" 
                                            name="emailId"
                                            value={empModify.Email}
                                            onChange={(e) => {setEmpModify({...empModify, Email:e.target.value})}}
                                        />
                                        <Form.Control 
                                            type="text" 
                                            className="form-control mb-3" 
                                            placeholder="Employee Id" 
                                            name="employeeId"
                                            value={empModify.id}
                                            onChange={(e) => {setEmpModify({...empModify, id:e.target.value})}}
                                        />
                                        <Form.Control 
                                            type="text" 
                                            className="form-control mb-3" 
                                            placeholder="Employee Designation" 
                                            name="employeeDesignation"
                                            value={empModify.Designation}
                                            onChange={(e) => {setEmpModify({...empModify, Designation:e.target.value})}}
                                        />
                                        {/* <Form.Control
                                            type="date"
                                            name="datepic"
                                            className="form-control mb-3" 
                                            placeholder="DateRange"
                                            value= {empModify.joiningDate}
                                            onChange={(e) => {setEmpModify({...empModify, JoiningDate:e.target.value})}}
                                        /> */}
                                        <Form.Control 
                                            type="text" 
                                            className="form-control mb-3" 
                                            placeholder="Salary" 
                                            name="salary"
                                            value={empModify.Salary}
                                            onChange={(e) => {setEmpModify({...empModify, Salary:e.target.value})}}
                                        />
                                        <Form.Select 
                                            name="baseLoc" 
                                            className="form-control mb-3" 
                                            value={empModify.BaseLocation}
                                            onChange={(e) => {setEmpModify({...empModify, BaseLocation:e.target.value})} }> 
                                            <option>Select Base Location</option>
                                            <option value="Hyderabad">Hyderabad</option>
                                            <option value="Bengaluru">Bengaluru</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Kochi">Kochi</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Pune">Pune</option>
                                        </Form.Select>
                                        <Form.Select 
                                            name="role" 
                                            className="form-control mb-3" 
                                            value={empModify.Role}
                                            onChange={(e) => {setEmpModify({...empModify, Role:e.target.value})} }> 
                                            <option value="-1">Select Role</option>
                                            <option value="NonAdmin">Non_Admin</option>
                                            <option value="Admin">Admin</option>
                                        </Form.Select>
                                        <p>
                                            <button
                                                type="submit" 
                                                name="addEmployee" 
                                                className="btn btn-primary mt-3"
                                                style={{float:"right"}}>Update
                                            </button>
                                        </p>
                                    </div>
                                </div> 
                                <p id="submissionResponse"></p>
                            </form>
                        </>
                    }
                </div>
            </div>
        </>
    );
}