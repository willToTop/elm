var express = require("express");
var router = express.Router();
var response = require("../common/response");
var requireSql = require('../common/mysql');
//注册
router.post("/signup", async (req, res, next) => {
  const params = req.body;
  const account = params.account;
  const password = params.password;
  const repassword = params.repassword;
  const gender = params.gender;
  const userImg = params.userImg;
  const Introduction = params.Introduction;

  //注册校检
  if (!account) {
    res.send(response.error("请输入账号"));
  } else if (!password) {
    res.send(response.error("请输入密码"));
  } else if (password !== repassword) {
    res.send("2次输入密码不一致");
  } else {
    //查询是否存在此账号
    let searchsql = `SELECT account FROM users WHERE account='${account}'`;
    let searchdata = await requireSql.requireData(searchsql);
    if(searchdata&&searchdata.length){
      res.send(response.error("该用户已经存在"));
    }else{
      let savesql = `INSERT INTO users(_id,account,password) VALUES (0,?,?)`;
      let values = [account,password];
      let savedata = await requireSql.saveData(savesql,values);
      if(savedata){
        res.send(response.success("注册成功"));
      }else{
        res.send(response.error("注册失败"));
      }
    }
  }
});

//登录
router.post("/signin", async (req, res, next) => {
  
  const params = req.body;
  
  const account = params.account;
  const password = params.password;
  const searchsql = `SELECT account,password FROM users WHERE account='${account}'` 
  const searchData = await requireSql.requireData(searchsql);

  if(!searchData || !searchData.length){
    res.send(response.error("该用户不存在"));
  }else{
    if(searchData[0].password !== password){
      res.send(response.error("密码错误")); 
    }else{
      req.session.user = req.body.account; 
      req.session.id = req.sessionID;
      console.log(req.sessionID);
      res.send(response.success("登录成功"));
    }
  }
});

//登出
router.post("/signout", (req, res, next) => {
  //删除session后返回
  req.session.user = null;
  req.session.id = null;
  res.send(response.success("退出成功"));
});

module.exports = router;
