import React from "react";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <ProfileSide/>
      <div className="postSide">Posts</div>
      <div className="rightSide">Right</div>
    </div>
  );
};

export default Home;
