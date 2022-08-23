import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";

const ExamTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = teacherRegisterQuantifications.approveds.length;
    const numberNotApprovedNowCount: number = teacherRegisterQuantifications.not_approved_now.length;


    var exercise_description = localStorage.getItem('exercise_description');
    var exercise_description_: string = "";
    if (exercise_description !== null) {
        exercise_description_ = exercise_description;
    }

    var exercise_name = localStorage.getItem('exercise_name');
    var exercise_name_: string = "";
    if (exercise_name !== null) {
        exercise_name_ = exercise_name;
    }

    var exercise_level_name = localStorage.getItem('exercise_level_name');
    var exercise_level_name_: string = "";
    if (exercise_level_name !== null) {
        exercise_level_name_ = exercise_level_name;
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
            }
        }
    }, [dispatch, access_token, refresh_token]);

    

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/exercise/grade'; 
        history.push({
            pathname: path
        });
    }
    
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="SỐ BÀI NỘP" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="CHƯA CHẤM" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
            </div>
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Đề bài</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <p id="phone">{exercise_name_}</p>
                                        </div>
                                        <div className="row no-gutters" dangerouslySetInnerHTML={{ __html: exercise_description_ }}></div>
                                        <div className="row">
                                            <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Phần trăm đánh giá:</span> <span className="header-card-course-value-teacher">{exercise_level_name_}%</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>

            <div className="row justify-content-center mb-4">
                <button 
                    className="btn btn-success btn-green" 
                    id="btn-into-class-student"
                    onClick={() => {routeChange()}}
                >
                    Chấm bài
                    <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                </button>
            </div>

        </Fragment>
    );
};

export default ExamTeacher;