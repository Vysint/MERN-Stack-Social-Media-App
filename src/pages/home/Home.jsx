import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import Rightside from "../../components/RightSide/Rightside";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <ProfileSide/>
      <PostSide/>
      <Rightside/>
    </div>
  );
};

export default Home;
