import { fetchDataSuccess, fetchDataError, removeStudentLeaveApprovedAll, removeStudentLeaveNotApprovedAll, removeStudentLeaveNotApprovedNowAll, addStudentLeaveApproved, addStudentLeaveNotApproved, addStudentLeaveNotApprovedNow } from "../../../store/actions/student_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface StudentLeave {
    id: any;
    section_id: number;
    section_name: string;
    class_id: number;
    class_name: string;
    student_id: number;
    time_approved: string;
    section_number: number;
    student_name: string;
    reviewer_id: number;
    description: string;
    status: string;
    create_time: string;
    update_time: string;
}
export function getStudentLeaveByClassAndParent(dispatch: any, class_id: number, parent_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/student-leave/class-parent/${class_id}/${parent_id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    }
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(getStudentLeaveByClassAndParent(dispatch, class_id, parent_id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeStudentLeaveApprovedAll())
                dispatch(removeStudentLeaveNotApprovedNowAll())
                dispatch(removeStudentLeaveNotApprovedAll())
                console.log(data.body.student_leave)
                data.body.student_leave.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var student_leave: StudentLeave = {
                        id: ele.id,
                        description: ele.description,
                        section_id: ele.section_id,
                        class_id: ele.class_id,
                        class_name: ele.class_name,
                        student_id: ele.student_id,
                        reviewer_id: ele.reviewer_id,
                        status: ele.status,
                        time_approved: ele.time_approved,
                        section_number: ele.section_number,
                        student_name: ele.student_name,
                        section_name: ele.section_name,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    //console.log(strDate.substring(0, 16))
                    if (student_leave.status === "Approved"){
                        return dispatch(addStudentLeaveApproved(student_leave));
                    }
                    else if (student_leave.status === "Not approved"){
                        return dispatch(addStudentLeaveNotApproved(student_leave));
                    }
                    else {
                        return dispatch(addStudentLeaveNotApprovedNow(student_leave));
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}