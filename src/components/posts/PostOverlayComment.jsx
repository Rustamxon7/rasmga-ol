import { useState, useEffect } from 'react';
import usersApi from '../../api/users';

import avatar from '../../assets/avatar.jpg';

const PostOverlayComment = (props) => {
  const [profile, setProfile] = useState('sd');

  useEffect(() => {
    async function getProfile() {
      const response = await usersApi.getUser(props.userId);

      setProfile(response.data.user);
    }
    getProfile();
  }, [props.userId]);

  console.log(profile);

  return (
    profile && (
      <div className="comment">
        <div className="comment__img">
          <img src={profile.avatar} alt="" />
        </div>

        <div className="comment__content">
          <span className="comment__username">
            {profile.username || profile.first_name + ' ' + profile.last_name}
          </span>{' '}
          {props.content}
        </div>
      </div>
    )
  );
};

export default PostOverlayComment;
