import API from "@/utils/api";

export const createEmployee = async (userContent) => {
    const res = await API.post("/api/auth/register", userContent);
    return res.data;w
};
