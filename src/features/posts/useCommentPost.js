import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment as postCommentApi } from "../../services/apiPosts";
import toast from "react-hot-toast";

const useCommentPost = () => {
  const queryClient = useQueryClient();

  const { status, mutate: postComment } = useMutation({
    mutationFn: postCommentApi,
    onSuccess: () => {
      toast.success("Comment posted successfully");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["home"],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
  });

  const isCommenting = status === "pending";

  return { isCommenting, postComment };
};

export default useCommentPost;
