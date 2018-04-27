const delCookie=function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr=document.cookie.match(reg)
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
	if(arr!=null)
	document.cookie= name + "="+arr+";expires="+exp.toGMTString();

}
export default delCookie
