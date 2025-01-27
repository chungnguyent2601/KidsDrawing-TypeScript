import React from "react";
import { useSelector } from "react-redux";
import TopCardLevelApproved from "../../common/components/TopCardLevelApproved";
import { IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";

export type teacherRegisterQuantificationListProps = {
    onSelect?: (teacherRegisterQuantification: ITeacherRegisterQuantification) => void;
    children?: React.ReactNode;
};

function TeacherLevelList(props: teacherRegisterQuantificationListProps): JSX.Element {
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);

    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = teacherRegisterQuantifications.approveds.map((ele, index) => {
        if (!ele) { return null; }
        return (
            <tr className={`table-row`} key={`semester_class_${index}`}>
            <TopCardLevelApproved 
                course_name={ele.course_name} 
                status="Đã được duyệt"
                time_approved={ele.time_approved}
                icon="edit" class="warning" 
                art_age_name={ele.art_age_name}
                art_level_name={ele.art_level_name}
                art_type_name={ele.art_type_name}
                degree_photo_url={ele.degree_photo_url}
                teacher_level={ele}
            />
            </tr>
        );
    });


    return (
         <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
          </tr>
        </thead>
        <tbody>
        {teacherRegisterQuantificationElements}
        </tbody>
        </table>
    </div>
    );
}

export default TeacherLevelList;
