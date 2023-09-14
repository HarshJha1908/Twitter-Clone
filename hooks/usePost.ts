import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePost = (postId?: string) => {
  /**
   * used to fetch the user and store in the global store so that we dont want to fetch the user again and again
   */  
  const url = postId ? `/api/posts/${postId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
