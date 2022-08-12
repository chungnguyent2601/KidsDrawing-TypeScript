import { fetchDataRequest, fetchDataSuccess, fetchDataError, addTimeScheduleTeacher, removeTimeScheduleTeacherAll } from "../../../store/actions/time_schedule_teacher.action";

interface TimeScheduleTeacher {
    class_name: string;
    start_time: string;
    end_time: string;
}
export function getScheduleTeacher(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/classes/teacher/${id}`, {
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
                dispatch(removeTimeScheduleTeacherAll())
                //console.log(data.body.schedule_time)
                data.body.schedule_time.map((ele: any, index: any) => {
                    let x = Object.values(ele)
                    let y = Object.keys(ele)
                    x.map((ele_1: any, idx: any) => {
                        //console.log(ele_1)
                        return Object.values(ele_1).map((ele_2: any) => {
                            //console.log(ele_2)
                            let x_1 = Object.values(ele_2)
                            x_1.map((ele_3: any) => {
                                ele_3.map((ele_4: any) => {
                                    console.log(ele_4)
                                    if (ele_4.length !== 0){
                                        let time: TimeScheduleTeacher = {
                                            class_name: y[idx],
                                            start_time: ele_4[0],
                                            end_time: ele_4[1]
                                        }
                                        dispatch(addTimeScheduleTeacher(time))
                                    }
                                })
                            })
                        })
                    })
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}