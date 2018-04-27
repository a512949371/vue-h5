<template>
	<div class="code">
		页面加载中。。。。
	</div>
</template>

<script>
	let Code={
		data(){
			return{
			  code:''	
			}	
		},
		created(){
			var that =this
			if(this.$route.query.code){
				that.code=that.$route.query.code
				that.$store.dispatch("Codequest",that.code)
			}else{
				this.$store.dispatch("oneQuest")
			}
		}
	}
	export default Code
</script>

<style lang="scss">
   .code{
   	margin-top: 4rem;
   	font-size: 1.6rem;
   }
</style>