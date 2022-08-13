import { fetchDataRequest, fetchDataError, removeArtType } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function deleteArtType(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/art-type/${id}`, {
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
                        dispatch(deleteArtType(id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (data => {
                console.log(data)
                dispatch(removeArtType(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}