import { createWebHistory, createRouter } from 'vue-router';
import Menu from "../components/MenuCompo"
import Home from "../components/HomeCompo"
import Cart from "../components/CartCompo"
import Login from "../components/LoginCompo"

const routes = [
    {path: '/',component: Menu},
    {path: '/home',component:Home},
    {path: '/cart',component:Cart},
    {path: '/login',component:Login},
    // {path: '*',component:Error}
    
]; //라우팅 패스, 컴포넌트 등 정의

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass:"vue-active-link"
});

export default router;