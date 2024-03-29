import React from "react";
import { HiChevronLeft } from "react-icons/hi2";
import useFollowers from "../../hooks/useFollowers";
import { NavLink } from "react-router-dom";
import useFollow from "../../hooks/useFollow";

const Followers = ({ id, onClose }) => {
  const { followers } = useFollowers(id);
  const { isFollowing, followUser } = useFollow();

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-gray-800">
      <div className="flex h-[26rem] w-[25rem] flex-col font-medium text-gray-50">
        <div className="flex w-full items-center justify-between border-b border-gray-700 px-2 py-2">
          <HiChevronLeft className="text-xl" />
          <span className="mx-auto">Followers</span>
        </div>
        <div className="flex flex-col overflow-y-auto pt-4">
          {followers?.map((follower, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2"
            >
              <NavLink
                className="flex items-center gap-2"
                to={`/profile/${follower.username}`}
                onClick={onClose}
              >
                <img
                  src={follower.avatar}
                  alt="profile"
                  className="h-10 w-10 rounded-[50%]"
                />
                <h3>{follower.username}</h3>
              </NavLink>
              {!follower.is_followed && (
                <button
                  className="rounded-lg bg-blue-500 px-6 py-1 text-sm text-gray-50"
                  onClick={() => followUser(follower.id)}
                  disabled={isFollowing}
                >
                  {isFollowing ? "Following" : "Follow Back"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
