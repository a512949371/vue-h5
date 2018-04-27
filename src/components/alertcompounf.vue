<template>
	<div>
		<div class="index-fixed">
		 <div class="shaw"></div>
		 <div class="content">
		  <div class="img pt30"><img src="../assets/images/alert_bg.png"/></div>
		  <div class="desc pt15">很遗憾！您暂时没有选券资格</div>
		  <div class="desc">请到线下门店进行充值获取选券资格</div>
		  <div class="btn pt15 pb15" v-on:click="Closealert"><img src="../assets/images/alert_btn.png"/></div>
		 </div>
		</div>
	</div>
</template>

<script>
	let Alertcompounf={
		data(){
			return{
				
			}
		},
		methods:{
			Closealert(){
				this.$emit("alertcompoun")
			}
		}
	}
	export default Alertcompounf
</script>

<style>
</style>