<template>
	<div class="alert-box">
		 <div class="alert">{{message}}</div>
	</div>
</template>

<script>
	let Alert={
		props:['message']
	}
	export default Alert
</script>

<style lang="scss">
 .alert-box{
 	position: fixed;
 	top: 0;
 	left: 0;
 	right: 0;
 	bottom: 0;
 	z-index: 102;
 	transition: all 0.5s ease-in;
 	.alert{
	 	position: fixed;
	 	padding: 1rem 0;
	 	background-color: #fff;
	 	color: #333;
	 	padding: 30px;
	 	box-sizing: border-box;
 	}
 }
</style>