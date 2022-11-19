import React from 'react';
import FollowersCard from '../Followerscard/FollowersCard';
import InfoCard from '../InfoCard/InfoCard';
import LogoSearch from '../LogoSearch/LogoSearch';

const ProfileLeft = () => {
  return (
    <div className="profileSide">
      <LogoSearch/>
      <InfoCard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileLeft