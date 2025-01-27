import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeStudentAll, initialStudent, addStudent } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user {
    id: any,
    username: string,
    email: string,
    password: string,
    status: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    profile_image_url: string,
    sex: string,
    phone: string,
    student_ids: number[];
    student_names: string[];
    parent: string,
    address: string,
    parents: number,
    createTime: string
}
export function getStudentById(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user/${id}`, {
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
                        dispatch(getStudentById(id))
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
                dispatch(removeStudentAll())
                var user: user = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    password: "",
                    status: data.status,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dateOfBirth: data.dateOfBirth,
                    profile_image_url: data.profile_image_url,
                    sex: data.sex,
                    student_ids: data.student_ids,
                    student_names: data.student_names,
                    parent: data.parent_name,
                    phone: data.phone,
                    address: data.address,
                    parents: data.parents,
                    createTime: data.createTime
                }
                return dispatch(initialStudent(user));
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}