import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ISemesterClassState, IScheduleState } from "../../store/models/root.interface";
import { ISemesterClass, SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { setModificationStateSemesterClass } from "../../store/actions/semester_class.action";

export type semesterClassListProps = {
  onSelect?: (semester_class: ISemesterClass) => void;
  children?: React.ReactNode;
  value?: string;
};

type Options = {
  name: string;
  value: any;
}


function ClassSemesterList(props: semesterClassListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const semester_classes: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
  const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);
  let schedule_list: Options[] = []
  console.log(semester_classes.semesterClasses)
  if (schedules.schedules.length > 0){
    semester_classes.semesterClasses.map(ele => {
      let item: string = "";
      schedules.schedules.map(element => {
        if (element.semester_class_id === ele.id) {
          console.log(element.lesson_time)
          item += element.lesson_time
        }
        return element
      })
      return schedule_list.push({
        name: ele.name,
        value: item
      })
    })
  }

  console.log(schedule_list)

  const courseElements: (JSX.Element | null)[] = semester_classes.semesterClasses.map((semester_class, index) => {
    if (!semester_class) { return null; }
    return (<tr className={`table-row ${(semester_classes.selectedSemesterClass && semester_classes.selectedSemesterClass.id === semester_class.id) ? "selected" : ""}`}
      key={`semester_class_${semester_class.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{semester_class.name}</td>
      <td>{semester_class.course_name}</td>
      <td>{semester_class.semester_name}</td>
      <td>{schedule_list.length ===0 ? "" : schedule_list[index].value}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(semester_class);
          dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(semester_class);
          dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Remove))
        }}>Xóa</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên lớp</th>
            <th scope="col">Thuộc khóa học</th>
            <th scope="col">Học kì</th>
            <th scope="col">Lịch học</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {courseElements}
        </tbody>
      </table>
    </div>

  );
}

export default ClassSemesterList;
