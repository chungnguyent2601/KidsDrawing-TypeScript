import { fetchDataRequest, fetchDataError } from "../../../store/actions/art_age.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function postNotificationByStudent(id: any,data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/sendEmail/class/${id}`, {
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
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postNotificationByStudent(id,data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}