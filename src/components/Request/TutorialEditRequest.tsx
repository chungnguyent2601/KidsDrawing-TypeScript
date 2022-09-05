import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IStateType, IUserRegisterTutorialState } from "../../store/models/root.interface";
import TutorialEditRequestList from "./TutorialEditRequestList";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/GetUserRegisterTutorial";
import UserRegisterTutorialEditRequestList from "./UserRegisterTutorialEditRequestList";
import { ToastContainer } from "react-toastify";

const TutorialEditRequest: React.FC = () => {
  const user_register_tutorials: IUserRegisterTutorialState = useSelector((state: IStateType) => state.user_register_tutorials);
  const numberItemsCount: number = user_register_tutorials.user_register_tutorial_not_approved_nows.length;
  const numberItemsApprovedCount: number = user_register_tutorials.user_register_tutorial_approveds.length;

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu chỉnh giáo án", ""));

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
          dispatch(getUserRegisterTutorial())
        }
      }
      else {
        dispatch(getUserRegisterTutorial())
      }
    }
  }, [dispatch, access_token, refresh_token]);

  const [checked, setChecked] = useState(true);

  return (
    <Fragment>
      <ToastContainer />
      <h1 className="h3 mb-2 text-gray-800">Yêu cầu chỉnh giáo án</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="SỐ YÊU CẦU CHƯA DUYỆT" text={`${numberItemsCount}`} icon="box" class="primary" />
        <TopCard title="SỐ YÊU CẦU ĐÃ DUYỆT" text={`${numberItemsApprovedCount}`} icon="box" class="primary" />
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
          <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
            if (checked === false) {
              setChecked(true)
            }
          }} style={{
            color: checked ? "#F24E1E" : "#2F4F4F"
          }}>Chưa duyệt</h6>
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
            }}>Đã duyệt</h6>
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
              <div className="row">

                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-green">Danh sách yêu cầu</h6>
                    </div>
                    <div className="card-body">
                      <TutorialEditRequestList />
                    </div>
                  </div>

                </div>

              </div>
            )
          }
          else {
            return (
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-green">Danh sách yêu cầu</h6>
                    </div>
                    <div className="card-body">
                      <UserRegisterTutorialEditRequestList />
                    </div>
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

export default TutorialEditRequest;
