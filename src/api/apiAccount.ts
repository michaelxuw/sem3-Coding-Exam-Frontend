import NewAccount from "@/types/entities/newAccount";;
import { BASE_API_URL } from "../../settings";
import { handleHttpErrors, makeOptions, setToken } from "./util.api";


function getAccountAPI() {

  const createAccount = async ({ ...props }: Omit<NewAccount, "confirmPassword">) => {
    const options = makeOptions("POST", true, { ...props });
    const res = await fetch(`${BASE_API_URL}/user`, options);
    const data = await handleHttpErrors(res);
    return data;
  };

  const login = async (email: string, password: string) => {
    try {
      const options = makeOptions("POST", true, { email, password });
      const res = await fetch(BASE_API_URL + "/login", options);
      const data = await handleHttpErrors(res);
      setToken(data.token);
      return data;
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };

  return {
    createAccount,
    login
  };
}

const accountAPI = getAccountAPI();
export default accountAPI;
