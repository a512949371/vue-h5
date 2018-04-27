<template>
	<div>
		<Top :title="title"></Top>
		<div class="info-box-myinfo">
			<div class="dec">手机号码:<span>{{$store.state.card.phone}}</span></div>
			<div class="dec">会员ID:<span>{{$store.state.card.userNo}}</span></div>
			<ul>
				<li>
					<div class="left">真实姓名:</div>
					<div class="right"><input type="text" v-model="add.realName"></div>
				</li>
				<li>
					<div class="left">所在地区:</div>
					<div class="right pr10" v-on:click="Openadd">
						{{add.province+add.city+add.county}}
						<img src="../assets/images/icon_jt@2x.png" class="fr"/>
					</div>
				</li>
			</ul>
			<div class="dec">详细地址:</div>
			<div class="dec">
				<textarea placeholder="请输入详细地址信息,如道路，门牌号，小区，楼栋号，单元室等" v-model="add.detailAddress">{{$store.state.card.detailAddress}}</textarea>
			</div>
		</div>
		<div class="btn" v-on:click="Trueinfo" ><img src="../assets/images/bnt_01@2x.png"/></div>
		<div class="add-fixed" v-show="addboxTF">
			<div class="shaw"></div>
			<div class="content">
				<div class="flex">
					<div class="select-box" >
					<!--<select  v-on:change="Provinces" v-on:click="Readproince" >
						<option >{{add.province}}</option>
					</select>-->
					 <div class="border-box">云南省</div>
					</div>
					<div class="select-box" >
						<!--<select  v-on:change="Areacity" v-on:click="Readareacity">
							<option>{{add.city}}</option>
						</select>-->
						<div class="border-box">昆明市</div>
					</div>
					<div class="select-box" >
						<select v-model="add.county">
							<option v-for="(key,value) in addData.citydata" >{{key}}</option>
						</select>
					</div>
				</div>
				<div class="btn-box flex">
					<div class="btn bg50ccff" v-on:click="Closeadd">取消</div>
					<div class="btn bgff4532" v-on:click="Trueadd">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Top from '@/components/top'
	import ZoneCode from '@/assets/js/ZoneCode'
	import getCookie from '@/store/getCookie.js'
	let Myinfo={
		components:{
			Top
		},
		data(){
			return{
				title:"我的资料",
				addboxTF:false,
				add:{
					phone:'',
					userNo:'',
					realName:'',
					province:'',
					city:'',
					county:'',
					detailAddress:''
				},
				addData:{
					prodata:'',
					areadata:'',
					citydata:''
				},
				code:''
			}
		},
		created(){
				var that=this;	
				if(this.$route.query.code){
					console.log("1")
					if(getCookie("token")){
						this.$store.dispatch("Getcard").then(()=>{
							that.add.userNo=this.$store.state.card.userNo;
							that.add.phone=this.$store.state.card.phone;
							that.add.realName=this.$store.state.card.realName;
							that.add.province=this.$store.state.card.province||'';
							that.add.city=this.$store.state.card.city||'';
							that.add.county=this.$store.state.card.county||'';
							that.add.detailAddress=this.$store.state.card.detailAddress||'';
						})												
					}else{
						console.log("4")
						that.code=that.$route.query.code
					    that.$store.dispatch("Codequest",that.code).then(()=>{
							this.$store.dispatch("Getcard").then(()=>{
								that.add.userNo=this.$store.state.card.userNo;
								that.add.phone=this.$store.state.card.phone;
								that.add.realName=this.$store.state.card.realName;
								that.add.province=this.$store.state.card.province||'';
								that.add.city=this.$store.state.card.city||'';
								that.add.county=this.$store.state.card.county||'';
								that.add.detailAddress=this.$store.state.card.detailAddress||'';
							})									    	
					    })
					}
				}else{
					console.log("2")
					if(getCookie("token")){
						this.$store.dispatch("Getcard").then(()=>{
							that.add.userNo=this.$store.state.card.userNo;
							that.add.phone=this.$store.state.card.phone;
							that.add.realName=this.$store.state.card.realName;
							that.add.province=this.$store.state.card.province||'';
							that.add.city=this.$store.state.card.city||'';
							that.add.county=this.$store.state.card.county||'';
							that.add.detailAddress=this.$store.state.card.detailAddress||'';
						})									
					}else{
						console.log("6")
						this.$store.dispatch("oneQuest")
					}
				}
			this.Readproince()
		},
		methods:{
			Readproince(e){
				this.addData.citydata=ZoneCode.Areas[530100];
			},
			Provinces(e){
				//this.add.areacity='';
				//this.add.city='';
				//this.addData.areadata='';
				//this.addData.citydata='';
				//this.addData.areadata=ZoneCode.Cities[e.target[e.target.selectedIndex].value];
				//this.add.provinces=e.target[e.target.selectedIndex].innerText;
			},
			Readareacity(e){
				//this.addData.citydata=ZoneCode.Areas[e.target[e.target.selectedIndex].value];
				//this.add.city=e.target[e.target.selectedIndex].innerText;
			},
			Areacity(e){
				//this.addData.citydata=ZoneCode.Areas[530100];
				//this.add.city=e.target[e.target.selectedIndex].innerText;
				console.log(this.addData.citydata)
			},
			City(e){
				this.add.county=e.target[e.target.selectedIndex].innerText;
			},
			Closeadd(){
				this.addboxTF=false
			},
			Openadd(){
				this.addboxTF=true
			},
			Trueadd(){
				if(this.add.county!=''){
					this.add.province="云南省";
					this.add.city="昆明市"
					this.addboxTF=false
				}else{
					alert("地址不能为空")
				}
			},
			Trueinfo(){
				if(this.add.provinces!=''&&this.add.areacity!=''&&this.add.city!=''&&this.add.detailAddress!=''&&this.add.realName!=''){
					this.$store.dispatch("Userinfoquest",this.add)
				}else{
					if(this.add.detailAddress==''){
						alert("详细地址不能为空")
					}
					if(this.add.realName==''){
						alert("真实姓名不能为空")
					}
				}
				console.log(this.add)
				
			}
		}
	}
	export default Myinfo
