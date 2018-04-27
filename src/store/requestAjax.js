 import axios from 'axios';
 import vuex from '../store/store'
 import delCookie from './delCookie.js'
 
 	axios.interceptors.request.use(config=> {
	  return config;
	}, err=> {
	  console.log("请求超时")
	  return Promise.resolve(err);
	})
	axios.interceptors.response.use(res=> {
		if(res.data.ok==true){
			 return res;
		}else{
			console.log("5"+res.data.msg);
			return res;
		}
	}, err=> {
		console.log(err)
	  if (err.response.status == 504||err.response.status == 404) {
	    console.log("服务器请求错误")
	  } else if (err.response.status == 401 || err.response.status == "00100007") {
	  	delCookie("token");
	  	delCookie("userpic");
	  	delCookie("username");
	  	var Url =location.href.replace(window.location.search,"");
	  	document.cookie="reurl="+window.location.href
	  	location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdd84051741201752&redirect_uri='+Url+'&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
	  }else if(err.response.status == 500) {
	    console.log("网络繁忙，请稍后重试")
	  }else{
	  	console.log("未知错误")
	  }
	  return Promise.resolve(err);
	})
	
 class requestAjax {
 	request(Data,callback){
 		const p = axios({
			method:Data.requestType,
			url:Data.requestUrl,
			headers:{
				"token":Data.requesttoken,
				'Content-Type': 'application/json'
				},
			data:Data.requestdata||null
		 }).then((res)=>{
		  		callback(res)
		  		return res
		  	}).catch((res)=>{
		  		console.log("1"+res)
		  		return res
		});
		return p
 	}
 }
export default requestAjax 