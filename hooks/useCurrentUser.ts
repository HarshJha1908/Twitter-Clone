import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
    /**
     * used to fetch the user and store in the global store so that we dont want to fetch the user again and again
     */
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
