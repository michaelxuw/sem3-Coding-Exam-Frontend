import { BASE_API_URL } from "../../settings";
import { handleHttpErrors, makeOptions, setToken } from "./util.api";
import newShow from "@/types/entities/newShow";


function getShowAPI() {

  const base_endpoint = `${BASE_API_URL}/show`;

  const createShow = async ({...props}: newShow) => {
    try {
      const options = makeOptions("POST", true, {...props});
      const res = await fetch(`${base_endpoint}/new`, options);
      const data = await handleHttpErrors(res);
      return data;
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }

  const fetchAllShows = async () => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${base_endpoint}/get`, options);
      const data = await handleHttpErrors(res);
      return data as newShow[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };
  const fetchAllShowsForGuestWithID = async (id: number) => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${base_endpoint}/get/${id}`, options);
      const data = await handleHttpErrors(res);
      return data as newShow[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };
  const fetchShowWithID = async (id: number) => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${base_endpoint}/${id}`, options);
      const data = await handleHttpErrors(res);
      return data as newShow[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };

  const updateFestival = async (id: number, {...props}: newShow) => {
    try {
      const options = makeOptions("PUT", true, {...props});
      const res = await fetch(`${base_endpoint}/${id}`, options);
      const data = await handleHttpErrors(res);
      return data;
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }

  const deleteShow = async (id: number) => {
    try {
      const options = makeOptions("DELETE", true);
      const res = await fetch(`${base_endpoint}/${id}`, options);
      await handleHttpErrors(res);
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }



  return {
    createShow,
    fetchAllShows,
    fetchAllShowsForGuestWithID,
    fetchShowWithID,
    updateFestival,
    deleteShow
  };
}

const showAPI = getShowAPI();
export default showAPI;
