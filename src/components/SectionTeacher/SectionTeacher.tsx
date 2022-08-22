import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getSectionById } from "../../common/service/Section/GetSectionById";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { logout } from "../../store/actions/account.actions";
import { clearSelectedTeacherRegisterQuatification } from "../../store/actions/teacher_register_quantification.action";
import { ISectionState, IStateType, IUserState } from "../../store/models/root.interface";
import "./SectionTeacher.css"

const SectionTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)
    
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    
    let section_id = 0;
    const { state } = useLocation<any>();
    if (state !== undefined && state !== null) {
        section_id = state.section_id;
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
                    dispatch(clearSelectedTeacherRegisterQuatification());
                    dispatch(getSectionById(section_id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getSectionById(section_id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    const history = useHistory();
    const routeChange2 = () =>{ 
        let path = '/section/view'; 
        history.push({
            pathname: path,
            state: { section_id: section_id }
        });
    }

    const onChangeRoute1 = () => {
        let path = "/section/edit";
        history.push({
            pathname: path,
            state: { section_id: section_id }
        })
    }
    
    return (
        <Fragment>
            <div className="row mb-2">
                <div className="col-xl-6 col-md-6 col-xs-6 md-4 ">
                    <button 
                        className="btn btn-success ml-3" 
                        id="btn-edit-tutorial" 
                        onClick={onChangeRoute1}
                    >
                        <i className="fas fa-edit"></i>
                        Chỉnh giáo án
                    </button>
                </div>

                <div className="col-xl-6 col-md-6 col-xs-6 md-4">
                    <button 
                        className="btn btn-success ml-3" 
                        id="btn-add-exercise" 
                        onClick={() => {}}
                    >
                        <i className="fas fa fa-plus"></i>
                        Thêm bài tập
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Giáo án chung</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <p id="phone">Tên: {
                                                function () {
                                                    if (sections.sections.length <= 0){
                                                        return ""
                                                    }
                                                    else {
                                                        return sections.sections[0].name;
                                                    }
                                                }()
                                            }</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <p id="phone">Nội dung: </p>
                                        </div>

                                        <div className="row  justify-content-center">
                                            <button 
                                                className="btn btn-success ml-2" 
                                                id="btn-view-tutorial" 
                                                onClick={routeChange2}
                                            >                                           
                                                Xem nội dung
                                            </button>
                                        </div>

                                        <div className="row no-gutters">
                                            <p id="phone">Hình thức: 
                                            {
                                                function () {
                                                    if (sections.sections.length <= 0){
                                                        return ""
                                                    }
                                                    else {
                                                        if (sections.sections[0].teach_form == true){
                                                            return "Dạy bằng jitsi";
                                                        }
                                                        else {
                                                            return "Dạy bằng giáo trình";
                                                        }
                                                    }
                                                }()
                                            }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Bài tập</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-xl-4 col-md-4 col-xs-4 mb-4">
                                                <img className="card-img image-exercise"  src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/exam1_clcq5z.png" alt="Card image cap" />
                                            </div>
                                            <div className="col-xl-8 col-md-8 col-xs-8 mb-4">
                                                <h3 className=" mb-2" id="level-teacher">Bài tập 1</h3>
                                                <h4 className=" mb-2" id="level-teacher">Vẽ con mèo</h4>
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <div className="col-xl-4 col-md-4 col-xs-4 mb-4">
                                                <img className="card-img image-exercise" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/exam1_clcq5z.png" alt="Card image cap" />
                                            </div>
                                            <div className="col-xl-8 col-md-8 col-xs-8 mb-4">
                                                <h3 className=" mb-2" id="level-teacher">Bài tập 1</h3>
                                                <h4 className=" mb-2" id="level-teacher">Vẽ con mèo</h4>
                                            </div>
                                        </div>
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

export default SectionTeacher;
