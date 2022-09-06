import React, { useState, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationDb } from "../../common/service/NotificationDb/GetNotificationDb";
import { getUserReadNotification } from "../../common/service/UserReadNotification/GetUserReadNotificationByUser";
import { logout } from "../../store/actions/account.actions";
import { INotificationDbState, IStateType, IUserReadNotificationState } from "../../store/models/root.interface";
import "./TopNotification.css"

type Options = {
  notification_id: number;
  user_id: number;
  notification_name: string;
  notification_desciption: string;
  notification_time: string;
  is_read: boolean;
}

function TopMenuNotification(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const notificationDbs: INotificationDbState = useSelector((state: IStateType) => state.notification_dbs);
  const user_read_notifications: IUserReadNotificationState = useSelector((state: IStateType) => state.user_read_notifications);
  const [isShow, setShow] = useState(false);

  var id_x = localStorage.getItem('id');
  let user_id: number = 0;
  if (id_x !== null) {
    user_id = parseInt(id_x)
  }

  useEffect(() => {
    dispatch(getNotificationDb())
    dispatch(getUserReadNotification(user_id))
  }, [dispatch, user_id])

  let data_not_read: Options[] = [];
  let total = 0;
  user_read_notifications.user_not_readed_notifications.map((ele, idx) => {
    let notification = notificationDbs.notification_dbs.find(o => o.id = ele.notification_id);
    if (notification !== undefined){
      let item: Options = {
        notification_id: ele.notification_id,
        notification_name: notification.name,
        user_id: ele.user_id,
        notification_time: notification.time,
        notification_desciption: notification.description,
        is_read: ele.is_read
      }
      total ++;
      return data_not_read.push(item)
    }
    return idx
  })

  let data_readed: Options[] = [];
  user_read_notifications.user_readed_notifications.map((ele, idx) => {
    let notification = notificationDbs.notification_dbs.find(o => o.id = ele.notification_id);
    if (notification !== undefined && total <= 6){
      let item: Options = {
        notification_id: ele.notification_id,
        notification_name: notification.name,
        user_id: ele.user_id,
        notification_time: notification.time,
        notification_desciption: notification.description,
        is_read: ele.is_read
      }
      return data_readed.push(item)
    }
    return idx
  })

  return (

    <li className="nav-item dropdown no-arrow">


      <a className="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" onClick={() => {
        setShow(!isShow);
      }} href="# ">
        <span className="badge badge-danger ml-2">{user_read_notifications.user_not_readed_notifications.length}</span>
        <i className="fas fa-bell"></i>
      </a>

      <div className={`dropdown-menu dropdown-menu-right shadow dropdown-secondary animated--grow-in ${(isShow) ? "show" : ""} notification`}
        aria-labelledby="userDropdown">
          <ul className="list-notify">
            {
              data_not_read.map((ele, idx) => {
                return (
                  <li key={idx}>
                    <a className="dropdown-item waves-light"
                      onClick={() => { }}
                      href="# "
                      data-toggle="modal"
                      data-target="#logoutModal">
                      <i className="fas fa-bell fa-sm fa-fw mr-2"></i>
                      {ele.notification_name}
                      <span className="badge badge-danger ml-2">*</span>
                    </a>
                  </li>
                )
              })
            }


            {
              data_readed.map((ele, idx) => {
                return (
                  <li>
                    <a className="dropdown-item waves-light"
                      onClick={() => dispatch(logout())}
                      href="# "
                      data-toggle="modal"
                      data-target="#logoutModal">
                      <i className="fas fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
                      {ele.notification_name}
                    </a>
                  </li>
                )
              })
            }
          </ul>
          <div className="view-all-notify text-center">
            <a href="/notification">Xem toàn bộ</a>
          </div>
      </div>
    </li>
  );
};

export default TopMenuNotification;
