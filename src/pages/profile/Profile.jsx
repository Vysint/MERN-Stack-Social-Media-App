import React from 'react'
import PostSide from '../../components/PostSide/PostSide';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import Rightside from '../../components/RightSide/Rightside';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <ProfileLeft/>
      <div className="profile-center">
        <ProfileCard/>
        <PostSide/>
      </div>
      <Rightside/>
    </div>
  )
}

export default Profile