</script>

<style lang="scss">
	.info-box-myinfo{
		width: 100%;
		padding-left: 1.5rem;
		padding-top: 1.5rem;
		box-sizing: border-box;
		font-size: 1.6rem;
		color: #555;
		text-align: left;
		padding-bottom: 5rem;
		border-bottom: 0.5rem solid #e5e5e5;
		.dec{
			padding: 0.5rem 0;
			span{
				padding-left: 0.5rem;
			}
			textarea{
				border: none;
				padding: 0.3rem 0.5rem;
				box-sizing: border-box;
				width: 100%;
			}
			textarea:focus{
				outline: none;
				color: #333;
			}
		}
		li{
			display: flex;
			padding: 0.8rem 0;
			border-bottom: 1px solid #e5e5e5 ;
			.left{
				width: 8rem;
			}
			.right{
				flex: 1;
				input{
					border: none;
					color: #666;
					font-size: 1.6rem;
				}
				input:focus{
					outline: none;
				}
				img{
					width: 0.5rem;
					margin-top: 0.5rem;
					display: inline-block;
				}
			}
			.text-r{
				text-align: right;
				padding-right: 1rem;
			}
		}
	}
	.btn{
		width:60%;
		margin:2rem auto 0 auto;
	}
	.add-fixed{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.shaw{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,0.5);
		}
		.content{
			position: fixed;
			top: 40%;
			left: 5%;
			right: 5%;
			background-color: #FFF;
			padding: 2rem 1rem;
			box-sizing: border-box;
			.flex{
				display: flex;
			}
			.select-box{
				flex: 1;
				padding: 0 0.5rem;
				select{
					width: 100%;
					padding: 0.3rem 5px;
					font-size: 1.4rem;
					box-sizing: border-box;
				}
				.border-box{
					font-size: 1.4rem;
					padding: 0.3rem 10px ;
					border: 1px solid #999;
				}
			}
			.btn-box{
				margin-top: 1rem;
				.btn{
					border: 1px solid #e5e5e5;
					padding: 0.5rem 0;
					border-radius: 0.5rem;
					margin:1rem;
					margin-bottom: 0;
					color: #FFF;
					font-size: 1.6rem;
				}
				.bg50ccff{
					background-color: #50ccff;
				}
				.bgff4532{
					background-color: #ff4532;
				}
			}
		}
	}
</style>