import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../modules";
import { localAuthData } from "../../utils";

export const ProfileLayout = props => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user.data);

  useEffect(() => {
    dispatch(getUserAction({
      id: localAuthData.getUserId(),
    }));
  }, []);

  return (
    <div className="profile-wrapper">
      <div className="profile-icon">
        <svg width="62" height="61" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M51.4284 19.6552C51.4284 29.9253 42.7953 38.3103 32.0713 38.3103C21.3472 38.3103 12.7141 29.9253 12.7141 19.6552C12.7141 9.38499 21.3472 1 32.0713 1C42.7953 1 51.4284 9.38499 51.4284 19.6552Z" stroke="#AC1900" strokeWidth="2"/>
          <path d="M61 60C56.4639 54.2907 43.9278 42.9902 30.0722 43.4627C16.2165 43.9351 4.91753 54.6844 1 60" stroke="#AC1900" strokeWidth="2"/>
        </svg>
      </div>
      <div className="profile-content">
        {
          props.render({
            profile: Array.isArray(user) ? user[0] : user
          })
        }
      </div>
    </div>
  );
}