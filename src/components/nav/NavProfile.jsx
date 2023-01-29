import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { IoChevronDownOutline } from 'react-icons/io5';
import Verified from '../UI/Verified';

import './NavProfile.scss';

const NavProfile = (props) => {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className='nav-profile'>
      <div className='nav-profile__avatar'>
        <img
          className='nav-profile__avatar-img'
          src={user.avatar}
          alt='User avatar'
        />
      </div>
      <div className='nav-profile__name-box'>
        <NavLink to={`/users/${user.username}`}>
          <span className='nav-profile__id'>
            {user.username}
            <Verified />
          </span>
        </NavLink>
        <span className='nav-profile__name'>
          {user.first_name + ' ' + user.last_name}
        </span>
      </div>
      <div className='nav-profile__icon'>
        <IoChevronDownOutline />
      </div>
    </div>
  );
};

export default NavProfile;
