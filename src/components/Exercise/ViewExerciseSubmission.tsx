import jwt_decode from "jwt-decode";
import React, { Dispatch, FormEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IExerciseSubmissionState, IRootPageStateType, IStateType, IUserState } from "../../store/models/root.interface";
import "./ManageStudent.css"
import 'react-circular-progressbar/dist/styles.css';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getExerciseSubmissionById } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionById";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { editTeacher, setModificationState } from "../../store/actions/users.action";
import { toast, ToastContainer } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { postExerciseSubmission } from "../../common/service/ExerciseSubmission/PostExerciseSubmission";
import { useHistory } from "react-router-dom";
import { putExerciseSubmission } from "../../common/service/ExerciseSubmission/PutExerciseSubmissionById";
import { getExerciseSubmissionByExerciseAndStudent } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByExerciseAndStudent";
import { GrLinkNext } from "react-icons/gr";

const ViewExerciseSubmission: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);

    var id_x = localStorage.getItem("exercise_description");
    let exercise_description: string = "";
    if (id_x !== null) {
        exercise_description = id_x;
    }

    var id_y = localStorage.getItem("id");
    let id: number = 0;
    if (id_y !== null) {
        id = parseInt(id_y);
    }

    var id_y = localStorage.getItem('exercise_submission_id');
    var exercise_submission_id: number = 0;
    if (id_y !== null) {
        exercise_submission_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem("exercise_id");
    let exercise_id: number = 0;
    if (id_z !== null) {
        exercise_id = parseInt(id_z);
    }

    var id_k = localStorage.getItem("exercise_name");
    let exercise_name = "";
    if (id_k !== null) {
        exercise_name = (id_k);
    }

    var id_h = localStorage.getItem("exercise_level_name");
    let exercise_level_name = "";
    if (id_h !== null) {
        exercise_level_name = (id_h);
    }

    var id_i = localStorage.getItem("deadline");
    let deadline = "";
    if (id_i !== null) {
        deadline = (id_i);
    }

    var id_t = localStorage.getItem("time_submit");
    let time_submit = "";
    if (id_t !== null) {
        time_submit = (id_t);
    }

    var id_j = localStorage.getItem("url_exercise_submission");
    let url_exercise_submission = "";
    if (id_j !== null) {
        url_exercise_submission = (id_j);
    }

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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getExerciseSubmissionById(dispatch, exercise_id, id))
                }
            }
            else {
                trackPromise(getExerciseSubmissionById(dispatch,  exercise_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token,  exercise_id, id]);

    var id_jx = localStorage.getItem("path");
    let pathx = "";
    if (id_jx !== null) {
        pathx = (id_jx);
    }

    var id_yx = localStorage.getItem('section_number');
    let section_number = 0;
    if (id_yx !== null) {
        section_number = parseInt(id_yx);
    }
    
    useEffect(() => {
        if (pathx == '/classes/section') {
            dispatch(updateCurrentPath("Buổi " + section_number, "Bài tập: " + exercise_name));
        }
        else {
            dispatch(updateCurrentPath("Buổi học", "Bài tập: " + exercise_name));
        }
        
    }, [path.area, dispatch, exercise_name, pathx, section_number])
    
    

    let users: IUserState = useSelector((state: IStateType) => state.users);
    let user: IUser | null = users.selectedUser;

    const isCreate: boolean = (users.modificationState === UserModificationStatus.Create);

    if (!user || isCreate) {
        user = { id: 0, username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0, parent: "", student_ids: [], student_names: [] }
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
            dispatch(putExerciseSubmission({
                image_url: url,
                student_id: id,
                exercise_id: exercise_id
            }, idx, routeHome))
        }
    }

    const history = useHistory();
    function routeHome() {
        
    }

    function notify() {
        toast.info("Cập nhật thành công!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });
    }

    function cancelForm(): void {
        dispatch(setModificationState(UserModificationStatus.None));
        setImage(null)
        setPreview("")
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (preview === null || preview === "") as boolean;
    }

    const [preview, setPreview] = useState("")

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
        console.log(e.target.files[0])
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

    function handleDrawing() {
        let path = '/drawing'; 
        history.push({
            pathname: path
        });
    }


    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
            <ToastContainer />
            <div className="row">
            <div className="col-xl-6 col-md-6 mb-4">
                <div className="row">
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                <div className="card-body">
                                    <div className="row no-gutters justify-content-left">
                                        <h4 id="full-name">Thông tin bài tập</h4>
                                    </div>
                                    <div className="row no-gutters">
                                        <p id="phone">Tên: {exercise_name}</p>
                                    </div>
                                    <div className="row no-gutters">
                                        <p id="phone">Nội dung: <span dangerouslySetInnerHTML={{ __html: exercise_description }}></span></p>
                                    </div>

                                    

                                    <div className="row no-gutters">
                                        <p id="phone">Hạn nộp: {deadline.replaceAll("T", " ").substring(0,16)}</p>
                                    </div>

                                    <div className="row no-gutters">
                                        <p id="phone">Đã nộp lúc: {time_submit.replaceAll("T", " ").substring(0,16)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-6 col-md-6 mb-4">
                <div className="row">
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow py-2`} >
                            <div className="card-body">
                                <div className="row no-gutters justify-content-left exercise-list">
                                    <h4 id="full-name">Nộp bài</h4>
                                </div>
                                <div className="row mx-auto">
                                    <form onSubmit={saveUser}>
                                        <div className="form-row">
                                            <div className="form-group pl-2">
                                                <label htmlFor="profile_image">Chọn ảnh:</label>
                                                <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture} />
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                        <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
    </div>

    <div className="row">
        <div className="col-xl-12 col-lg-12">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài nộp của học sinh</h6>
            </div>
            <div className="card-body mx-auto">
                {
                    function () {
                        return (
                            <PhotoProvider>
                                <PhotoView src={(preview === null || preview === "")  ? url_exercise_submission : preview}>
                                    <img src={(preview === null || preview === "")  ? url_exercise_submission : preview} alt="" className="center-x" />
                                </PhotoView>
                            </PhotoProvider>
                            )
                    }()
                }
            </div>
        </div>
    </div>

        </Fragment>
    );
};

export default ViewExerciseSubmission;
