import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IContestTeacherState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./ContestTeacher.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { getContestTeacher } from "../../common/service/ContestTeacher/GetContestTeacher";

const ContestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberContestOpeningCount: number = contest_teachers.contest_opening.length;
    const numberContestEndCount: number = contest_teachers.contest_end.length;
    const numberContestNotOpenNowCount: number = contest_teachers.contest_not_open_now.length;
    const numberContestNewCount: number = contest_teachers.contest_not_open_now_not_teacher.length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
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
                    dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                    dispatch(getUserById(id))
                    dispatch(getContestTeacher(id))
                }
            }
            else {
                dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                dispatch(getUserById(id))
                dispatch(getContestTeacher(id))
            }
        }
        dispatch(clearSelectedTeacherRegisterQuatification());
        dispatch(updateCurrentPath("Cuộc thi", ""));
    }, [path.area, dispatch]);

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onTeacherRegisterQuantificationRemove() {
        if (contest_teachers.selectedContestTeacher) {
            setPopup(true);
        }
    }

    const [checked, setChecked] = useState(true);
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="CHƯA DIỄN RA" text={`${numberContestNotOpenNowCount}`} icon="book" class="primary" />
                <TopCard title="ĐANG DIỄN RA" text={`${numberContestOpeningCount}`} icon="book" class="primary" />
                <TopCard title="ĐÃ DIỄN RA" text={`${numberContestEndCount}`} icon="book" class="primary" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>

            <div className="row" id="search-box">
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

            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked === false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Khám phá</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked === true) {
                            setChecked(false)
                        }
                    }}
                        style={{
                            color: checked ? "#2F4F4F" : "#F24E1E"
                        }}>Đã đăng kí</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#ffffff" : "#F24E1E"
                    }}></div>
                </div>
            </div>


            {
                function () {
                    if (checked === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    


                                </div>

                            </Fragment>
                        )
                    }
                    else {
                        return (
                            <Fragment>
                                <div className="row">
                                    
                                </div>

                            </Fragment>
                        )
                    }
                }()
            }


        </Fragment>
    );
};

export default ContestTeacher;