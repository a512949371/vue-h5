<template>
	<div class="pt30 pl10 pr10">
		<div class="tip-box" >可选{{sqldata.sqlprice||0}}元代金券，{{sqldata.sqlzhekou||0}}张折扣券</div>
		<div class="compoun-box  ">
		<div id="minirefresh" class="minirefresh-wrap">
    		<div class="minirefresh-scroll">  
    	<ul class="pt15">
	 	<li class="selectcompoun flex-box" :style="note" v-for="(item,index) in simulationdata.list">
	 	<div class="left">
	 		<div class="flex-box">
	 			<div class="img"><img src="../assets/images/icon_mr@2x.png"></div>
	 			<div class="info">
	 				<h3>{{item.name}}</h3>
	 				<div class="num-box flex-box pt15">
	 					<div class="reduce" v-on:click="Reduce(index)">
	 						<img src="../assets/images/icon_reduce.png"/>
	 					</div>
	 					<div class="num"><input type="number" v-model="item.count" v-on:change="Num(index)"></div>
	 					<div class="add" v-on:click="Add(index)">
	 						<img src="../assets/images/icon_add.png"/>
	 					</div>
	 					<div class="seating"></div>
	 				</div>
	 			</div>
	 		</div>
	 	</div>
	 	<div class="right" v-if="item.type==1">￥<span class="font-24">{{item.amount}}</span></div>
	 	<div class="right" v-else><span class="font-24">{{item.rebate}}</span>折</div>
	 	</li>
	 	</ul>
	 	</div>
	 </div>
	 </div>
	  <div class="selectcompoun-bottom">
	  	<div class="info-box flex-box">
	  		<div class="left-img">
	  			<img src="../assets/images/icon-comp.png" />
	  		</div>
	  		<div class="center-info">
	  			<div class="price">￥{{showdata.totalPrice}}</div>
	  			<div class="desc">已选代金券{{showdata.daijin}}张,已选折扣券{{showdata.zhekou}}张</div>
	  		</div>
	  		<div class="right-btn" v-on:click="Truesure">确定</div>
	  	</div>
	  </div>
	</div>
</template>

<script>
	import getCookie from '@/store/getCookie.js'
	import MiniRefreshTools from 'minirefresh';
	import 'minirefresh/dist/debug/minirefresh.css'	
	let Selectcompoun={
		data(){
			return{
				nodata:false,
				note: {
				  backgroundImage: "url(" + require("../assets/images/compoun-bg.png") + ")",
				  backgroundRepeat: "no-repeat",
				  backgroundSize: "100%",
				  },
				showdata:{
					totalPrice:0,
					zhekou:0,
					daijin:0
				},
				sqldata:{
					sqlprice:'',
					sqlzhekou:''
				},
			    pagedata:{
		          pageNum:1,
		          pagesize:10,
		          id:''
			    },	
				updata:{
				 customerChapterId:'',
				 storeChapterList:[]
				},
				simulationdata:[],
				dataerr:false
			}
		},
		created(){
			var that =this;
			this.pagedata.id=this.$route.query.id;
			if(this.$route.query.code){
				console.log("1")
				if(getCookie("token")){
					this.$store.dispatch("Getcompountypequest",this.pagedata).then((res)=>{
						if(res.data.ok==true){
								that.simulationdata=this.$store.state.compountypedata.pageInfo;
								that.sqldata.sqlprice=this.$store.state.compountypedata.upamount;
								that.sqldata.sqlzhekou=this.$store.state.compountypedata.number;
								console.log(this.$store.state.compountypedata.number)
							}
					})
				}else{
					console.log("4")
					that.code=that.$route.query.code
				    that.$store.dispatch("Codequest",that.code).then(()=>{
						this.$store.dispatch("Getcompountypequest",this.pagedata).then((res)=>{
							if(res.data.ok==true){
								that.simulationdata=this.$store.state.compountypedata.pageInfo;
								that.sqldata.sqlprice=this.$store.state.compountypedata.upamount;
								that.sqldata.sqlzhekou=this.$store.state.compountypedata.number;
								console.log(this.$store.state.compountypedata.number)
							}
						})
				    })
				}
			}else{
				console.log("2")
				if(getCookie("token")){
					this.$store.dispatch("Getcompountypequest",this.pagedata).then((res)=>{
						if(res.data.ok==true){
								that.simulationdata=this.$store.state.compountypedata.pageInfo;
								that.sqldata.sqlprice=this.$store.state.compountypedata.upamount;
								that.sqldata.sqlzhekou=this.$store.state.compountypedata.number;
								console.log(this.$store.state.compountypedata.number)
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
			toComput:function(){
                var that=this;
                var simulatdata=this.simulationdata.list;
                that.showdata.totalPrice=0;
                that.showdata.daijin=0;
                that.showdata.zhekou=0;
               for(var i=0;i<simulatdata.length;i++){
               		if(simulatdata[i].type==1){
                		that.showdata.totalPrice+=parseInt(simulatdata[i].amount*simulatdata[i].count);
                		that.showdata.daijin+=Number(simulatdata[i].count)
                	}else{
                		that.showdata.zhekou+=Number(simulatdata[i].count)
                	}
                }
                return that.showdata;
            },
			Reduce(index){
				 var that=this;
				 var simulatdata=this.simulationdata.list;
				    if(simulatdata[index].count>0){
				    	simulatdata[index].count--;
				    	this.toComput()
				    }else{
				    	that.$layer.alert("代金券张数不能小于0")
				    	simulatdata[index].count=0
				    }	
			},
			Add(index){
				var simulatdata=this.simulationdata.list;
				var that=this;
                    simulatdata[index].count++;
                    this.toComput()
			},
			Truesure(){
				var that=this;
				var simulatdata=this.simulationdata.list;
				this.updata.customerChapterId=this.$route.query.id;
				this.updata.storeChapterList=[];
				if(Number(this.showdata.totalPrice)<=Number(this.sqldata.sqlprice)&&Number(this.showdata.zhekou)<=Number(this.sqldata.sqlzhekou)){
					for(var i=0;i<this.simulationdata.list.length;i++){
						if(simulatdata[i].count>0){
							this.updata.storeChapterList.push(simulatdata[i])
						}
					}
					this.$store.dispatch("Truecompountypequest",this.updata).then((res)=>{
						if(res.data.ok==true){
							that.$layer.alert("选券成功")
							setTimeout(function(){
								location.reload()
							},2000)
						}
					})
					console.log(this.updata)
				}else{
					that.$layer.alert("代价券金额不能大于可选金额")
				}
			},
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
            	this.$store.dispatch("Getcompountypequest",this.pagedata).then((res)=>{
					if(res.data.ok==true){
							that.simulationdata.list=that.simulationdata.list.concat(this.$store.state.compountypedata.pageInfo.list);
							that.miniRefresh.endUpLoading(this.$store.state.compountypedata.pageInfo.list.length != 10 ? true : false);      
					}
				}).catch((res)=>{
					that.dataerr=true
                	this.miniRefresh.endUpLoading(true)
					console.log(that.dataerr)
				})
            }

		   }
		}
	export default Selectcompoun
</script>

<style lang="scss">

</style>