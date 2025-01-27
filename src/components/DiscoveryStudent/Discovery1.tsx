import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./Discovery.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getContestStudentByStudent } from "../../common/service/ContestStudent/GetContestStudent";
import ContestNewListTest from "./ContestListNew";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";

const DiscoveryStudentContest: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    //const semester_classs: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
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
                    trackPromise(getContestStudentByStudent(dispatch, id))
                    trackPromise(getArtType(dispatch))
                    trackPromise(getArtAge(dispatch))
                    trackPromise(getArtLevel(dispatch))
                }
            }
            else {
                trackPromise(getContestStudentByStudent(dispatch, id))
                trackPromise(getArtType(dispatch))
                trackPromise(getArtAge(dispatch))
                trackPromise(getArtLevel(dispatch))
            }
        }

    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", ""));
    }, [path.area, dispatch])
    localStorage.setItem('path','/discover/contest')


    const [checked, setChecked] = useState(true);
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
                                }} />
                            </div>
                            <button type="button" className="btn btn-primary">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <ContestNewListTest value={searchTerm}/>
                </div>


            </Fragment>
    );
};

export default DiscoveryStudentContest;
