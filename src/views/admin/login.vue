<template>
	<div class="cantainer">
		<el-card class="login-wrap">
			<div class="logo"></div>
			<div class="title">Cystrix Blog博客管理系统</div>
			<div class="login-form">
				<el-input :prefix-icon="Search" class="input" v-model="username" type="email" placeholder="请输入邮箱"></el-input>
				<div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 30px;">
					<el-input :prefix-icon="More" class="input" v-model="verifyCode" style="width: 230px; margin-right: 16px;"></el-input>
					<el-button v-loading="getCodeLoading" type="primary" style="width: 114px; height: 40px;" @click="getVerifyCode">获取验证码</el-button>
				</div>
				<el-button  type="primary" style="height: 40px; width: 360px;">登录</el-button>
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { Search, More } from '@element-plus/icons-vue'
import {getVerificationCode} from '@/api/login.js'
import {ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
onMounted(()=>{
	
})

const username = ref('')
const verifyCode = ref('')
const getCodeLoading = ref(false)

const getVerifyCode = () => {
	getCodeLoading.value = true
	getVerificationCode({email: username.value})
	.then(resp=>{
		console.log(resp)
	})
	.finally(()=>{
		getCodeLoading.value = false
	})
}
</script>
<style lang="scss" scoped>
.cantainer {
	width: 100vw;
	height: 100vh;
	background-image: url('@/assets/img/index_bg.png');
	background-size: cover;
	background-position: center;
	.login-wrap {
		box-sizing: border-box;
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 540px;
		width: 430px;
		opacity: 0.80;
		.logo {
			height: 84px;
			width: 84px;
			background-image: url('@/assets/lsls.png');
			background-size: cover;
			background-position: center;
			margin-bottom: 10px;
		}
		.title {
			height: 80px;
			font-size: 30px;
			font-weight: 700;
			line-height: 80px;
		}

		.login-form {
			display: flex;
			width: 360px;

			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			.input {
				height: 40px;
				margin: 10px 0;
			}
		}
	}
}

:deep(.el-card__body) {
	display: flex;
	flex-direction: column;
	align-items: center;
	// padding: 0;
}
</style>