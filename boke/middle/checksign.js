var response = require("../common/response");
module.exports = {
    checklogin:(req,res,next) => {
        if(!req.session.user){
            res.send(response.notlogin('尚未登录'));
        }else{
            next()        
            
        }
    },
    checkNotlogin:(req,res,next) => {
        if (req.session.user) {
            return res.redirect('back')// 返回之前的页面
        }else{
            next()
        }
    }
}