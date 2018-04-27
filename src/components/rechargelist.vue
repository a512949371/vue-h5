<template>
	<div>
		<!--<Top :title="title"></Top>-->
		<div class="list-box-rech">
		<div id="minirefresh" class="minirefresh-wrap">
    		<div class="minirefresh-scroll">  
			<ul>
				<li v-for="item in $store.state.rechargedata.list">
					<h2>{{item.orderPrice}}</h2>
					<h3 v-if="item.balance>0">赠送金额{{item.balance}}元</h3>
					<h4 v-if="item.selectStatus==3">未选券<a :href="'/selectcompoun?id='+item.customerId" class="fr">去选券</a></h4>
					<h4 v-if="item.selectStatus==2">已选券</h4>
					<div class="dec">
						<div class="left">充值方式</div>
						<div class="right" v-if="item.orderType ==1">线下门店充值</div>
						<div class="right" v-if="item.orderType ==2">线上充值</div>
					</div>
					<div class="dec">
						<div class="left">充值时间</div>
						<div class="right">{{item.createTime}}</div>
					</div>
					<div class="dec">
						<div class="left">订单号</div>
						<div class="right">{{item.orderCode}}</div>
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
	let Rechargelist={
		data(){
			return{
				title:"充值记录",
				pagedata:{
		          pageNum:1,
		          pagesize:10,
			    },
			    rechargelistdata:[],
			    dataerr:false
			}
		},
		created(){
			var that =this;
			if(this.$route.query.code){
				console.log("1")
				if(getCookie("token")){
					this.$store.dispatch("Rechargequest",this.pagedata).then((res)=>{
						console.log(res)
						if(res.data.ok==true){
							that.rechargelistdata.list=this.$store.state.rechargedata.list
						}
					})
				}else{
					console.log("4")
					that.code=that.$route.query.code
				    that.$store.dispatch("Codequest",that.code).then((res)=>{
						if(res.data.ok==true){
							location.reload()
						}
				    })
				}
			}else{
				console.log("2")
				if(getCookie("token")){
					this.$store.dispatch("Rechargequest",this.pagedata).then((res)=>{
						if(res.data.ok==true){
							that.rechargelistdata.list=this.$store.state.rechargedata.list
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
                    that.rechargelistdata.list = that.rechargelistdata.list.splice(0,10);
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
            	this.$store.dispatch("Rechargequest",this.pagedata).then((res)=>{
            		console.log(that.pagedata.pageNum)
					if(res.data.ok==true){
							that.rechargelistdata.list=that.rechargelistdata.list.concat(this.$store.state.rechargedata.list);
							that.miniRefresh.endUpLoading(this.$store.state.rechargedata.list.length != 10 ? true : false);      
					}
				}).catch((res)=>{
					that.dataerr=true
                	this.miniRefresh.endUpLoading(true)
					console.log(that.dataerr)
				})
            }		
		}
	}
	export default Rechargelist
</script>

<style lang="scss">
	.list-box-rech{
		width: 100%;
		background-color: #f3f3f3;
		li{
			padding: 2rem 1rem;
			background-color: #fff;
			margin-bottom: 1rem;
			border-bottom:2px solid #f5f5f5 ;
			h2{
				font-size: 2.4rem;
				text-align: center;
				color: #555;
			}
			h3{
				font-size: 1.4rem;
				color: #ff6050;
				font-weight: 100;
			}
			h4{
				font-size: 1.4rem;
				line-height: 2.6rem;
				color: #666;
				font-weight: 100;
				text-align: center;
				position: relative;
				a{
					position: absolute;
					top: 0;
					right: 0;
					text-decoration: underline;
				}
			}
			.dec{
				display: flex;
				font-size: 1.4rem;
				color: #555;
				padding: 0.5rem 0;
				.left{
					flex: 1;
					text-align: left;
				}
				.right{
					flex: 1;
					text-align: right;
				}
			}
		}
	}
</style>