import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/contest.action";
import { removeWaiting } from "../../../store/actions/user_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getUserRegisterJoinSemesterByPayer } from "./GetUserRegisterJoinSemesterByPayer";
import { getUserRegisterJoinSemesterByStudent } from "./GetUserRegisterJoinSemesterStudent";

export function deleteUserRegisterJoinSemester1(user_register_join_semester_id: number, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var role = localStorage.getItem('role')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester/${user_register_join_semester_id}`, {
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
                        dispatch(deleteUserRegisterJoinSemester1(user_register_join_semester_id, idx))
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
                toast.update(idx, { render: "Xóa thành công!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                if (roleUser === "PARENT") {
                    getUserRegisterJoinSemesterByPayer(dispatch, id)
                }
                else if (roleUser === "STUDENT") {
                    getUserRegisterJoinSemesterByStudent(dispatch, id)
                }
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Xóa không thành công!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}