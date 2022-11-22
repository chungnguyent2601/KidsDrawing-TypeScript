import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ITeacherLeaveState, IUserState, ISectionState, IAnonymousNotificationState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../../common/components/TextInput";
import { addLeaves, editAcceptTeacherLeave } from "../../store/actions/teacher_leave.action";
import { OnChangeModel, ITeacherLeaveFormState } from "../../common/types/Form.types";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { toast, ToastContainer } from "react-toastify";
import { IUser } from "../../store/models/user.interface";
import { ITeacherLeave, TeacherLeaveModificationStatus } from "../../store/models/teacher_leave.interface";
import { postTeacherLeave } from "../../common/service/TeacherLeave/PostTeacherLeave";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { putTeacherLeave } from "../../common/service/TeacherLeave/PutTeacherLeave1";

export type artAgeListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
    data?: any;
};

type Option1 = {
    name: string;
    value: any;
}


function RequestOffSectionForm(props: artAgeListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherleaves: ITeacherLeaveState | null = useSelector((state: IStateType) => state.teacher_leaves);
    let teacher_leave: ITeacherLeave | null = teacherleaves.selectedTeacherLeave;
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    const isCreate: boolean = (anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Create);
    const isView: boolean = (anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Remove);

    var id_y = localStorage.getItem('class_id');
    let class_id = 0;
    if (id_y !== null) {
        class_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var teacher_id: number = 0;
    if (id_x !== null) {
        teacher_id = parseInt(id_x);
    }

    var id_z = localStorage.getItem('section_id');
    var section_id: number = 0;
    if (id_z !== null) {
        section_id = parseInt(id_z);
    }

    var id_k = localStorage.getItem('section_number');
    var section_number: number = 0;
    if (id_k !== null) {
        section_number = parseInt(id_k);
    }

    var id_h = localStorage.getItem('substitute_teacher_id');
    var substitute_teacher_id: number = 0;
    if (id_h !== null) {
        substitute_teacher_id = parseInt(id_h);
    }

    var id_k = localStorage.getItem('teacher_leave_id');
    var teacher_leave_id: number = 0;
    if (id_k !== null) {
        teacher_leave_id = parseInt(id_k);
    }

    var id_t = localStorage.getItem('description');
    var description = "";
    if (id_t !== null) {
        description = id_t;
    }

    var id_z = localStorage.getItem('total_section_end');
    var total_section_end: number = 0;
    if (id_z !== null) {
        total_section_end = parseInt(id_z);
    }
    
    if (isCreate){
        teacher_leave = { id: 0, section_id: 0, class_id: 0, section_number: 0, teacher_id: 0, substitute_teacher_id: 0, description: "", section_name: "", class_name: "", teacher_name: "", reviewer_id: 0, status: "", substitute_teacher_name: "", create_time: "", update_time: "" }
    }else {
        teacher_leave = { id: teacher_leave_id, section_id: section_id, class_id: class_id, section_number: section_number, teacher_id: teacher_id, substitute_teacher_id: substitute_teacher_id, description: description, section_name: "", class_name: "", teacher_name: "", reviewer_id: 0, status: "", substitute_teacher_name: "", create_time: "", update_time: "" }
    }
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const listTeacher: IUser[] = users.teachers
    const listTeachers: Option1[] = [];
    const sections: ISectionState | null = useSelector((state: IStateType) => state.sections);

    listTeacher.map((ele) => {
        let item: Option1 = { "name": ele.username, "value": ele.id }
        return listTeachers.push(item)
    })

    const listSections: Option1[] = [];
    sections.sections.map((ele) => {
        if (ele.number > total_section_end) {
            let item: Option1 = { "name": "Buổi " + ele.number, "value": ele.id }
            return listSections.push(item)
        }
        else {
            return null
        }
        
    })


    const [formState, setFormState] = useState({
        section_id: { error: "", value: teacher_leave.section_id },
        substitute_teacher_id: { error: "", value: teacher_leave.substitute_teacher_id },
        description: { error: "", value: teacher_leave.description },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }



    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        props.isCheck(false);
        let saveUserFn: Function = isCreate ? addLeaves : editAcceptTeacherLeave;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: ITeacherLeaveFormState, saveFn: Function): void {
        if (teacher_leave) {
            const id = toast.loading("Đang gửi yêu cầu. Vui lòng đợi trong giây lát...", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });

            if (saveFn === editAcceptTeacherLeave) {
                dispatch(putTeacherLeave(teacher_leave_id, {
                    section_id: formState.section_id.value,
                    substitute_teacher_id: formState.substitute_teacher_id.value,
                    description: formState.description.value
                }, id))
            }
            else {
                dispatch(postTeacherLeave({
                    section_id: formState.section_id.value,
                    substitute_teacher_id: formState.substitute_teacher_id.value,
                    teacher_id: teacher_id,
                    classes_id: class_id,
                    description: formState.description.value
                }, id))
            }

            console.log({
                section_id: formState.section_id.value,
                substitute_teacher_id: formState.substitute_teacher_id.value,
                teacher_id: teacher_id,
                classes_id: class_id,
                description: formState.description.value
            })
        }
    }

    function cancelForm(): void {
        props.isCheck(false);
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.description.error || !formState.description.value) as boolean;
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow shadow-xx">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Gửi yêu cầu nghỉ dạy</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-group">
                                    <SelectKeyValue
                                        id="input_section_id"
                                        field="section_id"
                                        label="Buổi học"
                                        options={listSections}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.section_id.value}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <SelectKeyValue
                                            id="input_substitute_teacher_id"
                                            field="substitute_teacher_id"
                                            label="Giáo viên dạy thay"
                                            options={listTeachers}
                                            required={true}
                                            onChange={hasFormValueChanged}
                                            value={formState.substitute_teacher_id.value}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_description"
                                        field="description"
                                        value={formState.description.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={100}
                                        label="Lý do"
                                        placeholder="" />
                                </div>

                                {
                                    function () {
                                        if (isView === false) {
                                            return (
                                                <>
                                                    <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                                    <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
                                                </>
                                            )
                                        }
                                    }()
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default RequestOffSectionForm;
