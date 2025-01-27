export interface ISemesterClassParent {
    id: any;
    name: string;
    course_name: string;
    course_id: number;
    semester_class_id: number;
    start_date: string;
    registration_expiration_time: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    semester_name: string;
    semester_id: number;
    status: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    total_register: number;
    schedule: string;
    student_id: number;
    student_name: string;
    registration_deadline: string;
}

export enum SemesterClassParentModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}