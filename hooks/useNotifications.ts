import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = (userId?: string) => {
  /**
   * used to fetch the user and store in the global store so that we dont want to fetch the user again and again
   */
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
