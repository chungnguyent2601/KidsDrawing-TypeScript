import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";
import { logout } from "../../store/actions/account.actions";
import { IContestSubmissionState, IStateType } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

const DetailContestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_submissions: IContestSubmissionState = useSelector((state: IStateType) => state.contest_submissions);
    const numberNotGradedCount: number = contest_submissions.contest_not_gradeds.length;
    const numberGradedCount: number = contest_submissions.contest_gradeds.length;

    const { promiseInProgress } = usePromiseTracker();


    var contest_description = localStorage.getItem('contest_description');
    var contest_description_: string = "";
    if (contest_description !== null) {
        contest_description_ = contest_description;
    }

    var contest_name = localStorage.getItem('contest_name');
    var contest_name_: string = "";
    if (contest_name !== null) {
        contest_name_ = contest_name;
    }

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }


    var id_z = localStorage.getItem('max_participant');
    let max_participant = 0;

    if (id_z !== null) {
        max_participant = parseInt(id_z);
    }

    var id_t = localStorage.getItem('art_type_contest');
    let art_type_contest: string = "";

    if (id_t !== null) {
        art_type_contest = id_t;
    }

    var id_h = localStorage.getItem('art_age_contest');
    let art_age_contest: string = "";

    if (id_h !== null) {
        art_age_contest = id_h;
    }

    var id_k = localStorage.getItem('registration_time');
    let registration_time: string = "";

    if (id_k !== null) {
        registration_time = id_k;
    }

    var id_l = localStorage.getItem('start_time');
    let start_time: string = "";

    if (id_l !== null) {
        start_time = id_l;
    }

    var id_m = localStorage.getItem('end_time');
    let end_time: string = "";

    if (id_m !== null) {
        end_time = id_m;
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
                    trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getContestSubmissionByContest(dispatch, contest_id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id]);

    
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
                <TopCard title="SỐ BÀI ĐÃ NỘP" text={`${numberGradedCount + numberNotGradedCount}`} icon="book" class="primary" />
                <TopCard title="SỐ BÀI ĐÃ CHẤM" text={`${numberGradedCount}`} icon="book" class="primary" />
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
                                            <p id="phone">{contest_name_}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <p>Thể loại: {art_type_contest}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <p>Độ tuổi: {art_age_contest}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <p>Số người tham gia tối đa: {max_participant}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <p>Thời gian đăng kí: {registration_time}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <p>Thời gian bắt đầu: {start_time}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <p>Thời gian kết thúc: {end_time}</p>
                                        </div>
                                        <div className="row no-gutters" dangerouslySetInnerHTML={{ __html: contest_description_ }}></div>
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

export default DetailContestTeacher;