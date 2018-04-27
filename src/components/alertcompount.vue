<template>
	<div>
		<div class="index-fixed">
		 <div class="shaw"></div>
		 <div class="content">
		  <div class="img pt10"><img src="../assets/images/alert_success.png"/></div>
		  <div class="price-box pt10">￥{{data.orderPrice}}</div>
		  <div class="desc">充值成功，您获得价值{{data.amount}}元的商家联盟券，选券后即可使用</div>
		  <div class="flex-box">
		  	<div class="btn pt15 pb15 font-20" v-on:click="Closealert">在等等</div>
		  	<div class="btn pt15 pb15" v-on:click="Gochoose"><img src="../assets/images/compoun_btn.png"/></div>
		  </div>
		 </div>
		</div>
	</div>
</template>

<script>
	let Alertcompount={
		data(){
			return{
				
			}
		},
		props:['data'],
		methods:{
			Closealert(){
				this.$emit("alertcompoun")
			},
			Gochoose(){
				this.$router.push("/selectcompoun?id="+this.data.id)
			}
		}
	}
	export default Alertcompount
</script>

<style>
</style>