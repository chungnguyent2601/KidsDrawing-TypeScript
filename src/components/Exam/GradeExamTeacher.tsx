import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../../common/components/Quill/Editor";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./GradeExamTeacher.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TextInput from "../../common/components/TextInput";
import { useHistory } from "react-router-dom";

const GradeExamTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = teacherRegisterQuantifications.approveds.length;
    const numberNotApprovedNowCount: number = teacherRegisterQuantifications.not_approved_now.length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    const percentage = 66;
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
                    dispatch(clearSelectedTeacherRegisterQuatification());
                    dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                    dispatch(getUserById(id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                dispatch(getUserById(id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onTeacherRegisterQuantificationRemove() {
        if (teacherRegisterQuantifications.selectedTeacherRegisterQuantification) {
            setPopup(true);
        }
    }

    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/exercise/result-grade'; 
        history.push({
            pathname: path,
        });
    }
    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài làm của bé</h6>
                    </div>
                    <img className="card-img-top" src="https://thumbs.dreamstime.com/b/little-child-baby-girl-drawing-picture-pencils-watercolor-sitting-table-kid-activity-art-class-learning-how-to-194571709.jpg" alt="Card image cap" />
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="row">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <div className="row no-gutters justify-content-center">
                                    <h4 id="full-name">Thông tin bài nộp</h4>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <p id="username-teacher">Tên học sinh: Nguyễn Văn Chung</p>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <p id="username-teacher">Thời gian nộp: 2022-10-10 19:00:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                            <TextInput id="input_name"
                                field="name"
                                value=""
                                onChange={() => {}}
                                required={false}
                                maxLength={100}
                                label="Nhập điểm"
                                placeholder="" 
                            />
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Nhận xét</h6>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <Editor getValue={10} isCreate={""} setValue={""}/>
                            </div>
                            <button className="btn btn-danger" onClick={() => {}}>Lưu</button>
                            <button className={`btn btn-success left-margin`} onClick={() => {routeChange()}}>Bài tiếp</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default GradeExamTeacher;