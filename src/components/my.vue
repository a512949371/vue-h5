<template>
	<div class="bge5">
		<div class="my-box">
		 <div class="user flex-box">
		 	<div>
		 	<div class="user-name">
		 		{{nickName}}
		 	</div>
		 	<div class="user-phone">{{userphone}}</div>
		 	</div>
		 	<div class="img"><img :src="headImg"/></div>
		 </div>
		</div>
		<div class="pro-box">
			<ul>
				<li><a href="/rechargelist">
					<div class="left-icon"><img src="../assets/images/icon_pay.png"/></div>
					<div class="center-content">充值记录</div>
					<div class="right-icon"><img src="../assets/images/icon_jt@2x.png"/></div>
				   </a>
				</li>
				<li><a href="/consumptionlist">
					<div class="left-icon"><img src="../assets/images/icon_xiaofei.png"/></div>
					<div class="center-content">消费记录</div>
					<div class="right-icon"><img src="../assets/images/icon_jt@2x.png"/></div>
					</a>
				</li>
			</ul>
		</div>
		<div class="pro-box mt7">
			<ul>
				<li><a href="/myinfo">
					<div class="left-icon"><img src="../assets/images/icon_my.png"/></div>
					<div class="center-content">我的资料</div>
					<div class="right-icon"><img src="../assets/images/icon_jt@2x.png"/></div>
					</a>
				</li>
				<li><a href="javascript:void(0)">
					<div class="left-icon"><img src="../assets/images/icon_phone2.png"/></div>
					<div class="center-content">联系我们</div>
					<div class="right-icon"><img src="../assets/images/icon_jt@2x.png"/></div>
					</a>
				</li>
			</ul>
		</div>
		<Bottombar v-bind:bar="barstatus"></Bottombar>
	</div>
</template>

<script>
	import Bottombar from '@/components/bottombar'
	import getCookie from '../store/getCookie.js'
	let My={
		data(){
			return{
				barstatus:"2",
				headImg:getCookie('userpic'),
				nickName:decodeURI(getCookie('username')),
				userphone:getCookie('userphone')
			}
		},
		components:{
			Bottombar
		},
		creted(){
			this.headImg=getCookie('userpic');
			this.nickName=decodeURI(getCookie('username'));
			this.userphone=getCookie('userphone')
		}
	}
	export default My
</script>

<style>
</style>