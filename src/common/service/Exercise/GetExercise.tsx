import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeExerciseAll, initialExercise, addExercise } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface exercise {
    id: any;
    name: string;
    description: string;
    section_id: number;
    level_id: number;
    deadline: string;
    level_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}
export function getExercise() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercises`, {
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
                        dispatch(getExercise())
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
                dispatch(removeExerciseAll())
                //console.log(data.body.exercises)
                data.body.exercise_times.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        deadline: ele.deadline,
                        section_id: ele.section_id,
                        level_id: ele.level_id,
                        level_name: ele.level_name,
                        section_name: ele.section_name,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialExercise(exercise));
                    }
                    else{
                        return dispatch(addExercise(exercise))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}