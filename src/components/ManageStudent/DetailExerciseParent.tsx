import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";
import "./ManageStudent.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import Loading from "../../common/components/Loading";
import { getUserGradeExerciseByExerciseAndStudent } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByExerciseStudent";

const DetailExerciseParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const user_grade_exercise_submissions: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const { promiseInProgress } = usePromiseTracker();

    var id_x = localStorage.getItem("exercise_description");
    let exercise_description: string = "";
    if (id_x !== null) {
        exercise_description = id_x;
    }

    var id_y = localStorage.getItem("student_id");
    let id: number = 0;
    if (id_y !== null) {
        id = parseInt(id_y);
    }

    var id_y = localStorage.getItem('exercise_submission_id');
    var exercise_submission_id: number = 0;
    if (id_y !== null) {
        exercise_submission_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem("exercise_id");
    let exercise_id: number = 0;
    if (id_z !== null) {
        exercise_id = parseInt(id_z);
    }

    var id_k = localStorage.getItem("exercise_name");
    let exercise_name = "";
    if (id_k !== null) {
        exercise_name = (id_k);
    }

    var id_h = localStorage.getItem("exercise_level_name");
    let exercise_level_name = "";
    if (id_h !== null) {
        exercise_level_name = (id_h);
    }

    var id_i = localStorage.getItem("deadline");
    let deadline = "";
    if (id_i !== null) {
        deadline = (id_i);
    }

    var id_t = localStorage.getItem("time_submit");
    let time_submit = "";
    if (id_t !== null) {
        time_submit = (id_t);
    }

    var id_j = localStorage.getItem("url_exercise_submission");
    let url_exercise_submission = "";
    if (id_j !== null) {
        url_exercise_submission = (id_j);
    }

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    let percentage = user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].score : 0;
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getUserGradeExerciseByExerciseAndStudent(dispatch, exercise_id, id))
                }
            }
            else {
                trackPromise(getUserGradeExerciseByExerciseAndStudent(dispatch, exercise_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, exercise_id, id]);


    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);


    return (
        promiseInProgress ?
            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
                        </div>
                    </div>
                </div>
            </div> : <Fragment>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className="col-xl-12 col-md-12 mb-2">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Thông tin bài tập</h4>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Tên: {exercise_name}</p>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Nội dung: <span dangerouslySetInnerHTML={{ __html: exercise_description }}></span></p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Tỉ lệ đánh giá: {exercise_level_name} %</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Deadline: {deadline.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Đã nộp lúc: {time_submit.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Bài làm của học sinh</h4>
                                        </div>
                                        <div className="row mx-auto">
                                        <PhotoProvider>
                                            <PhotoView src={user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].image_url : ""}>
                                                <img src={user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].image_url : ""} alt="" className="center-x" />
                                            </PhotoView>
                                        </PhotoProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                            <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Điểm</h4>
                                        </div>
                                        <div className="row mx-auto" style={{ width: 200, height: 200 }}>
                                                <CircularProgressbar value={percentage*10} text={`${percentage}`} />;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Nhận xét</h4>
                                        </div>
                                        <div className="row mx-auto">
                                            {user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].feedback : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
    );
};

export default DetailExerciseParent;