<template>
	<div class="height pl10 pr10">
	 <svg id="svg"></svg>
	 <div class="index-box">
	  <img src="../assets/images/card-bg.png" />
	  <div class="desc">余额(元)</div>
	  <div class="balance">{{$store.state.card.amountSum}}</div>
	  <div class="cardnum">ID:<span>{{$store.state.card.userNo}}</span></div>
	  <div class="tel">TEL:<span>{{$store.state.card.phone}}</span></div>
	 </div>
	 <div class="money-box">
	 	<div class="left">
	 		<div class="dec">充值余额(元)</div>
	 		<div class="price pt10">{{$store.state.card.balanceSum}}</div>
	 	</div>
	 	<div class="right">
	 		<div class="dec">赠送余额(元)</div>
	 		<div class="price pt10">{{$store.state.card.presentBalance}}</div>
	 	</div>
	 </div>
	 <div class="acttit flex-box">
	 	<div class="left">
	 		<div class="flex-box">
		 		<div class="blue-box"></div>
		 		<div class="tit">已有优惠</div>	 			
	 		</div>

	 	</div>
	 	<div class="right" v-on:click="Choosecompoun">选券></div>
	 </div>
	 <div class="compoun-box ">
	 	<a v-bind:href="'/compoundetail?id='+item.id+'&uid='+item.customerId+'&sid='+item.selectId" v-for="(item,index) in usercompoundata">
	 	<div class="compoun flex-box" :style="note">
	 	<div class="left">
	 		<div class="flex-box">
	 			<div class="img"><img src="../assets/images/icon_mr@2x.png"></div>
	 			<div class="info">
	 				<h3>{{item.name}}</h3>
	 				<div class="time">{{item.startTime}} -{{item.endTime}}</div>
	 				<div class="dec" v-if="item.isZero==0">满{{item.lowest}}即可使用</div>
	 				<div class="dec" v-else>适用所有类型</div>
	 			</div>
	 		</div>
	 	</div>
	 	<div class="right" v-if="item.type==1">￥<span>{{item.amount}}</span></div>
	 	<div class="right" v-else><span>{{item.rebate}}折</span></div>
	 	</div>
	 	</a>
	 </div>
	 <div class="img" style="padding-bottom: 5rem;">
	 	<!--<img src="../assets/images/index1.png">
	 	<img src="../assets/images/index2.png">
	 	<img src="../assets/images/index3.png">-->
	 </div>
	 <Bottombar :bar="barstatus"></Bottombar>
	 <Alertcompount v-show="alertcompounT" v-on:alertcompoun="Compounone" :data="alertcompoundata" ></Alertcompount>
	 <Alertcompounf v-show="alertcompounF" v-on:alertcompoun="Compountwo"></Alertcompounf>
	</div>
