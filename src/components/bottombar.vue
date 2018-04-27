<template>
	<div>
		<div class="fixed">
		 <div class="cardbox" @click="barclick(1)">
		  <div v-if="barTF==1">
		  <img src="../assets/images/icon_kb_04.png" />
		  <div class="dec active">卡包</div>
		  </div>
		  <div v-else>
		  	<img src="../assets/images/icon_kb_03.png" />
		    <div class="dec">卡包</div>
		  </div>
		 </div>
		 <div class="userbox"@click="barclick(2)" >
		  <div v-if="barTF==2">
		  <img src="../assets/images/icon_zx_04.png" />
		  <div class="dec active">个人中心</div>
		  </div>
		  <div v-else>
		  <img src="../assets/images/icon_zx_03.png" />
		  <div class="dec">个人中心</div>
		  </div>
		 </div>
		</div>
	</div>
</template>

<script>
	let Bottombar={
		data(){
			return{
				barTF:''
			}
		},
		props:['bar'],
		created(){
			this.barTF=this.bar
		},
		methods:{
			barclick(index){
				if(index==1){
					this.barTF=1
					this.$router.push("/index")
				}else{
					this.barTF=2
					this.$router.push("/my")
				}
			}
		}
	}
	export default Bottombar
</script>

<style lang="scss" >
  .fixed{
  	position: fixed;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	border:1px solid #e5e5e5;
  	padding:0.5rem 0;
  	display:flex;
  	align-items: center;
  	background-color: #fff;
  	img{
  		width: 10%;
  		display: inline-block;
  	}
  	.active{
  		color: rgb(55,150,254);
  	}
  	.cardbox{
  		flex: 1;
  		text-align: center;
  		font-size: 1.4rem;
  		color: #666;
  	}
  	.userbox{
  		flex: 1;
  		text-align: center;
  		font-size: 1.4rem;
  		color: #666;
  		box-sizing: border-box;
  		border-left: 1px solid #e5e5e5;
  	}
  }
</style>