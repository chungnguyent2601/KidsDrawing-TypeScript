import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editTeacher, clearSelectedUser, setModificationState, addTeacher } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IUser1FormState } from "../../common/types/Form.types";
import { postTeacher } from "../../common/service/Teacher/PostTeacher";
import { putTeacher } from "../../common/service/Teacher/PutTeacher";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectInput from "../../common/components/Select";
import { getUserById } from "../../common/service/User/GetUserById";

export type teacherListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};

const Account: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const id = localStorage.getItem('id')
    useEffect(() => {
        dispatch(getUserById(id))
    }, [dispatch, id])
    var role_privilege = localStorage.getItem('role_privilege')
    var rolePrivilege:string[] =[]
    const [userRole, setUserRole] = useState("")
    if (role_privilege !== null) {
        rolePrivilege = role_privilege.split(',')
        setUserRole(rolePrivilege[0])
    }
    let users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)

    let user =  users.teachers.length > 0 ? users.teachers[0] : { id: 0, username: "", email: "", status: true, firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0 }

    console.log(user)
    let [formState, setFormState] = useState({
        username: { error: "", value: user.username },
        email: { error: "", value: user.email },
        password: { error: "", value: "" },
        firstName: { error: "", value: user.firstName },
        lastName: { error: "", value: user.lastName },
        dateOfBirth: { error: "", value: user.dateOfBirth },
        profile_image_url: { error: "", value: user.profile_image_url },
        sex: { error: "", value: user.sex },
        phone: { error: "", value: user.phone },
        address: { error: "", value: user.address }
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        let saveUserFn: Function =editTeacher;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IUser1FormState, saveFn: Function): void {
        if (user) {
            const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            if (saveFn === addTeacher) {
                dispatch(postTeacher({
                    username: formState.username.value,
                    email: formState.email.value,
                    password: formState.password.value,
                    firstName: formState.firstName.value,
                    lastName: formState.lastName.value,
                    dateOfBirth: formState.dateOfBirth.value,
                    profile_image_url: preview,
                    sex: formState.sex.value,
                    phone: formState.phone.value,
                    address: formState.address.value,
                    parent_ids: user.parents,
                    roleNames: [userRole]
                }, id));
            }

            else if (saveFn === editTeacher) {
                dispatch(putTeacher(user.id, {
                    username: formState.username.value,
                    email: formState.email.value,
                    password: "",
                    firstName: formState.firstName.value,
                    lastName: formState.lastName.value,
                    dateOfBirth: formState.dateOfBirth.value,
                    profile_image_url: preview,
                    sex: formState.sex.value,
                    phone: formState.phone.value,
                    address: formState.address.value,
                    parent_ids: user.parents,
                    roleNames: [userRole]
                }, id));
            }

            dispatch(addNotification("Thông tin cá nhân", ` ${formState.username.value} chỉnh bởi bạn`));
            dispatch(clearSelectedUser());
            dispatch(setModificationState(UserModificationStatus.None));
            notify()
        }
    }

    function notify() {
        toast.info("Cập nhật thành công!", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function cancelForm(): void {
        dispatch(setModificationState(UserModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.username.error || formState.email.error
            || !formState.email.value || !formState.username.value ) as boolean;
    }

    const src = user.profile_image_url;

    const [preview, setPreview] = useState(src)

    const uploadPicture = (e: any) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
    };

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Chỉnh thông tin cá nhân</h6>
                        </div>
                        <ToastContainer />
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="profile_image">Chọn ảnh:</label>
                                        <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <img src={preview} alt="Preview" id="avatar" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_username"
                                            field="username"
                                            value={formState.username.value}
                                            onChange={hasFormValueChanged}
                                            required={true}
                                            maxLength={100}
                                            label="Tên đăng nhập"
                                            placeholder="" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_email"
                                            field="email"
                                            value={formState.email.value}
                                            onChange={hasFormValueChanged}
                                            required={true}
                                            maxLength={200}
                                            label="Email"
                                            placeholder="" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_firstName"
                                            field="firstName"
                                            value={formState.firstName.value}
                                            onChange={hasFormValueChanged}
                                            required={false}
                                            maxLength={100}
                                            label="Họ"
                                            placeholder="" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_lastName"
                                            field="lastName"
                                            value={formState.lastName.value}
                                            onChange={hasFormValueChanged}
                                            required={false}
                                            maxLength={200}
                                            label="Tên"
                                            placeholder="" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <SelectInput
                                        id="input_category"
                                        field="sex"
                                        label="Giới tính"
                                        options={["Nam", "Nữ"]}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.sex.value}
                                    />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_phone"
                                            field="phone"
                                            value={formState.phone.value}
                                            onChange={hasFormValueChanged}
                                            required={false}
                                            maxLength={200}
                                            label="Số điện thoại"
                                            placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_address"
                                        field="address"
                                        value={formState.address.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={200}
                                        label="Địa chỉ"
                                        placeholder="" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_dateOfBirth"
                                            field="dateOfBirth"
                                            value={formState.dateOfBirth.value}
                                            onChange={hasFormValueChanged}
                                            type="date"
                                            required={false}
                                            maxLength={200}
                                            label="Ngày sinh"
                                            placeholder="" />
                                    </div>
                                </div>
                                <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Account;
