<template>
  <div>
  	<img src="../assets/images/bg_03@2x.png">
   <div class="register-box pt30">
    <div class="input-box">
     <div class="left"><img src="../assets/images/icon_zh@2x.png"> </div>
     <div class="right"><input type="text" v-model="phone" value=""></div> 
    </div>
    <div class="input-box mt15">
     <div class="left"><img src="../assets/images/icon_yzm@2x.png"> </div>
     <div class="right"><input type="text" v-model="sms" ></div>
     <div class="phone" v-on:click="Sms">{{smsText}}</div>
    </div>
    <div class="mt30">
    	<div class="img" v-on:click="Registerlogin"><img src="../assets/images/bnt_02@2x.png"></div>
    	{{code}}
    </div>
   </div>
  </div>
</template>

<script>
	import getCookie from '@/store/getCookie.js'
	let Register={
	  data () {
	    return {
	      smsText:'获取验证码',
	      phone:'',
	      smsStatus:true,
        time:60,
        sms:'',
        code:''
	    }
	  },
	  created(){
	  	this.code=this.$route.query.code
	  	var that =this;
			if(this.$route.query.code){
				console.log("1")
				if(getCookie("token")){
				}else{
					console.log("4")
					that.code=that.$route.query.code
				  that.$store.dispatch("Codequest",that.code)
				}
			}else{
				if(getCookie("token")){	
				}else{
					console.log("6")
					this.$store.dispatch("oneQuest")
				}
			}
	  },
	  methods:{
	  	//发送验证码
	  	Sms(){
	  		var that=this;
		    if(this.smsStatus){
		      if (!this.phoneTF()) {
		      	alert("手机号不正确，请重新输入")
		      } else {
		      	this.$store.dispatch("Smsquest",this.phone)
		      	this.Stime()
		      }
		     }
	  	},
	  	//注册
	  	Registerlogin(){
	  		if(this.sms !=''){
	  			var data={
	  				code:this.sms,
	  				userName:this.phone
	  			}
	  		if(getCookie("token")){	
	  			this.$store.dispatch("regquest",data)
				}else{
					this.$store.dispatch("oneQuest")
				}	
	  		}else{
	  			alert("验证码不能为空")
	  		}
	  	},
	  	// 手机号判断
		  phoneTF(){
		    if ((/^1[34578]\d{9}$/.test(this.phone))) { 
		      return true
		    }else{
		      return false
		    }
		  },
		  // 计时器
		  Stime(){
		    var that =this;
		    var ctime=setInterval(function(){
		            if (that.time>0){
		            that.time--
		            that.smsText= that.time + "s",
		            that.smsStatus=false
		        }
		        else{
		            clearInterval(ctime);
		            that.time= 60,
		            that.smsText= "获取验证码",
		            that.smsStatus=true
		        }
		    },1000)
		  }
	  }
	}
export default Register
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
