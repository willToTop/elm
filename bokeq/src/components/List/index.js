import React from 'react'
import {detailRoute} from "../../common/router"
import $http from "../../common/fetch";
import { acticleUrl } from "../../common/url";
import './index.css'
const List = ({list=[],history,auth,initData}) => {
  var click = (id)=>{
    $http.postData(acticleUrl.remove,{id}).then(data => {
      initData()
    });
  }
  return (
    <div className='article'>
    {
      list.map(item => (
        <div key={item.id}>
          <h3 onClick={()=>{history.push(`${detailRoute}${item.id}`)}}>
            <span>{item.title}</span>
            <span>作者:{item.user}</span>
            {
              auth?
              <a onClick={(e)=>{e.stopPropagation();click(item.id)}}>删除</a>:null
            }
          </h3>
        </div>
      ))
    }
    </div>
  )
}
  

export default List