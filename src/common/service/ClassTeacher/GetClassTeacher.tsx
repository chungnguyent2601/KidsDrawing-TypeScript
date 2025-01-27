import { fetchDataSuccess, fetchDataError, removeDoinglClassAll, removeDoneClassAll, initialDoinglClass, initialDoneClass,  addDoinglClass, addDoneClass } from "../../../store/actions/class_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ClassTeacher {
    id: any;
    name: string;
    course_id: number;
    review_star: number;
    link_url: string;
    semester_class_id: number;
    user_register_teach_semester: number;
    security_code: string;
    total_student: number;
    num_of_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
}
export function getClassTeacher(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/classes/teacher-list/${id}`, {
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
                        dispatch(getClassTeacher(dispatch, id))
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
                dispatch(removeDoinglClassAll())
                dispatch(removeDoneClassAll())
                data.body.classes.map((ele: any, index: any) => {
                    var class_teacher: ClassTeacher = {
                        id: ele.id,
                        name: ele.name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_class_id: ele.semester_class_id,
                        link_url: ele.link_url,
                        review_star: ele.review_star,
                        user_register_teach_semester: ele.user_register_teach_semester,
                        security_code: ele.security_code,
                        total_student: ele.total_student,
                        num_of_section: ele.num_of_section,
                        schedule: ele.schedule,
                        course_name: ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name
                    }
                    console.log(class_teacher)

                    if (ele.status == 'DOING') {
                        return dispatch(addDoinglClass(class_teacher))
                    }
                    else {
                        return dispatch(addDoneClass(class_teacher))
                    }
                    
                })

                
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}