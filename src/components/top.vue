<template>
	 <div class="top">
	   <div class="img" @click="back"><img src="../assets/images/icon_left@2x.png" /></div>
	   <div class="tit">{{title}}</div>
	 </div>
</template>

<script>
	let Top={
		data(){
			return{
				
			}
		},
		props:['title'],
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
	export default Top
</script>

<style lang="scss">
 .top{
 	width: 100%;
 	height: 3.6rem;
 	border-bottom: 1px solid #e5e5e5;
 	background-color: #f3f3f3;
 	position: relative;
 	.img{
 		position: absolute;
 		top: 0.8rem;
 		left:1rem;
 		width: 1rem;
 	}
 	.tit{
 		text-align: center;
 		color: #222;
 		font-size: 1.6rem;
 		line-height: 3.6rem;
 	}
 }
</style>