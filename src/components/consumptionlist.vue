<template>
	<div>
	 <!--<Top :title="title"></Top>-->
	 <div class="list-box-con">
	 	<div id="minirefresh" class="minirefresh-wrap">
    		<div class="minirefresh-scroll">  
	 	<ul>
	 		<li v-for="item in simulationdata.list">
	 			<div class="left-img"><img src="../assets/images/icon_shop.png"/> </div>
	 			<div class="center-content">
	 			 <div class="name">洗到家洗衣卡</div>
	 			 <div class="dec">订单号：{{item.orderCode}}</div>
	 			</div>
	 			<div class="right">
	 				<div class="price">{{item.orderPrice}}</div>
	 				<div class="time">{{item.createTime}}</div>
	 			</div>
	 		</li>
	 	</ul>
	 	</div>
	 </div>
	 </div>
	</div>
</template>

<script>
	import Top from '@/components/top'
	import getCookie from '@/store/getCookie.js'
	import MiniRefreshTools from 'minirefresh';
	import 'minirefresh/dist/debug/minirefresh.css'	
	let Consumptionlist={
		data(){
			return{
				title:"消费记录",
				pagedata:{
		          pageNum:1,
		          pagesize:10,
			    },
			    dataerr:false,
			    simulationdata:[],
			}
		},
		created(){
			var that =this;
			if(this.$route.query.code){
				console.log("1")
				if(getCookie("token")){
					this.$store.dispatch("Consumptionquest",this.pagedata).then((res)=>{
						if(res.data.ok==true){
							that.simulationdata=this.$store.state.consumptiondata;
						}
					})
				}else{
					console.log("4")
					that.code=that.$route.query.code
				    that.$store.dispatch("Codequest",that.code).then(()=>{
						this.$store.dispatch("Consumptionquest",this.pagedata).then((res)=>{
							if(res.data.ok==true){
								that.simulationdata=this.$store.state.consumptiondata;
							}
						})
				    })
				}
			}else{
				console.log("2")
				if(getCookie("token")){
					this.$store.dispatch("Consumptionquest",this.pagedata).then((res)=>{
						if(res.data.ok==true){
							that.simulationdata=this.$store.state.consumptiondata;
						}
					})		
				}else{
					console.log("6")
					this.$store.dispatch("oneQuest")
				}
			}
			
		},
		mounted: function() {
            var self = this;
            self.miniRefresh = new MiniRefresh({
                container: '#minirefresh',
                down: {
                    callback: self.downCallback
                },
                up: {
                    isAuto: true,
                    callback: self.upCallback
                }
            });
        },
		methods:{
			downCallback: function() {
                var that = this;
                setTimeout(function() {
                    that.simulationdata.list = that.simulationdata.list.splice(0,10);
                    that.miniRefresh.endDownLoading(true);
                },1000);
            },
            upCallback: function() {
                var that = this;
                console.log("dataerr",this.dataerr)
                if(this.dataerr){
                	console.log("服务器问题")
                	this.miniRefresh.endDownLoading(true);
                	this.miniRefresh.endUpLoading(true)
                }else{
	                setTimeout(function() {
	                    that.ajaxdata()
	                },1000);                	
                }

            },
            ajaxdata:function(){
            	var that=this;   	
            	this.pagedata.pageNum+=1;
            	this.$store.dispatch("Consumptionquest",this.pagedata).then((res)=>{
            		console.log(that.pagedata.pageNum)
					if(res.data.ok==true){
							that.simulationdata.list=that.simulationdata.list.concat(this.$store.state.consumptiondata.list);
							that.miniRefresh.endUpLoading(this.$store.state.consumptiondata.list.length != 10 ? true : false);      
					}
				}).catch((res)=>{
					that.dataerr=true
                	this.miniRefresh.endUpLoading(true)
					console.log(that.dataerr)
				})
            }			
		}
	}
	export default Consumptionlist
</script>

<style lang="scss">
	.list-box-con{
		box-sizing: border-box;
		li{
		 display: flex;
		 padding: 0.5rem;
		 border-bottom: 1px solid #e5e5e5;
		 align-items: center;
		 .left-img{
		 	width:4rem;
		 	margin-right: 2rem;
		 	margin-left: 2rem;
		 	box-sizing: border-box;
		 	border-radius: 50%;
		 	overflow: hidden;
		 	background-color: #e5e5e5;
		 }
		 .center-content{
		 	flex: 1;
		 	text-align:left;
		 	.name{
		 		font-size: 1.6rem;
		 		color: #333;
		 	}
		 	.dec{
		 		font-size: 1.2rem;
		 		padding-top: 0.5rem;
		 		color: #666;
		 	}
		 }
		 .right{
		 	flex: 1;
		 	text-align: right;
		 	.price{
		 		color: rgb(199,54,33);
		 		font-size: 1.6rem;
		 	}
		 	.time{
		 		font-size: 1.2rem;
		 		padding-top: 0.5rem;
		 		color: #666;
		 	}
		 }
		}
		
	}
</style>