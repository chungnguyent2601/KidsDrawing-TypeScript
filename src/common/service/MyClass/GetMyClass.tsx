import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeMyClassAll, initialMyClass, addMyClass } from "../../../store/actions/my_class.action";
interface MyClass {
    id: number;
    creator_id: number;
    registration_id: number;
    security_code: string;
    name: string;
    create_time: string;
    update_time: string;
}
export function getMyClass() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/classes`, {
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeMyClassAll())
                console.log(data.body.classes)
                data.body.classes.map((ele: any, index: any) => {
                    //var strDate_1 = ele.start_time;
                    //var strDate_2 = ele.end_time;
                    var my_class: MyClass = {
                        id: ele.id,
                        name: ele.name,
                        security_code: ele.security_code,
                        creator_id: ele.creator_id,
                        registration_id: ele.registration_id,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialMyClass(my_class));
                    }
                    else{
                        return dispatch(addMyClass(my_class))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}