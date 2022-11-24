import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, IUserState, ILessonState } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import "./ConestDetail.css"
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { IUser } from "../../store/models/user.interface";
import { postUserRegisterContest } from "../../common/service/UserRegisterContest/PostUserRegisterContest";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import Loading from "../../common/components/Loading";
import { GrLinkDown, GrLinkNext } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";
import { setModificationState } from "../../store/actions/lesson.action";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import Popup from "reactjs-popup";
import { deleteUserRegisterContestByContestAndStudent } from "../../common/service/UserRegisterContest/DeleteUserRegisterJoinContestByContestAndStudent";
type Option1 = {
    label: string;
    value: string;
}

const ConestDetailStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const listTeacher: IUser[] = users.students
    const listTeachers: Option1[] = [];
    listTeacher.map((ele) => {
        let item: Option1 = { "label": ele.username, "value": ele.id }
        return listTeachers.push(item)
    })

    const [popup, setPopup] = useState(false);

    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked)
    }

    var id_x = localStorage.getItem('contest_id');
    let contest_id: number = 0;
    if (id_x !== null) {
        contest_id = parseInt(id_x);
    }

    console.log(contest_id)

    var id_y = localStorage.getItem('description_contest');
    let description_contest: string = "";
    if (id_y !== null) {
        description_contest = id_y;
    }

    var id_z = localStorage.getItem('id');
    let id: number = 0;
    if (id_z !== null) {
        id = parseInt(id_z);
    }

    var id_a = localStorage.getItem('art_age_name');
    let art_age_name: string = "";
    if (id_a !== null) {
        art_age_name = id_a;
    }

    var id_b = localStorage.getItem('art_type_name');
    let art_type_name: string = "";
    if (id_b !== null) {
        art_type_name = id_b;
    }

    var id_c = localStorage.getItem('registration_time');
    let registration_time: string = "";
    if (id_c !== null) {
        registration_time = id_c;
    }

    var id_d = localStorage.getItem('start_time');
    let start_time: string = "";
    if (id_d !== null) {
        start_time = id_d;
    }

    var id_e = localStorage.getItem('end_time');
    let end_time: string = "";
    if (id_e !== null) {
        end_time = id_e;
    }

    var id_f = localStorage.getItem('contest_name');
    let contest_name: string = "";
    if (id_f !== null) {
        contest_name = id_f;
    }

    var id_h = localStorage.getItem('max_participant');
    let max_participant: string = "";
    if (id_h !== null) {
        max_participant = id_h;
    }

    var id_i = localStorage.getItem('status');
    let status: string = "";
    if (id_i !== null) {
        status = id_i;
    }


    const { promiseInProgress } = usePromiseTracker();

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
                    trackPromise(getStudentByParent(dispatch, id))
                }
            }
            else {
                trackPromise(getStudentByParent(dispatch, id))
            }
        }

    }, [dispatch, id, access_token, refresh_token]);


    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", ""));
    }, [path.area, dispatch])

    const history = useHistory();
    function routeHome() {
        let path = `/discover/contest`;
        history.push(path);
    }

    function handleRegister() {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch(postUserRegisterContest({
            student_id: id,
            contest_id: contest_id
        }))

        toast.update(idx, { render: "Đăng kí cuộc thi cho bé thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        setTimeout(function () {
            routeHome();
        }, 2000);
    }

    function handleRemove() {
        dispatch(setModificationState(LessonModificationStatus.Remove))
        setPopup(true)
    }

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
                <ToastContainer />
                {
                    function () {
                        if ((lessons.modificationState === LessonModificationStatus.Remove)) {
                            return (
                                <Popup
                                    open={popup}
                                    onClose={() => setPopup(false)}
                                    closeOnDocumentClick
                                >
                                    <div className="popup-modal" id="popup-modal">
                                        <div className="popup-title">
                                            Are you sure?
                                        </div>
                                        <div className="popup-content">
                                            <button type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                        position: toast.POSITION.TOP_CENTER
                                                    });
                                                    dispatch(deleteUserRegisterContestByContestAndStudent(
                                                        contest_id, id
                                                        , idx, routeHome))
                                                    setPopup(false);
                                                }}>Remove
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            )
                        }
                    }()
                }
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="row no-gutters align-items-center">
                            <div className="text-xs font-weight-bold text-green text-uppercase ">
                                <p className="fullname ml-4 mt-4">{contest_name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-md-6">
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs ">
                                        <p className="birthday ml-4">Độ tuổi đăng kí: {art_age_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-4">Thể loại: {art_type_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-4">Thời gian đăng kí: {registration_time.replaceAll("T", " ").substring(0,16)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-md-6">
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs ">
                                        <p className="birthday">Thời gian bắt đầu: {start_time.replaceAll("T", " ").substring(0,16)}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday">Thời gian kết thúc: {end_time.replaceAll("T", " ").substring(0,16)}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday">Số người tham gia tối đa: {max_participant}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                        function () {
                            if (status === "Not register") {
                                return (
                                    <div className="row" id="btn-register-course">
                                        <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                                            <button className="btn btn-success btn-green" id="btn-create-register-course2" onClick={() => handleRegister()}>
                                                <GrLinkNext id="btn-payment" color="#ffffff" />
                                                Đăng kí ngay
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                                            <button className="btn btn-danger" id="btn-create-register-coursexx" onClick={() => handleRemove()}>
                                                <BsFillTrashFill id="btn-payment" color="#ffffff" />
                                                Hủy kí ngay
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        }()
                    }
                    </div>
                </div>


                <div className="row" id="btn-register-course">
                    <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-create-register-course4" onClick={() => handleClick()}>
                            <GrLinkDown id="btn-payment" color="#ffffff" />
                            Xem miêu tả
                        </button>
                    </div>
                </div>
                {
                    function () {
                        if (checked === true) {
                            return (
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-green">Chi tiết</h6>
                                    </div>
                                    <div className="card shadow mb-4">
                                        <div className="card-body" dangerouslySetInnerHTML={{ __html: description_contest }}>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }

            </Fragment >
    );
};

export default ConestDetailStudent;
