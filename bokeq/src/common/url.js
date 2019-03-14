let root = "http://localhost:3004/";
if (process.env.NODE_ENV === "production") {
  root = "/";
}
console.log(process.env.NODE_ENV);
export const loginUrl = {
  signin: `${root}login/signin`,
  signup: `${root}login/signup`,
  signout: `${root}login/signout`
};

export const acticleUrl = {
  list:`${root}article/list`,
  mylist:`${root}article/mylist`,
  detail:`${root}article/detail`,
  add:`${root}article/add`,
  remove:`${root}article/remove`,
}
