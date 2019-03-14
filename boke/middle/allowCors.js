var response = require("../common/response");

module.exports = {
    cors:(req,res,next) => {
        //设置允许跨域的域名，*代表允许任意域名跨域(设置了跨域带cookie;跨域不允许设置为*)
        res.header("Access-Control-Allow-Origin","http://localhost:3003");
        //允许的header类型
        res.header("Access-Control-Allow-Headers","content-type");
        //跨域允许的请求方式 
        res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
        res.header("Access-Control-Allow-Credentials","true");
        
        if (req.method.toLowerCase() == 'options')
            res.send(response.success('允许连接'));  //让options尝试请求快速结束
        else
            next();
    },
}