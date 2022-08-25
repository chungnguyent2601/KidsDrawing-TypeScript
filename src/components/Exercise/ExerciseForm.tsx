import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IExerciseState, IExerciseLevelState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IExercise, ExerciseModificationStatus } from "../../store/models/exercise.interface";
import TextInput from "../../common/components/TextInput";
import { editExercise, clearSelectedExercise, setModificationState, addExercise } from "../../store/actions/exercise.action";
import { OnChangeModel, IExerciseFormState } from "../../common/types/Form.types";
import { IExerciseLevel } from "../../store/models/exercise_level.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { postExercise } from "../../common/service/Exercise/PostExercise";

export type exerciseListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
    data?: any;
};

type Options = {
    name: string;
    value: any;
}


function ExerciseForm(props: exerciseListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const exercises: IExerciseState | null = useSelector((state: IStateType) => state.exercises);
    const exercise_levels: IExerciseLevelState | null = useSelector((state: IStateType) => state.exercise_levels);
    let exercise: IExercise | null = exercises.selectedExercise;
    const isCreate: boolean = (exercises.modificationState === ExerciseModificationStatus.Create);

    if (!exercise || isCreate) {
        exercise = { id: 0, name: "", description: "", section_id: 0, section_name: "", level_id: 0, level_name: "", create_time: "", update_time: "" };
    }

    var id_y = localStorage.getItem('section_id');
    
    let section_id = 0;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }

    const listExerciseLevel: IExerciseLevel[] = exercise_levels.exercise_levels
    const listExerciseLevels: Options[] = [];
    listExerciseLevel.map((ele) => {
        let item: Options = { "name": ele.weight.toString() + "%", "value": ele.id }
        return listExerciseLevels.push(item)
    })

    const [formState, setFormState] = useState({
        section_id: { error: "", value: exercise.section_id },
        level_id: { error: "", value: exercise.level_id },
        name: { error: "", value: exercise.name },
        description: { error: "", value: exercise.description }
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
        let saveUserFn: Function = (isCreate) ? addExercise : editExercise;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IExerciseFormState, saveFn: Function): void {
        if (exercise) {
            if (saveFn === addExercise) {
                dispatch(postExercise({
                    section_id: section_id,
                    level_id: formState.level_id.value ,
                    name: formState.name.value,
                    description: formState.description.value 
                }))
            }

            dispatch(clearSelectedExercise());
            dispatch(setModificationState(ExerciseModificationStatus.None));
        }
    }

    function cancelForm(): void {
        props.isCheck(false);
        dispatch(setModificationState(ExerciseModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.name.error || !formState.name.value) as boolean;
    }

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} độ tuổi</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-group">
                                    <TextInput id="input_email"
                                        value={formState.name.value}
                                        field="name"
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={20}
                                        label="Tên"
                                        placeholder="" />
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_description"
                                        field="description"
                                        value={formState.description.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={100}
                                        label="Miêu tả"
                                        placeholder="" />
                                </div>

                                <div className="form-group">
                                    <SelectKeyValue
                                        id="input_level_id"
                                        field="level_id"
                                        label="Mức độ"
                                        options={listExerciseLevels}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.level_id.value}
                                    />
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

export default ExerciseForm;