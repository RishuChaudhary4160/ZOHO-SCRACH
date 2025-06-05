import axios from "axios";
import { onError } from "../src/helper";

export const getApi = async (endPoint, reqBody) => {
  try {
    const url = `${endPoint}`;
    const headers = {
      "x-tenant-code": "aqua",
      "Content-Type": "application/json",
      "x-role-key": `${localStorage.getItem("role-key")}`,
    };
    let res = await axios.get(url, reqBody, { headers });
    return res;
  } catch (error) {
    onError(error);
  }
};
export const putApi = async (endPoint, reqBody) => {
  try {
    const url = `${endPoint}`;
    const headers = {
      "x-tenant-code": "aqua",
      "Content-Type": "application/json",
      // "x-role-key": `${localStorage.getItem("role-key")}`,
    };
    let res = await axios.put(url, reqBody, { headers });
    return res;
  } catch (error) {
    onError(error);
  }
};

export const postApi = async (endPoint, reqBody) => {
  try {
    const url = `${endPoint}`;
    const headers = {
      "x-tenant-code": "aqua",
      "Content-Type": "application/json",
      // "x-role-key": `${localStorage.getItem("role-key")}`,
    };
    let res = await axios.post(url, reqBody, { headers });
    return res;
  } catch (error) {
    onError(error);
  }
};

export const deleteApi = async (endPoint, reqBody) => {
  try {
    const url = `${endPoint}`;
    const headers = {
      "x-tenant-code": "aqua",
      "Content-Type": "application/json",
      // "x-role-key": `${localStorage.getItem("role-key")}`,
    };
    let res = await axios.put(url, reqBody, { headers });
    return res;
  } catch (error) {
    onError(error);
  }
};
