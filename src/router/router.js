import Vue from 'vue'
import Router from 'vue-router'
import vuex from '../store/store'


Vue.use(Router)

import Register from '@/components/register'
import Index from '@/components/index'
import My from '@/components/my'
import Consumptionlist from '@/components/consumptionlist'
import Rechargelist from '@/components/rechargelist'
import Myinfo from '@/components/myinfo'
import Code from '@/components/code'
import Compoundetail from '@/components/compoundetail'
import Selectcompoun from '@/components/selectcompoun'

 const routes=[
    {
    	path:"/",
	    name: 'code',
	    component:Index
    },
    {
      path: '/index',
      name: '首页',
      component: Index
    },
    {
    	path:'/register',
    	name:"注册页面",
    	component:Register
    },
    {
    	path:'/my',
    	name:"个人中心",
    	component:My
    },
    {
    	path:'/consumptionlist',
    	name:"消费记录",
    	component:Consumptionlist
    },
    {
    	path:'/rechargelist',
    	name:"充值记录",
    	component:Rechargelist
    },
    {
    	path:'/myinfo',
    	name:"我的资料",
    	component:Myinfo
    },
    {
    	path:'/code',
    	name:"code",
    	component:Code
    },
    {
    	path:'/compoundetail',
    	name:"优惠券详情",
    	component:Compoundetail
    },
    {
    	path:'/selectcompoun',
    	name:"优惠券选择",
    	component:Selectcompoun    	
    }
  ]

const router = new Router({
    mode: 'history',    //路由的模式
    routes
    });

export default router