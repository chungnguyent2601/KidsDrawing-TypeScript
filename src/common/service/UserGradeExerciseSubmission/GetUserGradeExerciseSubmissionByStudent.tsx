import jwt_decode from "jwt-decode";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, addUserGradeExerciseSubmission, removeUserGradeExerciseSubmissionAll} from "../../../store/actions/user_grade_exercise_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_grade_contest {
    student_id: number;
    student_name: string;
    exercise_name: string;
    time_submit: string;
    deadline: string;
    description: string;
    image_url: string;
    exercise_submission_id: number;
    feedback: string;
    score: number;
    time: string;
}
export function getUserGradeExerciseByStudent(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-grade-exercise-submission/student/${id}`, {
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
                        dispatch(getUserGradeExerciseByStudent(id))
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
                dispatch(removeUserGradeExerciseSubmissionAll())
                console.log(data.body.UserGradeExerciseSubmission)
                data.body.UserGradeExerciseSubmission.map((ele: any, index: any) => {
                    var user_grade_contest: user_grade_contest = {
                        student_id: ele.student_id,
                        exercise_name: ele.exercise_name,
                        time_submit: ele.time_submit,
                        deadline: ele.deadline,
                        description: ele.description,
                        image_url: ele.image_url,
                        exercise_submission_id: ele.exercise_submission_id,
                        student_name: ele.student_name,
                        feedback: ele.feedback,
                        score: ele.score,
                        time: ele.time
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addUserGradeExerciseSubmission(user_grade_contest))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}