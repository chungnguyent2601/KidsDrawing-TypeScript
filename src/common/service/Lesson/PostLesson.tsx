import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getLesson } from "./GetLesson";

export function postLesson(data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/lesson-time`, {
                    method: "POST",
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
                        dispatch(postLesson(data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (val => {
                console.log(val)
                dispatch(fetchDataSuccess(data))
                dispatch(getLesson())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}