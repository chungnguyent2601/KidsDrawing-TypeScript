import React, { Fragment, Dispatch, useState, useEffect } from "react";
import SemesterList from "./SemesterList";
import SemesterForm from "./SemesterForm";
import TopCard from "../../common/components/TopCard";
import "./Semester.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ISemesterState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeSemester, clearSelectedSemester, setModificationState,
    changeSelectedSemester, addSemester, editSemester
} from "../../store/actions/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { SemesterModificationStatus, ISemester } from "../../store/models/semester.interface";
import { getSemester } from "../../common/service/semester/GetSemester";


const Semester: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = semesters.semesters.length;
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        dispatch(getSemester())
    }, [dispatch])

    useEffect(() => {
        dispatch(clearSelectedSemester());
        dispatch(updateCurrentPath("Học kì", "Danh sách"));
    }, [path.area, dispatch]);

    function onSemesterSelect(semester: ISemester): void {
        dispatch(changeSelectedSemester(semester));
        dispatch(setModificationState(SemesterModificationStatus.None));
    }

    function onSemesterRemove() {
        setPopup(true);
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Học kì</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ HỌC KÌ" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm"/>
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách học kì</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() =>{
                                    dispatch(setModificationState(SemesterModificationStatus.Create))
                                    onSemesterRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm học kì
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <SemesterList
                                onSelect={onSemesterSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <Popup
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <div className="row text-left">
                    {((semesters.modificationState === SemesterModificationStatus.Create) || (semesters.modificationState === SemesterModificationStatus.Edit && semesters.selectedSemester)) ? <SemesterForm /> : null}
                </div>
            </Popup>
        </Fragment >
    );
};

export default Semester;
