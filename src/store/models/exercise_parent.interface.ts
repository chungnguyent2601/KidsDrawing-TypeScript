export interface IExerciseParent {
    id: any;
    name: string;
    
    student_id: number;
    student_name: string;
    description: string;
    section_id: number;
    deadline: string;
    time_submit:  string;
    teacher_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}

export enum ExerciseParentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}