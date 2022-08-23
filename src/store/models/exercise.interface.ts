export interface IExercise {
    id: number;
    name: string;
    description: string;
    section_id: number;
    level_id: number;
    level_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}

export enum ExerciseModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}