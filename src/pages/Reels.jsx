import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiOutlinePaperAirplane,
  HiOutlineBookmark,
  HiMiniEllipsisHorizontal,
  HiMiniPlay,
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark,
} from "react-icons/hi2";
import { getPosts } from "../services/apiPosts";
import { useInView } from "framer-motion";
import Reveal from "../ui/Reveal";
import Like from "../ui/Like";
import LoadingReels from "../features/loading/LoadingReels";
import usePosts from "../hooks/usePosts";

const Reels = () => {
  const [muted, setMuted] = useState(true);

  const { isLoading, posts, error } = usePosts();

  if (isLoading) {
    return <LoadingReels />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const reels = posts.filter((post) => post.image?.url.includes("mp4"));

  return (
    <div className="flex flex-col items-center xl:gap-8 xl:py-4">
      {reels.map((reel, index) => (
        <Reel key={index} reel={reel} muted={muted} setMuted={setMuted} />
      ))}
    </div>
  );
};

export default Reels;

const Reel = ({ reel, muted, setMuted }) => {
  const { id, image, likes, comments, created_at, username, avatar, content } =
    reel;

  return (
    <div className="relative h-full w-full xl:w-[30dvw]" key={id}>
      <LoadMedia media={image?.url} muted={muted} setMuted={setMuted} />

      <div className="absolute bottom-4 flex w-full flex-col items-end gap-8 px-4 pb-2">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <Like likes={likes} id={id} />
            <span className="text-xs">{likes.length}</span>
          </div>
          <div className="flex flex-col items-center">
            <HiOutlineChatBubbleOvalLeft className="text-2xl" />
            <span className="text-xs">{comments.length}</span>
          </div>
          <HiOutlinePaperAirplane className="text-2xl" />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="aspect-h-1 w-10">
                <img src={avatar} alt="profile" className="rounded-full" />
              </div>
              <h3 className="text-sm font-semibold">username</h3>
              <span className="text-2xl text-gray-400">·</span>
              <button className="text-sm text-gray-400">Follow</button>
            </div>

            <div className="text-sm">
              lorem ipsum dolor sit amet, consectetur{" "}
              <span className="text-sm text-gray-400">...more</span>
            </div>
          </div>

          <HiMiniEllipsisHorizontal className="ml-auto text-xl" />
        </div>
      </div>
    </div>
  );
};

const LoadMedia = ({ media, muted, setMuted }) => {
  const ref = useRef();
  const testRef = useRef();
  const isInView = useInView(testRef);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (media && media.includes("video")) {
      if (!isInView) {
        ref.current.pause();
        setPlayVideo(false);
      } else {
        ref.current.play();
      }
    }
  }, [isInView, media]);

  useEffect(() => {
    ref.current.muted = muted;
  }, [muted]);

  const handlePlayVideo = () => {
    ref.current.play();
    setPlayVideo(false);
  };

  const handlePauseVideo = () => {
    ref.current.pause();
    setPlayVideo(true);
  };

  const handleMuteVideo = () => {
    ref.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <Reveal>
      <video
        src={media}
        alt="post"
        className="h-[93dvh] w-full object-cover md:h-[100dvh] xl:rounded-lg"
        ref={ref}
        onClick={handlePauseVideo}
        loop
        muted
      />

      {playVideo && (
        <div
          className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
          onClick={handlePlayVideo}
        >
          <HiMiniPlay className="text-8xl text-white" />
        </div>
      )}

      {muted ? (
        <HiMiniSpeakerXMark
          className="absolute right-4 top-4 text-2xl text-white"
          onClick={handleMuteVideo}
        />
      ) : (
        <HiMiniSpeakerWave
          className="absolute right-4 top-4 text-2xl text-white"
          onClick={handleMuteVideo}
        />
      )}

      <div
        className="absolute left-1/2 top-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
        ref={testRef}
      ></div>
    </Reveal>
  );
};
