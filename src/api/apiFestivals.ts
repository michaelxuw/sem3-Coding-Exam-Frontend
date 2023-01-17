import { BASE_API_URL } from "../../settings";
import { handleHttpErrors, makeOptions, setToken } from "./util.api";
import newFestival from "@/types/entities/newFestival";


function getFestivalAPI() {

  const base_endpoint = `${BASE_API_URL}/festival`;


  const fetchFestivals = async () => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${base_endpoint}/get`, options);
      const data = await handleHttpErrors(res);
      return data as newFestival[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };
  const fetchRelevantFestivals = async () => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${base_endpoint}/getRelevant`, options);
      const data = await handleHttpErrors(res);
      return data as newFestival[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };

  const createFestival = async ({...props}: newFestival) => {
    const options = makeOptions("POST", true, {...props});
    const res = await fetch(`${base_endpoint}/new`, options);
    const data = await handleHttpErrors(res);
    return data;
  }




  return {
    fetchFestivals,
    fetchRelevantFestivals,
    createFestival,
  };
}

const festivalAPI = getFestivalAPI();
export default festivalAPI;
