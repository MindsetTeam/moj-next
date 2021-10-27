import useSWR from "swr";

export const useAnnouncements = ({ id } = {}) => {
  const { data, error, ...props } = useSWR(
    id ? `/api/announcements/${id}` : "/api/announcements",
    { refreshInterval: 10000 }
  );

  return {
    data: data?.data ,
    isLoading: !error && !data,
    isError: error,
    ...props,
  };
};
