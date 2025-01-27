export interface ICourseNew {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    
    art_type_id: number;
    art_level_id: number;
    art_age_id: number;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    total: number;
    total_register: number;
    create_time: string;
    update_time: string;
}

export enum CourseNewModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}