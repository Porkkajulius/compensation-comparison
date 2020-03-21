const GET: string = "GET";
const POST: string = "POST";
const OPTIONS = {
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
};

const fetchFactory = () => (method: string) => async (url: string, body?: any) => {
  return await fetch(url, {
    ...OPTIONS,
    method,
    headers: {
      ...OPTIONS.headers
    },
    body: !!body ? JSON.stringify(body) : null
  });
};

const useHttpService = () => {
  const fetch = fetchFactory();
  const fetchGet = fetch(GET);
  const fetchPost = fetch(POST);
  return {
    fetchGet,
    fetchPost
  };
};

const HttpUtil = {
  useHttpService
};

export default HttpUtil;
