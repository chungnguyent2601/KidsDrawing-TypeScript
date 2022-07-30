import { fetchDataRequest, fetchDataError } from "../../../store/actions/schedule_item.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getScheduleItem } from "./GetScheduleItem";

export function postScheduleItem(data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/schedule-item`, {
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
                        dispatch(postScheduleItem(data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (data => {
                console.log(data)
                dispatch(getScheduleItem())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}