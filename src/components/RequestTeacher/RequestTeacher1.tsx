import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { IRootPageStateType, IStateType, IStudentLeaveState, ITeacherLeaveState } from "../../store/models/root.interface";
import "./RequestTeacher.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import TeacherLeaveList from "./TeacherLeaveList";
import { getTeacherLeaveByTeacher } from "../../common/service/TeacherLeave/GetTeacherLeaveByTeacher";
import { ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

const RequestTeacher1: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
    console.log(student_leaves)
    console.log(teacher_leaves)
    const { promiseInProgress } = usePromiseTracker();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberTeacherRegisterSuccessfullCount: number = student_leaves.leaves.length;
    const numberTeacherNotRegisterCount: number = teacher_leaves.leaves.length;
    var id_x = localStorage.getItem('id');
    var id: any = "";
    if (id_x !== null) {
        id = id_x;
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
                    trackPromise(getTeacherLeaveByTeacher(dispatch, id))
                }
            }
            else {

                trackPromise(getTeacherLeaveByTeacher(dispatch, id))
            }
        }

    }, [dispatch, access_token, refresh_token, id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Yêu cầu", "Giáo viên"));
    }, [path.area, dispatch])


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
                <ToastContainer />
                <div className="row">
                    <TopCard title="SỐ YÊU CẦU NGHỈ HỌC" text={`${numberTeacherRegisterSuccessfullCount}`} icon="book" class="primary" />
                    <TopCard title="SỐ YÊU CẦU DẠY THAY" text={`${numberTeacherNotRegisterCount}`} icon="book" class="primary" />
                    {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
                </div>

                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4" id="topcard-user">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách yêu cầu dạy thay</h6>
                            </div>
                            <div className="card-body">
                                <TeacherLeaveList />
                            </div>
                        </div>
                    </div>
                </div>


            </Fragment>
    );
};

export default RequestTeacher1;