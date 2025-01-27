import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/contest.action";
import { removeWaiting } from "../../../store/actions/user_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function deleteUserRegisterJoinContestByContestAndStudent(contest_id: number, student_id: number, idx: any, routeChange: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-contest/contest-student/${contest_id}/${student_id}`, {
                    method: "DELETE",
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
                        dispatch(deleteUserRegisterJoinContestByContestAndStudent(contest_id, student_id, idx, routeChange))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (data => {
                console.log(data)
                toast.update(idx, { render: "Hủy đăng kí thành công!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                setTimeout(function () {
                    routeChange();
                }, 1000); 
            
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Hủy đăng kí không thành công!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}