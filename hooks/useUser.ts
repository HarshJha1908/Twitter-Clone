import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useUser = (userId: string) => {
  /**
   * used to fetch the user and store in the global store so that we dont want to fetch the user again and again
   */
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
