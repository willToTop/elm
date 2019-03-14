var express = require('express');
var router = express.Router();
var response = require('../common/response');
var check = require('../middle/checksign');
var requireSql = require('../common/mysql');
/* GET users listing. */
router.post('/list', async(req, res, next)=>{
    let searchsql = `SELECT * FROM articles`;
    let data = await requireSql.requireData(searchsql);
    res.send(response.success(data));
});
router.post('/mylist',check.checklogin, async(req, res, next)=>{
    let searchsql = `SELECT * FROM articles WHERE user='${req.session.user}'`;
    let searchData = await requireSql.requireData(searchsql);
    res.send(response.success(searchData));
});
router.post('/detail', async(req, res, next)=>{
    const id = req.body.id;
    let searcharticlesql = `SELECT * FROM articles WHERE id='${id}'`;
    let searchsql = `SELECT * FROM comments WHERE article='${id}'`;
    let searcharticleData = await requireSql.requireData(searcharticlesql);
    let searchData = await requireSql.requireData(searchsql);
    searcharticleData[0].comments = searchData;
    res.send(response.success(searcharticleData[0]));
});
router.post('/add',check.checklogin, async(req, res, next)=>{
    let {title,content} = req.body;
    let savesql = `INSERT INTO articles(user,title,content) VALUES(?,?,?)`;
    let values = [req.session.user,title,content];
    let saveData = await requireSql.saveData(savesql,values);
    if(saveData){
        res.send(response.success('ok'));
    }
});
router.post('/remove', async(req, res, next)=>{
    let deletesql = `DELETE FROM articles WHERE id=${req.body.id}`;
    let deleteData = await requireSql.requireData(deletesql);
    if(deleteData){
        res.send(response.success('删除成功'));
    }
});
module.exports = router;
