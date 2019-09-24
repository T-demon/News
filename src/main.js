/*
 * @Describe: 
 * @Author: Tang
 * @Date: 2019-09-22 00:25:42
 * @LastEditTime: 2019-09-24 10:07:27
 */
import Vue from "vue";

// 路由：1.导入路由构造函数
import Vant from 'vant';
import { Toast } from 'vant';
import axios from "axios"
import VueRouter from "vue-router";

// 导入组件
import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { STATUS_CODES } from "http";

// 在.vue文件中要使用router-link或者router-view.需要注册下插件
Vue.use(VueRouter);
Vue.use(Vant);

Vue.prototype.$axios = axios; // this.$axios
// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://127.0.0.1:3000";

// 路由：2.创建路由配置
const routes = [
    { path: "/login", component: Login},
    { path: "/register", component: Register}
]

// 路由：3.创建对象
const router = new VueRouter({
    routes
});
axios.interceptors.response.use(res=>{
    const{message,statusCode} =res.data
    if(statusCode ===401){
        Toast.fail(message)
    }
    return res
})


new Vue({
    el: "#app",

    // 路由：4.挂载到根实例
    router,

    // 指定一个组件渲染根实例，这个组件可以成为最底层的组件
    render(createElement){
        // render函数使用固定的写法，只有App是可变；
        return createElement(App);
    }
})