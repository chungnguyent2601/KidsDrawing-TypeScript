import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IScheduleTimeClassState, IStateType } from "../../store/models/root.interface";
import "./ManageChild.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { OnChangeModelNotFiled } from "../../common/types/Form.types";
import { IoMdAnalytics } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import TopCardCustom from "../../common/components/TopCardCustom";
import { getScheduleTimeByChild } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByStudent";
import { Eventcalendar } from "@mobiscroll/react";

type Options = {
    name: string;
    value: any;
}

const ManageChild: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const [checked, setChecked] = useState(true);
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    const numberApprovedCount: number = 0;
    const numberNotApprovedNowCount: number = 0;
    var id_x = localStorage.getItem('student_id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    console.log(schedule_time_classes)

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
                    trackPromise(getScheduleTimeByChild(dispatch, id))
                }
            }
            else {
                trackPromise(getScheduleTimeByChild(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    const [value, setValue] = useState(0);
    const listOptions: Options[] = [
        {
            name: 'Khóa học',
            value: 1
        },
        {
            name: 'Cuộc thi',
            value: 2
        },
    ];

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setValue(model.value);
    }

    let data: any[] = [];
    if (schedule_time_classes.schedule_time_classes.length > 0) {
        schedule_time_classes.schedule_time_classes.map((ele, idx) => {

            return data.push({
                // base properties
                title: ele.class_name,
                color: '#56ca70',
                start: ele.start_time,
                end: ele.end_time,
                // add any property you'd like
                busy: true,
                description: 'Weekly meeting with team',
                location: 'Office'
            })
        
        })
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
                <div className="row">
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Trình độ đã duyệt</h3>
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className={`card shadow h-100 py-2`} id="infor-student">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-4 col-md-4 col-xs-4">
                                            <i className={`far fa-user-circle fa-7x text-gray-300`} id="icon-user"></i>
                                        </div>
                                        <div className="col-xl-8 col-md-8 col-xs-8">
                                            <div className="row">
                                                <h2>Nguyen Van Chung</h2>
                                            </div>
                                            <div className="row">
                                                <p>@chungnguyen123</p>
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <i className={`fa fa-calendar fa-2x text-gray-300`} id="icon-calendar"></i>
                                                <div className="text-xs mb-1 ml-2">
                                                    <p className="birthday">Ngày sinh: </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row dropdown-content">
                                        <SelectKeyValueNotField
                                            value={value}
                                            id="input_total_page"
                                            onChange={hasFormValueChangedNotFiled}
                                            required={true}
                                            label=""
                                            options={listOptions}
                                        />
                                    </div>
                                    <div className="row tabbar-x" >
                                        <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                                            <IoMdAnalytics style={{
                                                color: checked ? "#F24E1E" : "#2F4F4F"
                                            }}/>
                                            <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                                                if (checked === false) {
                                                    setChecked(true)
                                                }
                                            }} style={{
                                                color: checked ? "#F24E1E" : "#2F4F4F"
                                            }}>Thống kê</h6>
                                            <div style={{
                                                height: "5px",
                                                textAlign: "center",
                                                margin: "auto",
                                                width: "30%",
                                                backgroundColor: checked ? "#F24E1E" : "#ffffff"
                                            }}></div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                                            <FaHistory style={{
                                                color: !checked ? "#F24E1E" : "#2F4F4F"
                                            }}/>
                                            <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                                                if (checked === true) {
                                                    setChecked(false)
                                                }
                                            }}
                                                style={{
                                                    color: checked ? "#2F4F4F" : "#F24E1E"
                                                }}>Lịch sử</h6>
                                            <div style={{
                                                height: "5px",
                                                textAlign: "center",
                                                margin: "auto",
                                                width: "30%",
                                                backgroundColor: checked ? "#ffffff" : "#F24E1E"
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="row">
                            <TopCardCustom title="KHÓA HỌC" text={`${numberApprovedCount}`} icon="book" class="primary" />
                            <TopCardCustom title="CUỘC THI" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                        </div>
                        <h3 className=" mb-2" id="level-teacher">Lịch trong ngày</h3>
                        <Eventcalendar
                            data={data}
                            view={{
                                schedule: {
                                    type: 'day',
                                    startDay: 1,
                                    endDay: 5,
                                    startTime: '07:00',
                                    endTime: '18:00',
                                    timeCellStep: 60,
                                    timeLabelStep: 60
                                }
                            }}
                        />
                    </div>
                </div>

            </Fragment>
    );
};

export default ManageChild;
