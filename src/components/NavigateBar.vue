<template>
	<div>
		<div class="hd-box" v-show="isHdBoxVisible">
			<div class="hd-box__left" @click="goIndex">
				Cystrix's blog
			</div>
			<div class="hd-box__right">
				<div class="item">
					<HomeFilled style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 首页
				</div>
				<div class="item" style="margin-right: 10px;">
					<Suitcase style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 时间轴
				</div>
				<div class="item">
					<PriceTag style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 标签
				</div>
				<div class="item">
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
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
let lastScrollPosition = 0
const isHdBoxVisible = ref(true)

onMounted(() => {
	window.scrollTo({ top: 0 })
	window.addEventListener('scroll', handleScroll)
})


const handleScroll = () => {
	const newScrollPosition = window.scrollY
	if (newScrollPosition < lastScrollPosition) {
		isHdBoxVisible.value = true
	} else {
		isHdBoxVisible.value = false
	}
	lastScrollPosition = newScrollPosition
}

</script>
<style lang="scss" scoped>
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
	}
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
	animation: fadeIn 1.5s ease-in-out, slideDown 1s ease-in-out;

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