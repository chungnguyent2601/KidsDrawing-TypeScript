import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./Discovery.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getSemesterClassByParentCourse } from "../../common/service/SemesterClasssParent/GetSemesterClassByParentCourse";
import SemesterClassNewList from "./SemesterClassNewList";

const SemesterClassParentNew: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    //const semester_classs: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('course_id');
    var course_id: number = 0;
    if (id_y !== null) {
        course_id = parseInt(id_y);
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getSemesterClassByParentCourse(dispatch, id, course_id))
                }
            }
            else {
                trackPromise(getSemesterClassByParentCourse(dispatch, id, course_id))
            }
        }
    }, [dispatch, id, access_token, refresh_token, course_id]);

    var id_zx = localStorage.getItem('course_name');
    var course_name = "";
    if (id_zx !== null) {
        course_name = (id_zx);
    }

    useEffect(() => {
        dispatch(updateCurrentPath(course_name, "Lớp đang mở"));
    }, [path.area, dispatch, course_name])
    localStorage.setItem('path','/discover/course')

    const [searchTerm, setSearchTerm] = useState("");

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

                {/* <div className="row">
                <TopCard title="ĐÃ ĐĂNG KÍ" text={`${numberTeacherRegisterSuccessfullCount}`} icon="book" class="primary" />
            </div> */}

            <div className="row" id="search-box">
            <div className="col-xl-12 col-lg-12">
                <div className="input-group" id="search-content">
                    <div className="form-outline">
                        <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                            setSearchTerm(event.target.value)
                            console.log(searchTerm)
                        }}/>
                    </div>
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
                <div className="row">
                    <SemesterClassNewList value={searchTerm}/>
                </div>



            </Fragment>
    );
};

export default SemesterClassParentNew;
