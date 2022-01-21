import { fetcher } from "@/lib/fetch";
import API from "@/utils/api";
import useSWR from "swr";

export const createEmployee = async (userContent) => {
  const res = await API.post("/api/auth/register", userContent);
  return res.data;
};

export const fetchSingleEmployee = async (id, cookie) => {
    // return API.get("/api/users/"+id);
  return fetcher(process.env.baseURL + "/api/users/" + id, {
    method: "GET",
    credentials: 'include',
    headers:{
        'Cookies': cookie
    }
  });
};
