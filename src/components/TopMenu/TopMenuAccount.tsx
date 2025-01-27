import React, { useState, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putStatusUser } from "../../common/service/User/UpdateStatusUser";
import { logout } from "../../store/actions/account.actions";
import { trackPromise } from "react-promise-tracker";
import { IProfileState, IStateType } from "../../store/models/root.interface";
import { getProfile } from "../../common/service/User/GetProfile";
import { useHistory } from "react-router-dom";

function TopMenuAccount(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const username: string | null = localStorage.getItem('username');
  const id = localStorage.getItem('id')
  const profiles: IProfileState = useSelector((state: IStateType) => state.profiles);
  useEffect(() => {
    trackPromise(getProfile(dispatch, id))
  }, [dispatch, id])
  const [isShow, setShow] = useState(false);

  const history = useHistory();

  function changeRoute1(){
    let path = '/account'; 
      history.push({
          pathname: path,
      });
  }

  function changeRoute2(){
    let path = '/change-password'; 
      history.push({
          pathname: path,
      });
  }

  console.log(profiles.profiles)
  let profile_image = ""
  if (profiles.profiles.length > 0 ){
    localStorage.setItem('profile_image', profiles.profiles[0].profile_image_url)
  }

  var id_x = localStorage.getItem('profile_image');
  if (id_x !== null) {
    profile_image = id_x;
  }

  return (

    <li className="nav-item dropdown no-arrow">
      <p className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline small cadet">{username}</span>
        <img className="img-profile rounded-circle" alt=""
          src={profile_image !== null ? profile_image :  "https://source.unsplash.com/QAB-WJcbgJk/60x60"} />
      </p>

      <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
        <p className="dropdown-item"
        onClick={() =>{changeRoute1()}}
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Chỉnh thông tin các nhân
        </p>
        <p className="dropdown-item"
        onClick={() =>{changeRoute2()}}
        data-toggle="modal"
        data-target="#change-password">
          <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
          Thay đổi mật khẩu
        </p>
        <p className="dropdown-item logout-btn"
        onClick={() => {
          let id = localStorage.getItem('id');
          localStorage.clear();
          dispatch(logout())
          dispatch(putStatusUser(id, {
            status: null
          }))
        }}
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </p>
      </div>
    </li>
  );
};

export default TopMenuAccount;
