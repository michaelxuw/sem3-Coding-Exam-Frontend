import { BASE_API_URL } from "../../settings";


function handleHttpErrors(res: Response) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token: string) => {
    sessionStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    const value = sessionStorage.getItem("jwtToken");
    if (value == null) return undefined;
    return value;
  };

  const validateToken = async () => {
    const token = getToken();
    if (!token) return false;

    const options = makeOptions("HEAD", true);
    const res = await fetch(`${BASE_API_URL}/login/validate`, options);
    return res.ok;
  };

  const loggedIn = () => {
    return getToken() != null;
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
  };

  const login = (user: string, password: string) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(BASE_API_URL + "/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
      });
  };

  const fetchData = () => {
    const options = makeOptions("GET", true);
    return fetch(BASE_API_URL + "/info/user", options).then(handleHttpErrors);
  };

  function makeOptions<T>(method: string, addToken: boolean, body?: T) {
    method = method ? method : "GET";
    const opts: {
      method: string,
      headers: {
        "Content-type"?: string;
        Accept: string;
        "x-access-token"?: string;
      },
      body?: string;
    } = {
      method: method,
      headers: {
        ...(["PUT", "POST"].includes(method) && {
          "Content-type": "application/json",
        }),
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    validateToken,
  };
}

const facade = apiFacade();
export default facade;
