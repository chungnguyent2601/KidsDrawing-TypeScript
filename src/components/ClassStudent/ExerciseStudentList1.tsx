import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserGradeExerciseByStudentAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassStudent";
import { logout } from "../../store/actions/account.actions";
import ExerciseSectionList1 from "./ExerciseSectionList1";
import "./ManageStudent.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

const ExerciseStudentList1: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('student_id');
    var student_id: string= "";
    if (id_y !== null) {
        student_id = id_y;
    }

    var id_z = localStorage.getItem('class_id');
    var class_id: string= "";
    if (id_z !== null) {
        class_id = id_z;
    }
    
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
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
                    dispatch(logout())
                    trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id,student_id))
                }
            }
            else {
                trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id,student_id))
            }
        }
    }, [dispatch, access_token, refresh_token, student_id, class_id]);

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
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                        <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" />
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                        </div>
                    </div>
                    <div> 

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4" id="topcard-user">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài tập</h6>
                        </div>
                        <div className="card-body">
                            <ExerciseSectionList1 />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default ExerciseStudentList1;