import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { logout } from "../../store/actions/account.actions";
import { IRootPageStateType, IStateType, ITutorialPageState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { updateCurrentPath } from "../../store/actions/root.actions";

const ViewSectionTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const TutorialPages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);

    var id_y = localStorage.getItem('section_id');
    
    let section_id = 0;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }

    const [count, setCount] = useState(1);

    const { promiseInProgress } = usePromiseTracker();

    function setChangeCount() {
        let x = count;
        let y = x + 1;
        if (x < TutorialPages.tutorialPages.length){
            console.log("Count")
            setCount(y);
        }
        console.log(count)
    }

    function setChangeCountBack() {
        let x = count;
        let y = x - 1;
        if (x > 1){
            setCount(y);
        }
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getTutorialPageBySection(dispatch, section_id))
                }
            }
            else {
                trackPromise(getTutorialPageBySection(dispatch, section_id))
            }
        }
    }, [dispatch, access_token, refresh_token, section_id]);

    var id_zy = localStorage.getItem('section_number');
    var section_number = "";
    if (id_zy !== null) {
        section_number = (id_zy);
    }

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Buổi " + section_number, 'Nội dung'));
    }, [path.area, dispatch, section_number])
    localStorage.setItem('path','/classes/section')
    
    return (
        promiseInProgress ?
      <div className="loader"></div> :  <Fragment>
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`}>
                                    <div className="card-body">
                                        
                                        <div className="row no-gutters">
                                            {
                                                function () {
                                                    if (TutorialPages.tutorialPages.length < 1) {
                                                        return ""
                                                    }
                                                    else {
                                                        return <div className="card-body" dangerouslySetInnerHTML={{ __html: TutorialPages.tutorialPages.sort((a, b) => a.number - b.number)[count-1].description }}>
                                                        </div>
                                                    }
                                                }()
                                            }
                                        </div>
                                        <div className="row no-gutters justify-content-right">
                                            {
                                                function () {
                                                    if (count < TutorialPages.tutorialPages.length) {
                                                        if (count === 1){
                                                            return (
                                                                <button className={`btn btn-success left-margin`} onClick={() => {setChangeCount()}}>Trang tiếp</button>
                                                            )
                                                        }
                                                        else if (count > 1){
                                                            return (
                                                                <> 
                                                                    <button className={`btn btn-warning left-margin`} onClick={() => {setChangeCountBack()}}>Trở về</button>
                                                                    <button className={`btn btn-success left-margin`} onClick={() => {setChangeCount()}}>Trang tiếp</button>
                                                                </>
                                                            )
                                                        }
                                                        
                                                    }
                                                    else {
                                                        return (
                                                            <button className={`btn btn-warning left-margin`} onClick={() => {setChangeCountBack()}}>Trở về</button>
                                                        )
                                                    }
                                                }()
                                            }
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

export default ViewSectionTeacher;
