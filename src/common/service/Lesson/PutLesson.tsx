import { fetchDataRequest, fetchDataSuccess, editLesson, fetchDataError } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function putLesson(id: any, data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/lesson-time/${id}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(putLesson(id,data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (data => {
                console.log(data)
                console.log(id)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}