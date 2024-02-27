import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPosts } from "../../services/apiPosts";
import Post from "./Post";

const Posts = () => {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="col-start-1 col-end-2 sm:px-24">
      <div className="flex flex-col items-center gap-4">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
