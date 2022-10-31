import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { editTeacher, setModificationState } from "../../store/actions/users.action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postExerciseSubmission } from "../../common/service/ExerciseSubmission/PostExerciseSubmission";

function FormSubmit(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();

    let users: IUserState = useSelector((state: IStateType) => state.users);
    let user: IUser | null = users.selectedUser;

    const isCreate: boolean = (users.modificationState === UserModificationStatus.Create);

    if (!user || isCreate) {
        user = { id: "", username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: "" }
    }

    var id_x = localStorage.getItem("exercise_description");
    let exercise_description: string = "";
    if (id_x !== null) {
        exercise_description = id_x;
    }

    var id_y = localStorage.getItem("id");
    let id: string = "";
    if (id_y !== null) {
        id = id_y;
    }

    var id_z = localStorage.getItem("exercise_id");
    let exercise_id: string = "";
    if (id_z !== null) {
        exercise_id = id_z;
    }


    async function saveUser(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        var url = await setImageAction();
        let saveUserFn: Function = editTeacher;
        saveForm(saveUserFn, url, idx);
    }

    function saveForm(saveFn: Function, url: string, idx: any): void {
        if (user) {
            dispatch(postExerciseSubmission({
                student_id: id,
                exercise_id: exercise_id,
                image_url: url
            }, idx))
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(UserModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (image === null) as boolean;
    }

    const src = user.profile_image_url;

    const [preview, setPreview] = useState(src)

    const [image, setImage] = useState<any>();

    const uploadPicture = (e: any) => {
        setImage({
            /* contains the preview, if you want to show the picture to the user
                you can access it with this.state.currentPicture
           */
            picturePreview: URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile: e.target.files[0]
        })
        setPreview(URL.createObjectURL(e.target.files[0]))
    };

    async function setImageAction() {
        const formData = new FormData();
        formData.append(
            "gifFile",
            image.pictureAsFile
        );
        // do your post request
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/cloudinary/gifs`, {
            method: "POST",
            body: formData
        }
        )
        const data = await res.json()
        return data.url_image

    };

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow shadow-xx">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Đề bài</h6>
                        </div>
                        <ToastContainer />
                        <div className="card-body">
                            <div className="col-xl-12 col-md-12 col-xs-12" dangerouslySetInnerHTML={{ __html: exercise_description }}>

                            </div>
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

export default FormSubmit;
