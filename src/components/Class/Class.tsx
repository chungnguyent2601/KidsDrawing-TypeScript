import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ClassList from "./ClassList";
import TopCard from "../../common/components/TopCard";
import "./Class.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeProduct, clearSelectedProduct, setModificationState,
    changeSelectedProduct
} from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import SelectInput from "../../common/components/Select";


const Class: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp học", "Danh sách"));
    }, [path.area, dispatch]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    function onProductRemove() {
        setPopup(true);
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lớp học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ LỚP HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="mb-4">
                        <div className="py-3">
                            <h6 className="m-0 font-weight-bold text-green">Xếp lớp</h6>
                        </div>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <SelectInput
                                        id="input_category"
                                        field="category"
                                        label="Học kì"
                                        options={["Học kì 1 năm học 2022", "Học kì 2 năm học 2022"]}
                                        required={true}
                                        onChange={()=> {}}
                                        value=""
                                    />
                                </div>
                            </div>
                            <button type="submit" className={`btn btn-success left-margin`}>Xếp lớp</button>
                        </form>
                    </div>
                </div>
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
                            <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
                        </div>
                        <div className="card-body">
                            <ClassList
                                onSelect={onProductSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    );
};

export default Class;