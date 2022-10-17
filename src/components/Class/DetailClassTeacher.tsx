import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { getExerciseSubmissionByClass } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByClass";
import { getSectionByClass } from "../../common/service/Section/GetSectionByClass";
import { getTeacherLeaveByTeacher } from "../../common/service/TeacherLeave/GetTeacherLeaveByTeacher";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IExerciseSubmissionState, IRootPageStateType, ISectionState, IStateType, ITeacherLeaveState, ITimeScheduleState, ITutorialPageState, ITutorialState } from "../../store/models/root.interface";
import "./DetailClassTeacher.css"
import RequestOffSectionForm from "./RequestOffSectionForm";
import { ISection } from "../../store/models/section.interface";
import { getTutorial } from "../../common/service/Tutorial/GetTutorial";
import { getTutorialPage } from "../../common/service/TutorialPage/GetTutorialPage";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";


const DetailClassTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const tutorials: ITutorialState = useSelector((state: IStateType) => state.tutorials);
    const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);
    const tutorial_pages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);
    console.log(tutorial_pages)
    const { promiseInProgress } = usePromiseTracker();

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = sections.sections.length;
    const numberNotApprovedNowCount: number = exercise_submissions.exercise_not_gradeds.length;
    var id_x = localStorage.getItem('id');
    var id: string = "";
    if (id_x !== null) {
        id = id_x;
    }

    var id_y = localStorage.getItem('class_id');

    let class_id: string = "";

    if (id_y !== null) {
        class_id = id_y;
    }

    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

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
                    trackPromise(getInfoMyClass(dispatch, class_id))
                    trackPromise(getSectionByClass(dispatch, class_id))
                    trackPromise(getTeacher(dispatch))
                    trackPromise(getExerciseSubmissionByClass(dispatch, class_id))
                    trackPromise(getTeacherLeaveByTeacher(dispatch, id))
                }
            }
            else {
                trackPromise(getInfoMyClass(dispatch, class_id))
                trackPromise(getSectionByClass(dispatch, class_id))
                trackPromise(getTeacher(dispatch))
                trackPromise(getExerciseSubmissionByClass(dispatch, class_id))
                trackPromise(getTeacherLeaveByTeacher(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id, id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp học", "Buổi học"));
    }, [path.area, dispatch]);

    const [popup1, setPopup1] = useState(false);

    function onAnonymousNotificationRemove() {
        setPopup1(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    const history = useHistory();

    const routeChange1 = () => {
        let path = '/exercise';
        history.push({
            pathname: path
        });
    }

    const onChangeRoute = (section: ISection) => {
        let path = "/classes/section";
        localStorage.removeItem('section_id')
        localStorage.setItem('section_id', section.id.toString())
        localStorage.removeItem('section_number')
        localStorage.setItem('section_number', section.number.toString())
        let tutorial_page_list: any[] = []
        localStorage.removeItem('tutorial_name')
        localStorage.removeItem('tutorial_id')
        tutorials.tutorials.map(ele => {
            if (ele.section_id === section.id) {
                localStorage.setItem('tutorial_id', ele.id.toString())
                localStorage.setItem('tutorial_name', ele.name.toString())
                tutorial_pages.tutorialPages.map(element => {
                    if (element.tutorial_id === ele.id) {
                        tutorial_page_list.push({
                            description: element.description,
                            id: element.id,
                            name: element.name,
                            tutorial_id: element.tutorial_id,
                            number: element.number
                        })
                    }
                    return null
                })
            }
            return null
        })
        console.log(tutorial_page_list)
        localStorage.removeItem('description_tutorial_page_list')
        localStorage.setItem('description_tutorial_page_list', JSON.stringify(tutorial_page_list.sort((a, b) => a.number - b.number)))
        history.push({
            pathname: path
        })
    }

    function isDateBeforeToday(date: any) {
        return new Date(date.toDateString()) < new Date(new Date().toDateString());
    }

    let count = 0;
    let data: string[] = []
    let total_time = "";
    if (time_schedules.timeSchedules.length > 1 && promiseInProgress === false) {
            if (time_schedules.timeSchedules[0] !== undefined && time_schedules.timeSchedules[0] !== null){
                var start_time_0 = time_schedules.timeSchedules[0].start_time.split("T");
                var end_time_0 = time_schedules.timeSchedules[0].end_time.split("T");
                var hour_start = parseInt(start_time_0[1].substring(0, 2));
                var minus_tart = parseInt(start_time_0[1].substring(3, 5));
                var sercon_start = parseInt(start_time_0[1].substring(6, 8));
                var hour_end = parseInt(end_time_0[1].substring(0, 2));
                var minus_end = parseInt(end_time_0[1].substring(3, 5));
                var sercon_end = parseInt(end_time_0[1].substring(6, 8));
    
                total_time = (hour_end - hour_start).toString() + " giờ " + (minus_end - minus_tart).toString() + " phút " + (sercon_end - sercon_start).toString() + " giây";
                time_schedules.timeSchedules.map((ele, index) => {
                    if (isDateBeforeToday(new Date(Date.parse(ele.end_time)))) {
                        count++;
                    }
                    var start_time = ele.start_time.split("T");
                    var end_time = ele.end_time.split("T");
                    return data.push("Từ " + start_time[0] + " " + start_time[1] + " -> " + end_time[0] + " " + end_time[1])
                })
            }
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
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

                <div className="row">
                    <TopCard title="SỐ BUỔI ĐÃ DẠY" text={`${numberApprovedCount}`} icon="book" class="primary" />
                    <TopCard title="SỐ BÀI KIỂM TRA CHƯA CHẤM" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                    <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                        <button
                            className="btn btn-success btn-green"
                            id="btn-create-teacher-level"
                            onClick={() => {
                                dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Create))
                                onAnonymousNotificationRemove()
                            }}
                        >
                            <i className="fas fa fa-plus"></i>
                            Đăng kí nghỉ dạy
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked1 === false) {
                                setChecked1(true)
                                setChecked2(false)
                                setChecked3(false)
                            }
                        }} style={{
                            color: checked1 ? "#F24E1E" : "#2F4F4F"
                        }}>Buổi học</h6>

                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked1 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked2 === false) {
                                setChecked2(true)
                                setChecked1(false)
                                setChecked3(false)
                            }
                        }}
                            style={{
                                color: checked2 ? "#F24E1E" : "#2F4F4F"
                            }}>Bài tập chưa chấm</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked2 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>

                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked3 === false) {
                                setChecked3(true)
                                setChecked1(false)
                                setChecked2(false)
                            }
                        }}
                            style={{
                                color: checked3 ? "#F24E1E" : "#2F4F4F"
                            }}>Nghỉ dạy</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                </div>

                <Popup
                    open={popup1}
                    onClose={() => setPopup1(false)}
                    closeOnDocumentClick
                >
                    <>
                        {
                            function () {
                                if ((anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Create)) {
                                    return <RequestOffSectionForm isCheck={onRemovePopup1} />
                                }
                            }()
                        }
                    </>
                </Popup>

                {
                    function () {
                        if (checked1 === true) {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Buổi học</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        sections.sections.sort((a, b) => a.number - b.number).map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row row-section mb-4 ml-2 mr-2" onClick={() => { onChangeRoute(ele) }}>
                                                                        <div className="col-xl-3 col-md-3">
                                                                            <img className="card-img image-section-1" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="" />
                                                                        </div>
                                                                        <div className="col-xl-9 col-md-9">
                                                                            <div className="row">
                                                                                <div className="col-xl-3 col-md-3">
                                                                                    <p className=" mt-2 section_number">Buổi {ele.number}: </p>
                                                                                </div>
                                                                                <div className="col-xl-9 col-md-9">
                                                                                    <p className=" mt-2 section_number"><span className="section_name"> {ele.name}</span> </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-xl-3 col-md-3">
                                                                                    <p className=" mb-2 section_number">Lịch học: </p>
                                                                                </div>
                                                                                <div className="col-xl-9 col-md-9">
                                                                                    <p className=" mb-2 section_number"><span className="section_name">{data[index]}</span> </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-xl-3 col-md-3">
                                                                                    <p className=" mb-2 section_number">Thời gian buổi học: </p>
                                                                                </div>
                                                                                <div className="col-xl-9 col-md-9">
                                                                                    <p className=" mb-2 section_number"><span className="section_name">{total_time}</span> </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-xl-3 col-md-3">
                                                                                    <p className=" mb-2 section_number">Hình thức học: </p>
                                                                                </div>
                                                                                <div className="col-xl-9 col-md-9">
                                                                                    <p className=" mb-2 section_number"><span className="section_name">{ele.teach_form === true ? "Dạy bằng jisti" : "Đọc hiểu giáo trình"}</span> </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-xl-3 col-md-3">
                                                                                    <p className=" mb-2 section_number">Giáo viên: </p>
                                                                                </div>
                                                                                <div className="col-xl-9 col-md-9">
                                                                                    <p className=" mb-2 section_number"><span className="section_name">{ele.teacher_name}</span> </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else if (checked2 === true) {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Bài kiểm tra cần chấm</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        exercise_submissions.exercise_not_gradeds.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row row-section mb-4 ml-2 mr-2" onClick={() => { routeChange1() }}>
                                                                        <div className="col-xl-4 col-md-4 mb-4">
                                                                            <img className="card-img image-section" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="" />
                                                                        </div>
                                                                        <div className="col-xl-8 col-md-8 mb-4">
                                                                            <h3 className=" mb-2" id="level-teacher">{ele.exercise_name}</h3>
                                                                            <h3 className=" mb-2" id="level-teacher">Học sinh: {ele.student_name}</h3>
                                                                        </div>
                                                                    </div>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else if (checked3 === true) {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Yêu cầu nghỉ dạy</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light ">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        teacher_leaves.leaves.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row row-section mb-4 ml-2 mr-2" onClick={() => { routeChange1() }}>
                                                                        <div className="col-xl-4 col-md-4 mb-4">
                                                                            <img className="card-img image-section" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="" />
                                                                        </div>
                                                                        <div className="col-xl-8 col-md-8 mb-4">
                                                                            <h3 className=" mb-2" id="level-teacher">{ele.section_name}</h3>
                                                                            <h4 className=" mb-2" id="level-teacher">Chưa duyệt</h4>
                                                                        </div>
                                                                    </div>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }
            </Fragment>
    );
};

export default DetailClassTeacher;
