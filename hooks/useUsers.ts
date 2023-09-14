import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useUsers = () => {
  /**
   * used to fetch the user and store in the global store so that we dont want to fetch the user again and again
   */
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
