import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

export default function AddEmployee(){
    function createRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const [addEmpInfo, setAddEmpInfo] = useState({
        "firstName" : "",
        "lastName" : "",
        "emailId" : "",
        "employeeId" : "",
        "employeeDesignation" : "",
        "joiningDate" : "",
        "gender" : "",
        "baseLoc" : "",
        "role" : "",
        "salary" : "",
        "tempPwd" : ""
    })

    function ResetValues(){
        setAddEmpInfo({
            ...addEmpInfo,
            "firstName" : "",
            "lastName" : "",
            "emailId" : "",
            "employeeId" : "",
            "employeeDesignation" : "",
            "joiningDate" : "",
            "gender" : "",
            "baseLoc" : "",
            "role" : "",
            "salary" : "",
            "tempPwd" : "",
        });
    }

    function AddEmployee(e){
        e.preventDefault();
        const addEmployeeData = 
            {
                "FirstName": addEmpInfo.firstName,
                "LastName": addEmpInfo.lastName,
                "Email": addEmpInfo.emailId,
                "Role": addEmpInfo.role,
                "id": addEmpInfo.employeeId,
                "Designation": addEmpInfo.employeeDesignation,
                "JoiningDate":addEmpInfo.joiningDate,
                "Gender": addEmpInfo.gender,
                "BaseLocation": addEmpInfo.baseLoc,
                "password": createRandomString(8),
                "Salary": addEmpInfo.salary
            };
        axios.post(`http://localhost:5000/Employee_Details`, addEmployeeData)
        .then((data) => 
            {
                var submissionResponse = document.getElementById("submissionResponse");
                var validationResult = document.getElementById("validationResult");
                if(validationResult !== null){
                    submissionResponse.removeChild(document.getElementById("validationResult"));
                }
                if(data.length === 0){
                    submissionResponse.insertAdjacentHTML("afterend", `<span id="validationResult">Employee Registration Failed!</span>`);
                    submissionResponse.style.display = "block";
                }
                else{
                    submissionResponse.insertAdjacentHTML("beforeend", `<span id="validationResult">Employee with Id: ${data.data.id} successfully Created!</span>`);
                    submissionResponse.style.display = "block";
                    ResetValues();
                }
            }
        )
        .catch((error) => {
            console.error(error);
        });
    }
    return(
        <>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <form id="" className="formFieldsAlign" method="POST" onSubmit={AddEmployee}>
                        <div className="row">
                            <div className="col-6">
                                <h4 className="mt-4 mb-4 formHeading">Personal Details</h4>
                                <Form.Check 
                                    inline
                                    type="radio"
                                    label="Male"
                                    value="Male"
                                    name="gender"
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, gender:e.target.value})}}
                                />
                                <Form.Check
                                    inline 
                                    type="radio"
                                    label="Female"
                                    value="Female"
                                    name="gender"
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, gender:e.target.value})}}
                                />
                                <Form.Control
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="First Name" 
                                    name="firstName"
                                    label = "First Name"
                                    value={addEmpInfo.firstName}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, firstName:e.target.value})}}
                                />
                                <Form.Control 
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="Last Name" 
                                    name="lastName"
                                    label = "Last Name"
                                    value={addEmpInfo.lastName}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, lastName:e.target.value})}}
                                />
                                <Form.Control 
                                    type="email" 
                                    className="form-control mb-3" 
                                    placeholder="Email" 
                                    name="emailId"
                                    value={addEmpInfo.emailId}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, emailId:e.target.value})}
                                }/>
                            </div>
                            <div className="col-6">
                                <h4 className="mt-4 mb-4 formHeading">Employment Details</h4>
                                <br></br>
                                <Form.Control 
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="Employee Id" 
                                    name="employeeId"
                                    value={addEmpInfo.employeeId}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, employeeId:e.target.value})}}
                                />
                                <Form.Control 
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="Employee Designation" 
                                    name="employeeDesignation"
                                    value={addEmpInfo.employeeDesignation}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, employeeDesignation:e.target.value})}}
                                />
                                <Form.Control
                                    type="date"
                                    name="datepic"
                                    className="form-control mb-3" 
                                    placeholder="DateRange"
                                    value={addEmpInfo.joiningDate}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, joiningDate:e.target.value})}}
                                />
                                <Form.Control 
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="Salary" 
                                    name="salary"
                                    value={addEmpInfo.salary}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, salary:e.target.value})}}
                                />
                                <Form.Select 
                                    name="baseLoc" 
                                    className="form-control mb-3" 
                                    value={addEmpInfo.baseLoc}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, baseLoc:e.target.value})} }> 
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
                                    value={addEmpInfo.role}
                                    onChange={(e) => {setAddEmpInfo({...addEmpInfo, role:e.target.value})} }> 
                                    <option value="-1">Select Role</option>
                                    <option value="NonAdmin">Non_Admin</option>
                                    <option value="Admin">Admin</option>
                                </Form.Select>
                                <p>
                                    <button
                                        type="submit" 
                                        name="addEmployee" 
                                        className="btn btn-primary mt-3"
                                        style={{float:"right"}}>Add Employee
                                    </button>
                                </p>
                            </div>
                        </div> 
                        <p id="submissionResponse"></p>
                    </form>
                </div>
            </div>
        </>
    );
}