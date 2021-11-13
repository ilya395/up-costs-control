import axios from "axios";
import { localToken } from "./LocalToken.class";

class Request {
  get(data) {
    const { url } = data;
    return axios({
      method: "get",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localToken.getToken()}`,
      }
    })
    // .then(res => res.json())
    .catch(err => console.log(err))
  }
  post(data) {
    console.log("post")
    const { url, body } = data;
    return axios({
      method: "post",
      url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localToken.getToken()}`,
      },
      data: body
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
        'Authorization': `Bearer ${localToken.getToken()}`,
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
        'Authorization': `Bearer ${localToken.getToken()}`,
      },
      body
    })
    // .then(res => res.json())
    .catch(err => console.log(err))
  }
}

export const request = new Request();