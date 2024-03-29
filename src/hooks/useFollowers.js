import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../services/apiUsers";
import useProfile from "../features/profile/useProfile";

const useFollowers = () => {
  const { user } = useProfile();

  const {
    isLoading: followersLoading,
    data: followers,
    error: followersError,
  } = useQuery({
    queryKey: ["followers"],
    queryFn: () => getFollowers(user?.id),
  });

  return { followersLoading, followers, followersError };
};

export default useFollowers;