</template>
<script>
	import Bottombar from '@/components/bottombar'
	import Alertcompount from '@/components/alertcompount'
	import Alertcompounf from '@/components/alertcompounf'
	import getCookie from '@/store/getCookie.js'
	import wx from 'weixin-js-sdk'
	import JsBarcode  from 'jsbarcode'
	let Index={
		components:{
			Bottombar,
			Alertcompount,
			Alertcompounf
		},
		data(){
			return{
				barstatus:"1",
				sharetimeline:'',
				shareappmessage:'',
				shareqq:'',
				urldata:{
					urlPath:''
				},
				code:'',
				usercompoundata:[],
				  note: {
				  backgroundImage: "url(" + require("../assets/images/compoun-bg.png") + ")",
				  backgroundRepeat: "no-repeat",
				  backgroundSize: "100%",
				  },
				alertcompoundata:[],
				alertcompounT:false,
				alertcompounF:false,
				qcodedata:''

			}
		},
		created(){
			var that =this;			
			if(this.$route.query.code){
				console.log("1")
				if(getCookie("token")){
					console.log("3")
					this.urldata.urlPath =location.href
					this.$store.dispatch("Getcard").then(()=>{
		//				that.$layer.alert("已经得到了数据111111")
						//获取微信分享配置
			            this.$store.dispatch('Getwxshare',this.urldata).then((res)=>{
			            	wx.config(this.$store.state.wxsharedata);
			            	that.Wxshare()
			            });
					});
					this.$store.dispatch("Searchusercompounquest").then((res)=>{
						if(res.data.ok==true){
							that.alertcompounT=true;
							that.alertcompoundata=this.$store.state.searchusercompoundata
						}
					})
					this.$store.dispatch("Getusercompounquest").then((res)=>{
						if(res.data.ok==true){
						 that.usercompoundata=this.$store.state.usercompoundata.list
						}
					})
				}else{
					console.log("4")
					that.code=that.$route.query.code
				    that.$store.dispatch("Codequest",that.code).then((res)=>{
				    	console.log(res)
				    	if(res.data.ok==true){
				    		this.urldata.urlPath =location.href
							this.$store.dispatch("Getcard").then(()=>{
				//				that.$layer.alert("已经得到了数据111111")
								//获取微信分享配置
					            this.$store.dispatch('Getwxshare',this.urldata).then((res)=>{
					            	wx.config(this.$store.state.wxsharedata);
					            	that.Wxshare()
					            });
							});
							this.$store.dispatch("Searchusercompounquest").then((res)=>{
								if(res.data.ok==true){
									that.alertcompounT=true;
									that.alertcompoundata=this.$store.state.searchusercompoundata
								}
							})
							this.$store.dispatch("Getusercompounquest").then((res)=>{
								if(res.data.ok==true){
								 that.usercompoundata=this.$store.state.usercompoundata.list
								}
							})
				    	}else{
				    		location.reload()
				    	}
				    })
				}
			}else{
				console.log("2")
				if(getCookie("token")){
					console.log("5")
					this.urldata.urlPath =location.href
					this.$store.dispatch("Getcard").then((res)=>{
		//				that.$layer.alert("已经得到了数据111111")
						//获取微信分享配置
			            this.$store.dispatch('Getwxshare',this.urldata).then((res)=>{
			            	wx.config(this.$store.state.wxsharedata);
			            	that.Wxshare()
			            });
					});	
					this.$store.dispatch("Searchusercompounquest").then((res)=>{
						if(res.data.ok==true){
							that.alertcompounT=true;
							that.alertcompoundata=this.$store.state.searchusercompoundata
						}
					})
					this.$store.dispatch("Getusercompounquest").then((res)=>{
						if(res.data.ok==true){
						 that.usercompoundata=this.$store.state.usercompoundata.list
						}
					})
				}else{
					console.log("6")
					this.$store.dispatch("oneQuest")
				}
			}

//			let urlarray=window.location.href.split('#')
//          let url = urlarray[0].split('?')[0]
            
		},
		mounted(){
			this.qcodedata=this.$store.state.card.phone+'-'+this.$store.state.card.userNo+'-12345'
			JsBarcode("#svg",this.qcodedata ,{
				displayValue: false
			});
		},
		methods:{
	        Wxshare(){
	        	var that=this;
	        	var shareurl=location.href
	        	this.sharetimeline={
 						title:"【洗到家】洗衣，洗鞋，洗到家，关注并注册领取大礼包！", // 分享标题
                        desc:"洗衣，洗鞋，洗到家，关注并注册领取大礼包！", // 分享描述
                        link:shareurl, // 分享链接
                        imgUrl:"http://ozpc9ej7p.bkt.clouddn.com/xdj_logo_06.png", // 分享图标
                        type: "", // 分享类型,music、video或link，不填默认为link
                        success: function() {
                            alert('分享成功')
                        },
                        cancel: function() {
                            alert('分享取消')
                        }	        		
	        	};
	        	this.shareappmessage={
	        	        title:"【洗到家】洗衣，洗鞋，洗到家，关注并注册领取大礼包！", // 分享标题
                        desc:"洗衣，洗鞋，洗到家，关注并注册领取大礼包！", // 分享描述
                        link:shareurl, // 分享链接
                        imgUrl:"http://ozpc9ej7p.bkt.clouddn.com/xdj_logo_06.png", // 分享图标
                        type: "", // 分享类型,music、video或link，不填默认为link
                        success: function() {
                            alert('分享成功')
                        },
                        cancel: function() {
                            alert('分享取消')
                        }	 	
	        	};
	        	this.shareqq={
	        		    title:"【洗到家】洗衣，洗鞋，洗到家，关注并注册领取大礼包！", // 分享标题
                        desc:"洗衣，洗鞋，洗到家，关注并注册领取大礼包！", // 分享描述
                        link:shareurl, // 分享链接
                        imgUrl:"http://ozpc9ej7p.bkt.clouddn.com/xdj_logo_06.png", // 分享图标
                        type: "", // 分享类型,music、video或link，不填默认为link
                        success: function() {
                            alert('分享成功')
                        },
                        cancel: function() {
                            alert('分享取消')
                        }	 
	        	}
	        	wx.ready(function(){
	        		wx.onMenuShareTimeline(that.sharetimeline);
	        		wx.onMenuShareAppMessage(that.shareappmessage);
	        		wx.onMenuShareQQ(that.shareqq)
	        	})
	        },
	        Compounone(){
	        	this.alertcompounT=false
	        },
	        Compountwo(){
	        	this.alertcompounF=false
	        },
	        Choosecompoun(){
	        	if(this.alertcompoundata.id){
	        		this.$router.push("/selectcompoun?id="+this.alertcompoundata.id)
	        	}else{
	        		this.alertcompounF=true
	        	}
	        }
		}
	}
	export default Index
</script>

<style lang="scss">
	#svg{
		width: 100%;
		margin-top:1rem;
		height: 8rem;
		background-color: #FFF;
	}
</style>