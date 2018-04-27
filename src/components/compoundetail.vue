<template>
	<div class="height pl10 pr10 bge5">
		<svg id="svg"></svg>
		<div class="compoun-box ">
	 	<div class="compoun flex-box" :style="note">
	 	<div class="left">
	 		<div class="flex-box">
	 			<div class="img"><img src="../assets/images/icon_mr@2x.png"></div>
	 			<div class="info">
	 				<h3>{{compoundetailone.name}}</h3>
	 				<div class="time">{{compoundetailone.startTime}} -{{compoundetailone.endTime}}</div>
	 				<div class="dec" v-if="compoundetailone.isZero==0">满{{compoundetailone.lowest}}即可使用</div>
	 				<div class="dec" v-else>适用所有类型</div>
	 			</div>
	 		</div>
	 	</div>
	 	<div class="right color-fff" v-if="compoundetailone.type==1">￥<span>{{compoundetailone.amount}}</span></div>
	 	<div class="right color-fff" v-else><span>{{compoundetailone.rebate}}折</span></div>
	 	</div>
	 </div>
	 <div class="acttit flex-box mt20">
	 	<div class="left">
	 		<div class="flex-box">
		 		<div class="blue-box"></div>
		 		<div class="tit">使用门店</div>	 			
	 		</div>

	 	</div>
	 	<div class="right"></div>
	 </div>
	 <div class="mt15">
	 	<h2 class="shopname">{{compoundetailone.storeName}}</h2>
	 </div>
	 <div class="shopadd mt10 flex-box">
	 	<div class="add-box">
	 		{{compoundetailone.storeAddress}}
	 	</div>
	 	<div class="phone-box">
	 		<a v-bind:href="'tel:'+compoundetailone.storePhone">
	 		<img src="../assets/images/icon_phone.png"/>
	 		</a>
	 	</div>
	 </div>
	 <div class="acttit flex-box mt20">
	 	<div class="left">
	 		<div class="flex-box">
		 		<div class="blue-box"></div>
		 		<div class="tit" v-on:click="Random">使用规则</div>	 			
	 		</div>

	 	</div>
	 	<div class="right"></div>
	 </div>
	 <div class="rule-box mt15">
	 {{compoundetailone.useRules}}
	 </div>
	</div>
</template>

<script>
	import getCookie from '@/store/getCookie.js'
	let Compoundetail={
		data(){
			return{
				compoundetailone:'',
				note: {
				  backgroundImage: "url(" + require("../assets/images/compoun2_bg.png") + ")",
				  backgroundRepeat: "no-repeat",
				  backgroundSize: "100%",
				  },
				  qcodedata:''
			}
		},
		created(){
			var that =this;
			var id=this.$route.query.id;
			if(getCookie("token")){
					this.$store.dispatch("Getcompoundetailquest",id).then((res)=>{
						if(res.data.ok==true){
							that.compoundetailone=this.$store.state.compoundetaildata
							console.log("Compoundetail")
							console.log(that.compoundetailone)
						}
					})				
				}else{
					console.log("4")
					this.$router.push("/login")
				}		
		},
		watch:{
			Compoundetail(newvalue,oldvalue){
				return newvalue
			}
		},
		computed:{
			Compoundetail(){
				this.compoundetailone=this.$store.state.compoundetaildata
			}
		},
		mounted(){
			this.qcodedata=this.Random()+this.$route.query.id+','+this.Random()+this.$route.query.uid+','+this.Random()+this.$route.query.sid;
			JsBarcode("#svg", this.qcodedata,{
				displayValue: false
			});
		},
		methods:{
			Random(){
				var num="";
				for(var i=0;i<4;i++){
				 num +=parseInt(Math.random()*9)
				}
				return num
			}
		}
	}
	export default Compoundetail
</script>

<style lang="scss">
	#svg{
		width: 100%;
		margin-top:1rem;
		height: 8rem;
		background-color: #FFF;
	}
</style>