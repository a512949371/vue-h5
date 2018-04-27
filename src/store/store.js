import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import layer from 'vue-layer';
import router from '../router/router.js'
import requestAjax from './requestAjax.js'
import getCookie from './getCookie.js'
import delCookie from './delCookie.js'
import setCookie from './setCookie.js'

Vue.use(Vuex)
//let http="https://xdj.txw18.com/xdjCore/xdjAdminCore"
//let https="https://xdj.txw18.com/xdjCore/xdjMerchantsAdmin"
//let http="http://xweb.txw18.com/xdjCore/xdjAdminCore"
//let https="http://xweb.txw18.com/xdjCore/xdjMerchantsAdmin"
let http="http://192.168.1.115:9104/xdjCore/xdjAdminCore"
let https="http://192.168.1.115:9104/xdjCore/xdjMerchantsAdmin"
//let appID="wxdd84051741201752"
let appID="wx0bc9d26421ae8f65"
let RequestAjax = new requestAjax();
const state = {
	gettoken:'',
	card:'',
	usercompoundata:'',
	searchusercompoundata:'',
	compountypedata:'',
	compoundetaildata:'',
	rechargedata:'',
	consumptiondata:'',
	userinfo:'',
	wxsharedata:{
		jsApiList:[]
	},
	wxshareLogo:'./assets/images/icon_shop.png'
	
}
const mutations={
	Settoken(state,data){
		state.gettoken=data;
		console.log(state.gettoken)
	},
	setcard(state,data){
		state.card=data;
		console.log(data)
	},
	setusercompoun(state,data){
		state.usercompoundata=data
	},
	setsearchusercompoun(state,data){
		state.searchusercompoundata=data
	},
	setcompountype(state,data){
		state.compountypedata=data
	},
	setrecharge(state,data){
		state.rechargedata=data
	},
	setconsumption(state,data){
		state.consumptiondata=data
	},
	setuserinfo(state,data){
		state.userinfo=data
	},
	setwxshare(state,data){
		state.wxsharedata=data;
		state.wxsharedata.jsApiList=['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ']
		console.log(state.wxsharedata)
	},
	setcompoundetail(state,data){
		state.compoundetaildata=data
	}
}
const actions={
	//微信分享
	Getwxshare:function({commit},wxdata){
   	 var data={
   	 	requestType:"post",
	  	requestUrl:http+"/app/authSign",
	  	requestdata:wxdata,
	  	requesttoken:getCookie('token')
   	 },
   	 callback=function(res){
   	 	console.log(res)
   	 	commit("setwxshare",res.data.data)
   	 }
   	 return RequestAjax.request(data,callback)
	},
	//token请求
	Codequest:function({commit,dispatch},codedata){
		console.log("code")
		alert(codedata)
   		let p =axios({
   		method:"post",
   		url:http+"/app/authLogin",
   		data:{
   			code:codedata,
   			type:"1"
   		}
	   	}).then((res)=>{
	   		console.log(res)
	   		commit("Settoken",res.data.msg);
	   		setCookie("token",res.data.msg,1)
	   		if(res.data.data=="0"){
	   			router.push("/register")
	   			
	   		}else{
   				router.push("/index")
   				console.log("msg1")
	   			return res
	   		}
	   	}).catch((res)=>{
	   		console.log("3"+res)
	   		return res
	   	})
	   	return p
	},
	//code请求
   oneQuest:function({commit,dispatch},){
   	 var Url =location.href.replace(window.location.search,"");
   	 location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdd84051741201752&redirect_uri='+Url+'&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
   },
   //获取卡包信息
   Getcard:function(context){
   	 var data={
   	 	requestType:"get",
	  	requestUrl:http+"/app/customer/customerInfo",
	  	requestdata:'',
	  	requesttoken:getCookie('token')
   	 },
   	 callback=function(res){
   	 	console.log("Getcard",res)
   	 	if(res.data.data==null){
   	 		router.push("/register")
   	 	}else{
	   	 	context.commit("setcard",res.data.data)
	   	 	setCookie("userpic",res.data.data.headImg,1);
	   	 	setCookie("username",encodeURI(res.data.data.nickName),1)	
	   	 	setCookie("userphone",res.data.data.phone,1)	 
   	 	}

   	 	
   	 }
   	 return RequestAjax.request(data,callback)
   },
   //验证码
   Smsquest:function(context,phone){
	  	var data = {
	  		requestType:"post",
	  		requestUrl:http+"/app/sendSms",
	  		requestdata:{
	  			code:'',
	  			userName:phone
	  		},
	  		requesttoken:getCookie('token')
	  	},
	  	callback=function(res){
	  		console.log("233333")
	  		console.log(res)
	  	}
	  	return RequestAjax.request(data,callback)
	},
	//注册或者登陆
	regquest:function({commit,dispatch},userinfo){
		console.log("223")
		var data={
			requestType:"post",
			requestUrl:http+"/app/register",
			requestdata:userinfo,
			requesttoken:getCookie('token')
		},
		callback=function(res){
			if(res.data.code=="00100000"||res.data.code=="100000"){
				router.push('/index')
			}else if(res.data.code=="00100001"||res.data.code=="100001"){
				alert("系统繁忙，请稍后再试")
			}else if(res.data.code=="401"){
				delCookie("token");
			  	delCookie("userpic");
			  	delCookie("username");
				dispatch("oneQuest")
			}else if(res.data.code=="00100014"||res.data.code=="100014"){
				router.push('/myinfo')
			}else if(res.data.code=="00100007"||res.data.code=="100007"){
				delCookie("token");
			  	delCookie("userpic");
			  	delCookie("username");
				dispatch("oneQuest")
			}else{
				alert(res.data.msg)
			}
			
		}
		return RequestAjax.request(data,callback)
	},
	//查询用户是否有选券资格
	Searchusercompounquest:function({commit}){
		var data={
			requestType:"get",
			requestUrl:https+"/app/customerChapter/selectCanSelection",
			requestdata:'',
			requesttoken:getCookie('token')
		},
		callback=function(res){
			console.log(res)
			commit("setsearchusercompoun",res.data.data)
		}
		return RequestAjax.request(data,callback)
	},		
	//获取用户已有优惠券
	Getusercompounquest:function({commit}){
		var data={
			requestType:"get",
			requestUrl:https+"/app/customerChapter/selectCustomChapter",
			requestdata:'',
			requesttoken:getCookie('token')
		},
		callback=function(res){
			console.log("usercompoun")
			console.log(res)
			commit("setusercompoun",res.data.data)
		}
		return RequestAjax.request(data,callback)
	},	
	//获取优惠券类型
	Getcompountypequest:function({commit},pagedata){
		var data={
			requestType:"get",
			requestUrl:https+"/app/chapterDetail/selectAllStoreAChapter/"+pagedata.id+"?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize,
			requestdata:'',
			requesttoken:getCookie('token')
		},
		callback=function(res){
			commit("setcompountype",res.data.data)
		}
		return RequestAjax.request(data,callback)
	},
	//确认用户选券
	Truecompountypequest:function({commit},userdata){
		console.log(userdata)
		var data={
			requestType:"post",
			requestUrl:https+"/app/collection/confirmChapter",
			requestdata:userdata,
			requesttoken:getCookie('token')
		},
		callback=function(res){
			console.log(res)
		}
		return RequestAjax.request(data,callback)
	},
	//优惠券详情
	Getcompoundetailquest:function({commit},compounid){
		var data={
			requestType:"get",
			requestUrl:https+"/app/chapterDetail/selectChapterDetail/"+compounid,
			requestdata:'',
			requesttoken:getCookie('token')
		},
		callback=function(res){
			console.log(res)
			commit("setcompoundetail",res.data.data)
		}
		return RequestAjax.request(data,callback)
	},
	//获取充值记录
	Rechargequest:function({commit},pagedata){
		var data={
			requestType:"get",
			requestUrl:http+"/app/customer/chargeInfo?pageNo="+pagedata.pageNum+"&pageSize="+pagedata.pagesize,
			requestdata:'',
			requesttoken:getCookie('token')
		},
		callback=function(res){
			console.log(res)
			commit("setrecharge",res.data.data)
		}
		return RequestAjax.request(data,callback)
	},
	//获取消费记录
	Consumptionquest:function({commit},pagedata){
		var data={
			requestType:"get",
			requestUrl:http+"/app/customer/consumeInfo?pageNo="+pagedata.pageNum+'&pageSize='+pagedata.pagesize,
			requestdata:'',
			requesttoken:getCookie('token')
		},
		callback=function(res){
			console.log(res)
			commit("setconsumption",res.data.data)
		}
		return RequestAjax.request(data,callback)
	},
	//设置|获取用户信息
	Userinfoquest:function({commit},userinfo){
		var data={
			requestType:"post",
			requestUrl:http+"/app/customer/update ",
			requestdata:userinfo,
			requesttoken:getCookie('token')
		},
		callback=function(res){
			if(res.data.code=="00100000"){
				router.push("/index")
			}else if(res.data.code=="00100001"){
				alert("系统繁忙，请稍后再试")
			}else if(res.data.code=="401"){
				dispatch("oneQuest")
			}else{
				alert(res.data.msg)
			}
			console.log(res)
		}
		return RequestAjax.request(data,callback)
	}
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules:{
    }
})

export default store