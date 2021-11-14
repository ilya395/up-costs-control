import axios from "axios";
import { localAuthData } from "./LocalAuthData.class";

class Request {
  get(data) {
    console.log("get")
    const { url } = data;
    return axios({
      method: "get",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localAuthData.getToken()}`,
      }
    })
    // .then(res => res.json())
    .catch(err => console.log(err))
  }
  post(data) {
    console.log("post", data)
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
    // .then(res => res.json())
    .catch(err => console.log(err))
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
      body
    })
    // .then(res => res.json())
    .catch(err => console.log(err))
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
      body
    })
    // .then(res => res.json())
    .catch(err => console.log(err))
  }
}

export const request = new Request();