import React from "react";
import { useSelector } from "react-redux";
import TopCardLevel from "../../common/components/TopCardLevel";
import { IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";

export type teacherRegisterQuantificationListProps = {
    onSelect?: (teacherRegisterQuantification: ITeacherRegisterQuantification) => void;
    children?: React.ReactNode;
};

function TeacherRegisterQuantificationList(props: teacherRegisterQuantificationListProps): JSX.Element {
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);

    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = teacherRegisterQuantifications.approveds.map((ele, index) => {
        if (!ele) { return null; }
        return (
            <TopCardLevel 
                time_approved={ele.time_approved}
                course_name={ele.course_name} 
                icon="book" class="primary" 
                status="Đã được duyệt"
                art_age_name={ele.art_age_name}
                art_level_name={ele.art_level_name}
                art_type_name={ele.art_type_name}
                degree_photo_url={ele.degree_photo_url} 
                teacher_level={ele}
            />
        );
    });


    return (
        <>
            {teacherRegisterQuantificationElements}
        </>
    );
}

export default TeacherRegisterQuantificationList;
