import React from "react";
import "./FollowersCard.css";

import { Followers } from "../../Data/FollowersData";

const FollowersCard = () => {
  return (
    <div className="followersCard">
      <h3>Who is following you</h3>
      {Followers.map((follower, id) => {
        return (
          <div className="follower" key = {follower.name}>
            <div>
              <img src={follower.img} alt="" className="followerImage" />
              <div className="name">
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="btn fc-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
