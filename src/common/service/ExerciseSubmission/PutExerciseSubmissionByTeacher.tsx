import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";


export function putExerciseSubmissionByTeacher(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercise-submission/teacher`, {
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
                        dispatch(putExerciseSubmissionByTeacher(data, idx))
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
                toast.update(idx, { render: "Chỉnh bài nộp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER , autoClose: 1000});
            })
            .catch(error => {
                toast.update(idx, { render: "Chỉnh bài nộp không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}