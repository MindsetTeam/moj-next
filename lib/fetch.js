export const fetcher = (...args) =>
  fetch(...args).then(async (res) => {
    const payload = await res.json();
    if (!res.ok) {
      return Promise.reject(payload.msg || new Error("Something went wrong"));
    }
    return payload;
  });
