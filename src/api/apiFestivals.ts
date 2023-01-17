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
      const temp = data as newFestival[];
      console.log(temp)
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
    try {
      const options = makeOptions("POST", true, {...props});
      const res = await fetch(`${base_endpoint}/new`, options);
      console.log(res)
      const data = await handleHttpErrors(res);
      return data;
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }

  const updateFestival = async (id: number, {...props}: newFestival) => {
    console.log(props)
    try {
      const options = makeOptions("PUT", true, {...props});
      console.log("before fetch")
      const res = await fetch(`${base_endpoint}/${id}`, options);
      console.log("after fetch")
      console.log(res)
      const data = await handleHttpErrors(res);
      return data;
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }

  const deleteFestival = async (id: number) => {
    console.log("deleting: "+id)
    try {
      const options = makeOptions("DELETE", true);
      const res = await fetch(`${base_endpoint}/${id}`, options);
      console.log("after res in deleteFestival")
      await handleHttpErrors(res);
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }



  return {
    fetchFestivals,
    fetchRelevantFestivals,
    createFestival,
    updateFestival,
    deleteFestival,
  };
}

const festivalAPI = getFestivalAPI();
export default festivalAPI;
