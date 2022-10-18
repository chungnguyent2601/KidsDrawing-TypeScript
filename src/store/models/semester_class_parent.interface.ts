export interface ISemesterClassParent {
    id: string;
    name: string;
    course_name: string;
    course_id: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    semester_name: string;
    semester_id: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    registration_deadline: string;
    student_registered_name: string[];
    student_registered_id: string[];
    status: string;
}

export enum SemesterClassParentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}