import { fetchDataSuccess, fetchDataError, removeMyClassAll, initialMyClass, addMyClass } from "../../../store/actions/my_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface MyClass {
    id: any;
    course_id: number;
    course_name: string;
    semester_name: string;
    semester_id: number;
    total_student: number;
    user_register_teach_semester: number;
    security_code: string;
    name: string;
    teacher_name: string;
    create_time: string;
    update_time: string;
}
export function getMyClass(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
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
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(getMyClass(dispatch))
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
                dispatch(removeMyClassAll())
                console.log(data.body.classes)
                data.body.classes.map((ele: any, index: any) => {
                    //var strDate_1 = ele.start_time;
                    //var strDate_2 = ele.end_time;
                    var my_class: MyClass = {
                        id: ele.id,
                        name: ele.name,
                        security_code: ele.security_code,
                        course_id: ele.course_id,
                        course_name: ele.course_name,
                        teacher_name: ele.teacher_name,
                        semester_name: ele.semester_name,
                        semester_id: ele.semester_id,
                        total_student: ele.total_student,
                        user_register_teach_semester: ele.user_register_teach_semester,
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
}