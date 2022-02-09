
import api from "@/utils/api";
import axios from "axios";

export default function useCancellableSWR(key, swrOptions) {
  const source = axios.CancelToken.source();

  return api.get(url, )
  // return [
  //   useSWR(
  //     key,
  //     (url) =>
  //       axios.get(url, { cancelToken: source.token }).then((res) => res.data),
  //     {
  //       ...swrOptions,
  //     }
  //   ),
  //   source,
  // ];
}
