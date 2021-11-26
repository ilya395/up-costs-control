import axios from "axios";
import { localAuthData } from "./LocalAuthData.class";

class Request {
  get(data) {
    const { url } = data;
    return axios({
      method: "get",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localAuthData.getToken()}`,
      }
    })
    .catch(err => {
      console.log(err);
      localAuthData.removeAuthData();
    })
  }
  post(data) {
    const { url, body } = data;
    return axios({
      method: "post",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localAuthData.getToken()}`,
      },
      data: JSON.stringify(body)
    })
    .catch(err => {
      console.log(err);
      localAuthData.removeAuthData();
    })
  }
  delete(data) {
    const { url, body } = data;
    return axios({
      method: "delete",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localAuthData.getToken()}`,
      },
      data: JSON.stringify(body)
    })
    .catch(err => {
      console.log(err);
      localAuthData.removeAuthData();
    })
  }
  update(data) {
    const { url, body } = data;
    return axios({
      method: "update",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localAuthData.getToken()}`,
      },
      data: JSON.stringify(body)
    })
    .catch(err => {
      console.log(err);
      localAuthData.removeAuthData();
    })
  }
  put(data) {
    const { url, body } = data;
    return axios({
      method: "put",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localAuthData.getToken()}`,
      },
      data: JSON.stringify(body)
    })
    .catch(err => {
      console.log(err);
      localAuthData.removeAuthData();
    })
  }
}

export const request = new Request();