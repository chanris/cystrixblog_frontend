<template>
	<div class="box">
		<div class="top">
			<div class="left">
				<el-image style="height: 50px; width: 50px; margin-right: 5px;" :src="logo"></el-image>
				Cystrix Blog后台管理系统
			</div>
			<div class="right">
				<Avatar style="height: 20px; width: 20px; margin-right: 5px;"></Avatar>
				<span ref="userRef">{{username}}，你好</span>
				<el-popover
					ref="popoverRef"
					:virtual-ref="userRef"
					trigger="click"
					virtual-triggering>
					<el-button link @click="logout">退出</el-button>
				</el-popover>
			</div>
		</div>
		<div class="main">
			<div class="sidebar">
				<el-menu default-active="1">
					<el-menu-item index="1" @click="goHome">
						<el-icon>
							<document />
						</el-icon>
						<span>首页</span>
					</el-menu-item>
					<el-menu-item index="2" @click="goArticle">
						<el-icon>
							<document />
						</el-icon>
						<span>文章管理</span>
					</el-menu-item>
					<el-menu-item index="3" @click="goCategory">
						<el-icon><Menu></Menu></el-icon>
						<span>分类管理</span>
					</el-menu-item>
					<el-menu-item index="4" @click="goTag">
						<el-icon>
							<document />
						</el-icon>
						<span>标签管理</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="content-box">
				<div class="crumb">
					<el-breadcrumb >
						<el-breadcrumb-item :to="{ name: 'adminHome' }">首页</el-breadcrumb-item>
						<template v-for="(item, index) in breadList">
							<el-breadcrumb-item
								v-if="item.name"
								:key="index"
								:to="{name: item.name}"
							>{{ item.meta.title }}</el-breadcrumb-item>
						</template>
					</el-breadcrumb>
				</div>
				<div class="content">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import {onMounted, watch, ref, computed } from 'vue'
import { useStore } from 'vuex';
import logo from '@/assets/img/logo.jpg'
const router = useRouter()
const route = useRoute()
const store = useStore()
const goHome = () => {
	router.push({name: 'adminHome'})	
}
const goArticle = () => {
	router.push({name: 'adminArticle'})
}
const goCategory = () => {
	router.push({name: 'adminCategory'})
}

const goTag = () => {
	router.push({name: 'adminTag'})
}

const breadList = ref([])

const getMatched = () => {
	breadList.value = route.matched.filter(item => item.meta && item.meta.title)
}
const user = ref('')
onMounted(()=> {
	user.value = store.getters.user
	getMatched()
})
const username = computed(() => { return user.value.username || '匿名用户' })
watch(() => route.path, (newValue, oldValue) => { //监听路由路径是否发生变化，之后更改面包屑
  breadList.value = route.matched.filter(item => item.meta && item.meta.title);
})

const popoverRef = ref()
const userRef = ref()
const logout = () => {
	store.dispatch('logout')
	router.push({name: 'login'})
}
</script>
<style lang="scss" scoped>
.box {
	background-color: rgb(240, 245, 249);

	.top {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		height: 64px;
		background-color: #1790E8;
		padding: 0 20px;

		.left {
			display: flex;
			align-items: center;
			font-size: 20px;
			font-weight: 700;
			color: #fff;
		}

		.right {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: #fff;
		}
	}

	.main {
		display: flex;
		height: calc(100vh - 64px);

		.sidebar {
			width: 245px;
			height: calc(100vh - 64px);
			background-color: #fff;
		}

		.content-box {
			box-sizing: border-box;
			padding: 0 20px 20px 20px;
			width: calc(100% - 245px);

			.crumb {
				display: flex;
				align-items: center;
				font-size: 16px;
				font-weight: 500;
				height: 20px;
				width: 100%;
				margin: 15px 0;
				padding-left: 5px;
				background: transparent;
				border-left: 4px solid #0076D9;
			}

			.content {
				width: 100%;
				height: calc(100vh - 134px);
				overflow-y: scroll;
				&::-webkit-scrollbar {
					width: 0; // 设置盒子的滚动条宽度
				}
			}
		}

	}


}
</style>