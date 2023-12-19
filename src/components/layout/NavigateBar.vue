<template>
	<div class="hd-box" ref="topNavigator" v-show="isVisible" :class="clazzObj">
		<div class="hd-box__left" @click="goIndex">
			Cystrix's blog
		</div>
		<div class="hd-box__right">
			<div class="item" @click="goIndex">
				<HomeFilled style="width: 1.2em; height: 1.2em; margin-right: 5px;"/> 首页
			</div>
			<div class="item" style="margin-right: 10px;"  @click="goArchive">
				<Suitcase style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 时间轴
			</div>
			<div class="item" @click="goTag">
				<PriceTag style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 标签
			</div>
			<div class="item" @click="goCategory">
				<FolderOpened style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 分类
			</div>
			<div class="item">
				<ChatLineSquare style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 清单
			</div>
			<div class="item">
				<Paperclip style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 友链
			</div>
			<div class="item">
				<Apple style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 关于
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
let lastScrollPosition = 0
const isVisible = ref(true)
const hasBgColor = ref(false)

onMounted(() => {
	window.scrollTo({ top: 0 })
	window.addEventListener('scroll', handleScroll)
})

// const topNavigator = ref(null) // vue3中 this.$refs.的用法

const clazzObj = computed(() => ({
	bgColor: hasBgColor.value
}))
const handleScroll = () => {
	const newScrollPosition = window.scrollY
	if (newScrollPosition === 0) {
		hasBgColor.value = false
	} else {
		hasBgColor.value = true

	}
	if (newScrollPosition < lastScrollPosition) {
		isVisible.value = true
	} else {
		isVisible.value = false
	}
	lastScrollPosition = newScrollPosition
}

// 刷新首页
const router = useRouter()
const goIndex = () => {
	if(router.currentRoute.value.name === 'index') {
		location.reload()
	}else {
		router.push({name: 'index'})
	}
}

//去标签页面
const goTag = () => {
	router.push({name: 'tags'})
}

const goCategory = () => {
	router.push({name: 'categories'})
}

// 去归档页面
const goArchive = () => {
	router.push({name: 'archive'})
}

</script>
<style lang="scss" scoped>
@keyframes fadeIn {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@keyframes slideDown {
	0% {
		transform: translateY(-100%);
	}

	100% {
		transform: translateY(0)
	}
}

.bgColor {
	background-color: rgba(255, 255, 255, 0.8) !important;
	box-shadow: rgba(133, 133, 133, 0.6) 0px 5px 6px -5px;
	color: #4C4948 !important;
}
.white {
	color: #fff;
}
.gray {
	color: #4C4948;
}

.hd-box {
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	top: 0;
	width: 100%;
	height: 60px;
	padding: 0 36px;
	background-color: transparent;
	color: #fff;
	animation: fadeIn 1s ease-in-out, slideDown 1s ease-in-out;
	// transition: opacity 3s ease-in-out;
	z-index: 9;

	// .hidden {
	// 	opacity: 0;
	// }

	&__left {
		font-size: 18.2px;
		font-weight: 700;
		cursor: pointer;
	}

	&__right {
		display: flex;
		justify-content: flex-end;
		padding-right: 46px;
		align-items: center;
		font-size: 14.2px;

		.item {
			display: flex;
			cursor: pointer;
			align-items: center;
			width: 70px;
		}
	}
}
</style>