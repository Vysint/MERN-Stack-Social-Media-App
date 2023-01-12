import React from "react";
import { useSelector } from "react-redux";

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="follower">
      <div>
        <img
          src={
            user.coverPicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.lastname}</span>
        </div>
      </div>
      <button className="button fc-button">Follow</button>
    </div>
  );
};

export default User;
