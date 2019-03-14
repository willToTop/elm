
import Login from "../view/login";
import Main from "../view/main";
import MyArticle from "../view/main/article/myarticle";
import Detail from "../view/main/article/detail";
export const detailRoute = '/main/article/'
let router = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/main",
    component: Main,
    children:[
      {
        path:"/main/myArticle",
        component: MyArticle
      },
      {
        path:"/main/article/:id",
        component: Detail    
      }
    ]
  }
];
export default router;
