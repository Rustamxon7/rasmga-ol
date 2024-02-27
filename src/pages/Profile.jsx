import React, { useState } from "react";
import {
  HiMiniCog6Tooth,
  HiOutlineUserPlus,
  HiMiniEllipsisHorizontal,
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiOutlinePaperAirplane,
  HiOutlineBookmark,
  HiChevronLeft,
  HiHeart,
  HiChatBubbleOvalLeft,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import TopHeader from "../ui/TopHeader";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/apiPosts";
import { getMe } from "../services/apiUsers";
import Modal from "../ui/Modal";
import usePosts from "../hooks/usePosts";
import useProfile from "../hooks/useProfile";
import useFollowers from "../hooks/useFollowers";
import Followers from "../features/profile/Followers";
import Followings from "../features/profile/Followings";
import useUnFollow from "../hooks/useUnFollow";
import useFollow from "../hooks/useFollow";
import useCurrentUser from "../hooks/useCurrentUser";
import Header from "../features/profile/Header";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("posts");
  const { username: profileName } = useParams();

  const { currentUserLoading, currentUser, currentUserError } =
    useCurrentUser();
  const { isLoading, posts, error } = usePosts();
  const { userLoading, user, userError } = useProfile();
  const { isUnFollowing, unFollowUser } = useUnFollow();
  const { isFollowing, followUser } = useFollow();

  if (isLoading || userLoading || currentUserLoading) {
    return <div>Loading...</div>;
  }

  if (error || userError) {
    return <div>Error: {error?.message || userError?.message}</div>;
  }

  const { username, id } = user;

  const reels = posts.filter((post) => post.image.url.includes("mp4"));

  return (
    <div className="flex flex-col xl:items-center xl:justify-center">
      <TopHeader>
        <NavLink to="/account/settings">
          <HiMiniCog6Tooth className="mr-auto text-2xl" />
        </NavLink>
        <h1 className="w-full text-center text-xl">{username}</h1>
        <HiOutlineUserPlus className="text-2xl" />
      </TopHeader>

      <Header />

      <div className="flex flex-col xl:w-[70dvw]">
        <div className="flex flex-row items-center justify-center gap-12 p-2 px-4 text-gray-400">
          <div
            className={`flex flex-row items-center gap-1 py-1 text-gray-400 ${currentPage === "posts" ? "border-t border-gray-200 text-gray-200" : ""}`}
            onClick={() => setCurrentPage("posts")}
          >
            <HiOutlineSquares2X2 className="text-xl" />
            Posts
          </div>

          <div
            className={`flex flex-row items-center gap-1 py-1 text-gray-400 ${currentPage === "reels" ? "border-t border-gray-200 text-gray-200" : ""}`}
            onClick={() => setCurrentPage("reels")}
          >
            <HiOutlineHeart className="text-xl" />
            Reels
          </div>
        </div>

        {currentPage === "posts" ? (
          <Posts posts={posts} />
        ) : (
          <Reels reels={reels} />
        )}
      </div>
    </div>
  );
};

export default Profile;

const Posts = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts?.map((post, index) => (
        <LoadMedia
          key={index}
          media={post.image.url}
          comments={post.comments.length}
          likes={post.likes.length}
        />
      ))}
    </div>
  );
};

const Reels = ({ reels }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {reels?.map((reel, index) => (
        <LoadMedia
          key={index}
          media={reel.image.url}
          comments={reel.comments.length}
          likes={reel.likes.length}
        />
      ))}
    </div>
  );
};

const LoadMedia = ({ media, comments, likes }) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover);
  };

  if (media.includes("mp4")) {
    return (
      <div className="relative">
        <video
          src={media}
          className="h-32 w-full object-cover md:h-80"
          controls
          onMouseOver={handleHover}
        />

        <PostInfo
          hover={hover}
          handleHover={handleHover}
          comments={comments}
          likes={likes}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <PostInfo
        hover={hover}
        handleHover={handleHover}
        comments={comments}
        likes={likes}
      />
      <img
        src={media}
        alt="post"
        className="h-32 w-full object-cover md:h-80"
        onMouseOver={handleHover}
      />
    </div>
  );
};

const PostInfo = ({ hover, handleHover, comments, likes }) => {
  return (
    hover && (
      <div
        className="absolute top-0 flex h-full w-full items-center justify-center gap-8 bg-black bg-opacity-50"
        onMouseLeave={handleHover}
      >
        <div className="flex items-center gap-2">
          <HiHeart className="text-2xl text-gray-50" />
          <p className="text-gray-50">{likes}</p>
        </div>
        <div className="flex items-center gap-2">
          <HiChatBubbleOvalLeft className="text-2xl text-gray-50" />
          <p className="text-gray-50">{comments}</p>
        </div>
      </div>
    )
  );
};
