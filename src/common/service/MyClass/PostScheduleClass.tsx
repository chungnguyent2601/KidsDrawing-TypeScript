import { toast } from "react-toastify";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getMyClass } from "./GetMyClass";

export function postScheduleClass(id: any, idx: any) {
    console.log("post ++")
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        fetch(
                `${process.env.REACT_APP_API_URL}/semester/schedule-class/${id}`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postScheduleClass(id, idx))
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
                toast.update(idx, { render: "Xếp lớp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                getMyClass(dispatch)
                
            })
            .catch(error => {
                toast.update(idx, { render: "Xếp lớp không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}