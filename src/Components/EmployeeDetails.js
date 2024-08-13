import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function EmployeeDetails(){
    const [empInfo, setEmpInfo] = useState([]);
    const [empLeaveApply, setEmpLeaveApply] = useState({
        "leaveId" : "",
        "leaveType" : "",
        "reason" : "",
        "status" : "",
    });

    const [empLeaveInfo, setEmpLeaveInfo] = useState([]);
    const employeeId = window.localStorage.getItem("id");

    useEffect(() => {
        const fetchUser = async() => {
            const employeeId = window.localStorage.getItem("id");
            try{
                const [employeeDetails, leaveDetails] = await Promise.all([
                    axios.get(`http://localhost:5000/Employee_Details?id=${employeeId}`),
                    axios.get(`http://localhost:5500/Leave_Details?id=${employeeId}`)
                ]) 
                const welcomeMessage = document.getElementById("employeeDashboard");
                welcomeMessage.innerText = "Welcome "+ employeeDetails.data[0].FirstName + employeeDetails.data[0].LastName + " (" + employeeDetails.data[0].id + ")";
                setEmpInfo(employeeDetails.data[0]);
                setEmpLeaveInfo(leaveDetails.data[0]);
            }catch(error) {
                console.error(error.message);
            }
        }
        fetchUser();
    }, [])

    function ResetValues(){
        setEmpLeaveApply({
            ...empLeaveApply,
            "leaveId" : "",
            "leaveType" : "",
            "reason" : "",
            "status" : "",
        })
    }

    function SubmitLeave(e){
        e.preventDefault();
        const addLeaveData = {
            "LeaveId" : empLeaveInfo.Requests.length+1,
            "LeaveType" : empLeaveApply.leaveType,
            "Reason" : empLeaveApply.reason,
            "Status" : "Pending"
        };
        empLeaveInfo.Requests.push(addLeaveData);
        
        axios.put(`http://localhost:5500/Leave_Details/${employeeId}`, empLeaveInfo)
            .then((data) => {
                var submissionResponse = document.getElementById("applyLeaveResponse");
                var validationResult = document.getElementById("validationResult");
                if(validationResult !== null){
                    submissionResponse.removeChild(document.getElementById("validationResult"));
                }
                if(data.length === 0){
                    submissionResponse.insertAdjacentHTML("afterend", `<span id="validationResult">Failed to Submit Leave Request!</span>`);
                    submissionResponse.style.display = "block";
                }
                else{
                    submissionResponse.insertAdjacentHTML("beforeend", `<span id="validationResult">Leave Request Submitted Successfully!</span>`);
                    submissionResponse.style.display = "block";
                    ResetValues();
                }
            })
        .catch(error => {
            console.log(error);
        })
    }

    function GetLeaveType(leaveInfo){
        switch(leaveInfo.leaveType){
            case "Sick" : 
                return empLeaveInfo.Sick;
            case "Casual" : 
                return empLeaveInfo.Casual;
            default :
                return null;
        }
    }
    
    return(
        <>
            <div className="row">
                <h4 id="employeeDashboard" className="formHeading mb-4" style={{textAlign:"right"}}>Welcome</h4>
                <div className="col-1"></div>
                <div className="col-5">
                    <h4 className="mt-4 mb-4 formHeading">Personal Details</h4>
                    <table>
                        <tbody className="employeeDetails">
                            <tr>
                                <td>First Name</td>
                                <td>{empInfo.FirstName}</td>
                            </tr> 
                            <tr>
                                <td>Last Name</td>
                                <td>{empInfo.LastName}</td>
                            </tr>
                            <tr>
                                <td>Personal Email</td>
                                <td>{empInfo.Email}</td>
                            </tr> 
                            <tr>
                                <td>Designation</td>
                                <td>{empInfo.Designation}</td>
                            </tr> 
                            <tr>
                                <td>Base Location</td>
                                <td>{empInfo.BaseLocation}</td>
                            </tr> 
                            <tr>
                                <td>Gross Salary</td>
                                <td>{empInfo.Salary}</td>
                            </tr> 
                            <tr>
                                <td>Joining Date</td>
                                <td>{empInfo.JoiningDate}</td>
                            </tr>  
                        </tbody>
                    </table>    
                </div>
                <div className="col-6">
                    <h4 className="mt-4 mb-4 formHeading">Leave Request</h4>
                    <form id="" className="formFieldsAlign" method="POST" onSubmit={SubmitLeave}>
                        <Form.Select 
                            name="leaveType" 
                            className="form-control mb-3" 
                            value={empLeaveApply.leaveType}
                            onChange={(e) => {setEmpLeaveApply({...empLeaveApply, leaveType:e.target.value})} }> 
                                <option>Select Leave Type</option>
                                <option value="Sick">Sick Leave</option>
                                <option value="Casual">Casual Leave</option>
                                <option value="Optional">Optional Holiday</option>
                                <option value="Long">Long Leave</option>
                        </Form.Select>
                        {
                            empLeaveApply.leaveType &&
                            <>
                                <Form.Control
                                    type="text" 
                                    className="form-control mb-3" 
                                    name="leaveCount"
                                    label = "Available Leaves"
                                    value={GetLeaveType(empLeaveApply)}
                                    onChange={(e) => {setEmpLeaveApply({...empLeaveApply, reason:e.target.value})}} disabled
                                />
                                <Form.Control
                                    type="text" 
                                    className="form-control mb-3" 
                                    placeholder="Reason" 
                                    name="leaveReason"
                                    label = "Reason"
                                    value={empLeaveInfo.Reason}
                                    onChange={(e) => {setEmpLeaveApply({...empLeaveApply, reason:e.target.value})}}
                                />

                                <p>
                                    <button
                                        type="submit" 
                                        name="Submit" 
                                        className="btn btn-primary mt-3"
                                        style={{float:"right"}}>Apply
                                    </button>
                                </p>
                            </>
                        }
                        <p id="applyLeaveResponse"></p>
                    </form>           
                </div>
            </div>
        </>
    );
}