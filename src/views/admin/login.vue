<template>
	<div class="cantainer">
		<el-card class="login-wrap">
			<div class="logo"></div>
			<div class="title">Cystrix Blog博客管理系统</div>
			<div class="login-form">
				<el-form ref="form" :model="loginForm" :rules="loginRules" status-icon>
					<el-form-item prop="email">
						<el-input :prefix-icon="Search" class="input" v-model.trim="loginForm.email" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-form-item prop="verificationCode">
						<el-input :prefix-icon="More" class="input" v-model.trim="loginForm.verificationCode" style="width: 230px; margin-right: 16px;"></el-input>
						<el-button :loading="getCodeLoading" type="primary" style="width: 114px; height: 38px;" @click="getVerifyCode">获取验证码</el-button>
					</el-form-item>
				</el-form>
				<el-button :loading="submitLoading"  @click="doLogin(form)" type="primary" style="height: 40px; width: 360px; margin-top: 20px;">登录</el-button>
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { Search, More } from '@element-plus/icons-vue'
import { getVerificationCode, loginWithEmailCode } from '@/api/login.js'
import {ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import  { ElMessage } from 'element-plus'
onMounted(()=>{
	
})

const loginForm = ref({
	email: '',
	verificationCode: ''
})
const getCodeLoading = ref(false)
const submitLoading = ref(false)

const form = ref()
const store = useStore()
const router = useRouter()

const getVerifyCode = () => {
	loginForm.value.verificationCode = ''
	if(!loginForm.value.email) {
		ElMessage({
			type: 'error',
			message: '请输入邮箱'
		})
		return
	}

	getCodeLoading.value = true
	getVerificationCode({email: loginForm.value.email})
	.then(resp=>{
		if(resp.code === 200) {
			ElMessage({
				type: 'success',
				message: '发送成功'
			})
		}
	})
	.finally(()=>{
		getCodeLoading.value = false
	})
}

const checkEmail = (rule, value, callback) => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	if(value === '') {
		callback(new Error('请输入邮箱'))
	}else if(!emailRegex.test(value)){
		callback(new Error('请输入正确的邮箱格式'))
	}else {
		callback()
	}
}

const checkCode = (rule, value, callback) => {
	const codeRegex = /^[a-zA-Z0-9]{6}$/
	if(value === '') {
		callback(new Error('请输入验证码'))
	}else if(!codeRegex.test(value)) {
		callback(new Error('请输入正确的验证码格式'))
	}else {
		callback()
	}
}

const loginRules = ref({
	email: [{validator: checkEmail, trigger: 'blur'}],
	verificationCode: [{validator: checkCode, trigger: 'blur'}]
})

const doLogin = (formEl) => {
	if(!formEl) return
	formEl.validate((valid)=>{
		if(valid) {
			submitLoading.value = true
			loginWithEmailCode(loginForm.value).then((resp)=>{
				if(resp.code === 200) {
					window.sessionStorage.setItem('user', JSON.stringify(resp.result))
					window.sessionStorage.setItem('token', resp.result.token)
					store.dispatch('setLoginInfo', resp.result)
					router.push({name: 'adminIndex'})
					ElMessage({
						type: 'success',
						message: '登录成功'
					})
				}else { 
					ElMessage({
						type: 'error',
						message: resp.msg
					})
				}
			}).finally(()=>{
				submitLoading.value = false
			})
		}
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
}
</style>