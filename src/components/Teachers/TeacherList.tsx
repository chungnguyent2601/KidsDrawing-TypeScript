import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/users.action";
import { UserModificationStatus, IUser } from "../../store/models/user.interface";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type userListProps = {
  onSelect?: (user: IUser) => void;
  value?: string;
  children?: React.ReactNode;
};

function TeacherList(props: userListProps): JSX.Element {

  const dispatch: Dispatch<any> = useDispatch();

  const users: IUserState = useSelector((state: IStateType) => state.users);
  const teacher_register_quantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
  const history = useHistory();

  const routeChange = (user: IUser) => {
    let path = '/teachers/detail';
    history.push({
      pathname: path,
      state: { user: user }
    });
  }

  const onChangeRequest = (teacher_id: number) => {
    let path = '/teachers/request-level';
    history.push({
      pathname: path,
      state: {teacher_id: teacher_id}
    });
  }

  const userElements: (JSX.Element | null)[] = users.teachers.filter((val) => {
    if (props.value === ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.username).toLowerCase().includes(props.value.toLowerCase()) || val.username.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    return null
  }).map((teacher, index) => {
    if (!teacher) { return null; }
    let total = 0;
    let teacher_level = 0;
    teacher_register_quantifications.not_approved_now.map((ele, index) => {
      if (ele.teacher_id === teacher.id){
        total ++;
      }
      return ele
    })
    teacher_register_quantifications.approveds.map((ele, index) => {
      if (ele.teacher_id === teacher.id){
        teacher_level ++;
      }
      return ele
    })
    return (<tr className={`table-row ${(users.selectedUser && users.selectedUser.id === teacher.id) ? "selected" : ""}`}

      key={`user_${index}`}>
      <th scope="row" onClick={() => {routeChange(teacher)}}>{index + 1}</th>
      <td onClick={() => {routeChange(teacher)}}>{teacher.firstName} {teacher.lastName}</td>
      <td onClick={() => {routeChange(teacher)}}>{teacher.username}</td>
      <td onClick={() => {routeChange(teacher)}}>{teacher.email}</td>
      <td>{teacher_level}</td>
      <td onClick={() => {
        onChangeRequest(teacher.id)
      }}>{total}</td> 
      {
        function () {
          console.log(teacher.status)
          if (teacher.status !== "" && teacher.status !== null){
            return (
              <td style={{color: "#18AB56"}}>Đang hoạt động</td>
            )
          }
          else { 
            return (
              <td style={{color:"#2F4F4F"}}>Không hoạt động</td>
            )
          }
        }()
      }

      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          if(props.onSelect) props.onSelect(teacher);
          dispatch(setModificationState(UserModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(teacher);
          dispatch(setModificationState(UserModificationStatus.Remove))
        }}>Xóa</button>
      </td>
    </tr>);
  });


  return (
    <Fragment>
      <div className="table-responsive portlet">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Tài khoản</th>
              <th scope="col">Email</th>
              <th scope="col">Trình độ</th>
              <th scope="col">Xác nhận trình độ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Hành động</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userElements}
          </tbody>
        </table>
      </div>
    </Fragment>

  );
}

export default TeacherList;
