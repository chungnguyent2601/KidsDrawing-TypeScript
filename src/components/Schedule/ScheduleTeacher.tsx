import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, ITimeScheduleTeacherState } from "../../store/models/root.interface";
import {
    clearSelectedProduct
} from "../../store/actions/products.action";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";

import { getScheduleTeacher } from "../../common/service/ScheduleTeacher/GetScheduleTeacher";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

const ScheduleTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const time_schedule_teacherss: ITimeScheduleTeacherState = useSelector((state: IStateType) => state.time_schedule_teachers);
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const { promiseInProgress } = usePromiseTracker();


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
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
                    trackPromise(getScheduleTeacher(dispatch, id))
                }
            }
            else {
                trackPromise(getScheduleTeacher(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id])
    let data: object[] = []

    //console.log(time_schedules.timeSchedules)

    time_schedule_teacherss.timeScheduleTeachers.map((ele: any, index: any) => {
        //console.log(ele)
        if (ele !== undefined && ele !== null) {
            return data.push({
                Id: index,
                Subject: `Lớp ${ele.class_name}:  Buổi học ${index + 1}`,
                StartTime: new Date(ele.start_time),
                EndTime: new Date(ele.end_time),
                IsAllDay: false
            })
        }
        return 1
    })

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Thời khóa biểu", ""));
    }, [path.area, dispatch]);

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
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-body">
                        <ScheduleComponent height='550px' currentView="Month" showQuickInfo={false} selectedDate={new Date()} eventSettings={{
                          dataSource: data
                        }}>

                            <ViewsDirective>
                                <ViewDirective option='Day'/>
                                <ViewDirective option='Week'/>
                                <ViewDirective option='Month'/>
                            </ViewsDirective>
                          <Inject services={[Day, Week, Month]}/>
                        </ScheduleComponent>;
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default ScheduleTeacher;
