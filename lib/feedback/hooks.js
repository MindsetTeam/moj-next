import useSWR from "swr";

export const useFeedbacks = () => {
  const { data, error, ...props } = useSWR("/api/feedbacks", {
    refreshInterval: 3000,
  });

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    ...props,
  };
};
