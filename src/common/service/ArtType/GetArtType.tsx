import { fetchDataSuccess, fetchDataError, removeArtTypeAll, initialArtType, addArtType } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ArtType {
    id: any;
    name: string;
    description: string;
}
export function getArtType(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/art-type?page=0&size=5`, {
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
                        dispatch(getArtType(dispatch))
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
                dispatch(removeArtTypeAll())
                console.log(data.body.art_type)
                data.body.art_type.map((ele: any, index: any) => {
                    var artType: ArtType = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialArtType(artType));
                    }
                    else{
                        return dispatch(addArtType(artType))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}