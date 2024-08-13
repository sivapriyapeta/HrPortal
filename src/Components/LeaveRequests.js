import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { user } from "./Context";

export default function LeaveRequests(){
    const [allLeaveInfo, setAllLeaveInfo] = useState([]);
    const employeeId = window.localStorage.getItem("id");

    const [userRole] = useContext(user);

    useEffect(() => {
        axios.get('http://localhost:5500/Leave_Details')
        .then((res) => {
            console.log(res.data);
            setAllLeaveInfo(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    function ApproveLeaveRequest(reqId, reqStatus, empData){
        reqStatus === "Cancel" ? 
            ManageCancelInfo(empData, reqId, reqStatus)
            :
            ManageLeaveInfo(empData, reqId, reqStatus);
        
        axios.put(`http://localhost:5500/Leave_Details/${empData.id}`, empData)
        .then((res) => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function ManageCancelInfo(empData, reqId){
        empData.Requests.splice(reqId-1, 1);
        if(empData.Requests[reqId-1] !== undefined)
        {
            empData.Requests[reqId-1].LeaveId--;
        }
    }

    function ManageLeaveInfo(empData, reqId, reqStatus){
        empData.Requests[reqId-1].Status = reqStatus;
        if(reqStatus === "Approved"){
            switch(empData.Requests[reqId-1].LeaveType){
                case "Sick":
                    empData.Sick--;
                    break;
                case "Casual" :
                    empData.Casual--;
                    break;
                default:
                    break;
            }
        }
    }

    return(
        <>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-9">
                    {
                        userRole.role === "Admin" &&
                        <div>
                            <h4 className="formHeading mb-4">Employee Leave Requests</h4>
                            <table className="table table-striped table-primary">
                                <tbody>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Leave Type</th>
                                        <th>Reason</th>
                                        <th></th>
                                    </tr>
                                    {
                                        allLeaveInfo.map((empLeave, index) => (
                                            empLeave.Manager === employeeId &&
                                            empLeave.Requests.map((request, reqIndex) => (
                                                request.Status === "Pending" && 
                                                <tr key={reqIndex}>
                                                    <td>{empLeave.id}</td>
                                                    <td>{request.LeaveType}</td>
                                                    <td>{request.Reason}</td>
                                                    <td>
                                                            <button
                                                                type="button" 
                                                                name="approve" 
                                                                className="btn btn-primary me-3" onClick={() => {ApproveLeaveRequest(request.LeaveId, "Approved", empLeave)}}>Approve
                                                            </button>
                                                            <button
                                                                type="button" 
                                                                name="reject" 
                                                                className="btn btn-primary me-3" onClick={() => {ApproveLeaveRequest(request.LeaveId, "Rejected", empLeave)}}>Reject
                                                            </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                    
                    <h4 className="formHeading mb-4">My Leave Requests</h4>
                    <table className="table table-striped table-primary">
                        <thead>
                            <tr>
                                {/* //<th>S.No</th> */}
                                <th>Leave Type</th>
                                <th>Reason</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allLeaveInfo.map((myLeave, index) => (
                                    myLeave.id === employeeId &&
                                    myLeave.Requests.map((request, requestId) => (
                                        <tr key={requestId}>
                                            {/* <td></td> */}
                                            <td>{request.LeaveType}</td>
                                            <td>{request.Reason}</td>
                                            <td>
                                                {
                                                    request.Status === "Pending" &&
                                                    <button
                                                        type="button" 
                                                        name="cancel" 
                                                        className="btn btn-primary" onClick={() => {ApproveLeaveRequest(request.LeaveId, "Cancel", myLeave) }}>Cancel
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                    
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
        </>
    );
}