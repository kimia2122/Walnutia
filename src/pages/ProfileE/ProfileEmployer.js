import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  clearReducer,
  userSelector,
  GetAddressEmployer,
} from "../../Store/features/User/Employer/getAddressSlice";
import history from "../../History/history";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import EditProfilePOP from "./EditProfilePOP";
import FUCK from "../../Assets/svg/fuck.jpg";

const ProfileEmployer = () => {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError } = useSelector(userSelector);
  const [popupOpen, setPopupOpen] = useState(false);

  const editProfileButton = () => {
    setPopupOpen(!popupOpen);
  };

  useEffect(() => {
    dispatch(GetAddressEmployer());
    // dispatch(clearReducer());
  });

  return (
    <div>
      {/* <div><Header /></div> */}
      <div style={{ marginLeft: "3rem" }}>
        <div>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: "5rem", height: "5rem", margin: "1rem" }}
              src={FUCK}
              alt="user image"
            />
            <h4>{sessionStorage.getItem("fullName")}</h4>
          </div>
          <div
            className="input-main"
            style={{ display: "flex", margin: "1rem" }}
          >
            <h4>شماره تماس</h4>
            <h4>{localStorage.getItem("PhoneNumber")}</h4>
          </div>
          <button
            className="btn-main"
            style={{ margin: "1rem" }}
            onClick={editProfileButton}
          >
            edit profile
          </button>
          {popupOpen && <EditProfilePOP handleClose={editProfileButton} />}
        </div>

        <div>showing address</div>
        <div>
          <button
            onClick={() => {
              history.push("/AddAddress");
            }}
          >
            + add address
          </button>
        </div>
        <button>
          <a onClick={() => history.push("/Order")}>niro bgiro ina</a>
        </button>
        <div>
          <label>
            <input type="checkbox" />
            <span>anjam shode</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>dar hal anjam</span>
          </label>
        </div>
        <div>showing works with detail</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileEmployer;
