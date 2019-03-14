import { Modal } from "antd";
// import { createBrowserHistory } from 'history';
import store from '../store'
import {fetch_begin_action,fetch_end_action} from '../store/action'
// let history = createBrowserHistory();
class $http {
  fetchData(url, params = {}, header = {}, type = "POST") {
    return fetch(url, {
      body: JSON.stringify(params), // must match 'Content-Type' header
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "content-type": "application/json",
        ...header
      },
      method: type, // *GET, POST, PUT, DELETE, etc.
      credentials: "include",//携带cookie
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // *client, no-referrer
    })
      .then(response => response.json())
      .catch(err => ({ code: 1, msg: "请求出错" }));
  }
  //处理返回数据
  static resolveData(data) {
    if (data.code === 1) {
      $http.fetchErr(data.msg);
    }else if(data.code ===0){   
      window.location.href = '/';     
    }else if (data.code === 2) {
      return data.body;
    }
  }
  //加遮罩
  requireData(url, params = {}, header = {},type){

    store.dispatch(fetch_begin_action());
    return this.fetchData(url, params, header,type).then(data =>{
        store.dispatch(fetch_end_action());
        return $http.resolveData(data);
      }
    );
  }
  getData(url, params = {}, header = {}) {
    return this.requireData(url,params,header,'GET');
  }
  postData(url, params = {}, header = {}) {

    return this.requireData(url,params,header,'POST');
  }
  //多个请求加一个遮罩
  moreRequireData(){
    //这里应该实现同时多个异步请求,但是只有一个遮罩层
  }
  static fetchErr(msg) {
    Modal.error({
      title: "出错了",
      content: msg
    });
    throw "请求错误";
  }
}
export default new $http();
