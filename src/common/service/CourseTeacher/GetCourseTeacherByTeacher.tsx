import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeNotRegisterCourseAll, removeRegisterSuccessfullCourseAll, initialNotRegisterCourse, initialRegisterSuccessfullCourse, addNotRegisterCourse, addRegisterSuccessfullCourse } from "../../../store/actions/course_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface CourseTeacher {
    id: number;
    name: string;
    course_id: number;
    semester_course_id: number;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    semester_name: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    registration_deadline: string;
}
export function getCourseTeacher(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/course/teacher/${id}`, {
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
                        dispatch(getCourseTeacher(id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeNotRegisterCourseAll())
                dispatch(removeRegisterSuccessfullCourseAll())
                //console.log(data.body.Courses)
                data.body.register_successfull_courses.map((ele: any, index: any) => {
                    var course: CourseTeacher = {
                        id: index,
                        name: ele.name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_course_id: ele.semester_course_id,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        image_url: ele.image_url,
                        art_type_name: ele.art_type_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        schedule: ele.schedule,
                        registration_deadline: ele.registration_deadline

                    }
                    console.log(course)
                    if (index === 0){
                        return dispatch(initialRegisterSuccessfullCourse(course));
                    }
                    else{
                        return dispatch(addRegisterSuccessfullCourse(course))
                    }
                })

                data.body.not_register_courses.map((ele: any, index: any) => {
                    var course: CourseTeacher = {
                        id: index,
                        name: ele.name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_course_id: ele.semester_course_id,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        image_url: ele.image_url,
                        art_type_name: ele.art_type_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        schedule: ele.schedule,
                        registration_deadline: ele.registration_deadline

                    }
                    console.log(course)
                    if (index === 0){
                        return dispatch(initialNotRegisterCourse(course));
                    }
                    else{
                        return dispatch(addNotRegisterCourse(course))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}