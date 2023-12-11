<template>
	<div class="container">
		<div class="hd-box" v-show="isHdBoxVisible">
			<div class="hd-box__left">
				Cystrix's blog
			</div>
			<div class="hd-box__right">
				<div class="item"> <HomeFilled style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 首页</div>
				<div class="item" style="margin-right: 10px;" > <Suitcase style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 时间轴</div>
				<div class="item"> <PriceTag style="width: 1.2em; height: 1.2em; margin-right: 5px;"/> 标签</div>
				<div class="item"> <FolderOpened style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 分类</div>
				<div class="item"> <ChatLineSquare style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 清单</div>
				<div class="item"> <Paperclip style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 友链</div>
				<div class="item"> <Apple style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 关于</div>
			</div>
		</div>
		<div class="arrowdown-box" @click="scrollToContent">
			<ArrowDownBold style="width: 1em; height: 1em;"/>
		</div>
		<div class="main">
			<div class="content-box"></div>
			<div class="footer">
				<div class="footer-wrapper">
					<div class="copyright">©2023-2025&nbsp;By&nbsp;Cystrix</div>
					<div>Hi,&nbsp;welcome&nbsp;to&nbsp;cystrix's&nbsp;blog</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let lastScrollPosition = 0
const isHdBoxVisible = ref(true)

onMounted(() => {
  window.scrollTo({top: 0})
  window.addEventListener('scroll', handleScroll)
})
const scrollToContent = function() {
	const contentBoxHeight = document.querySelector('.content-box').offsetTop;
	window.scrollTo({
		top: contentBoxHeight + window.innerHeight,
		behavior: 'smooth'
	})
}

const handleScroll = () => {
	const newScrollPosition = window.scrollY
	if(newScrollPosition < lastScrollPosition) {
		isHdBoxVisible.value = true
	}else {
		isHdBoxVisible.value = false
	}
	lastScrollPosition = newScrollPosition
}

</script>

<style scoped lang="scss">

@keyframes bounce {
	0% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(15px);
	}
	100% {
		transform: translateY(0);
	}
}

@keyframes fadeIn {
	0% {opacity: 0;}
	100% { opacity: 1;}
}

@keyframes slideDown {
	0% {transform: translateY(-100%);}
	100% {transform: translateY(0)}
}
.container {
	height: 100vh;
	width: 100%;
	background-image: url('@/assets/img/index_bg.png');
	background-size: cover;
	background-position: center;
	background-attachment: fixed;

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
		&__left {
			font-size: 18.2px;
			font-weight: 700;
		}
		&__right {
			display: flex;
			justify-content: flex-end;
			padding-right: 46px;
			align-items: center;
			font-size: 14.2px;
			.item {
				display: flex;
				align-items: center;
				width: 70px;
			}
		}
	}

	.arrowdown-box {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 25px;
		color: #fff;
		animation: bounce 1.5s infinite;
	}

	.main {
		position: relative;
		top: 100vh;
		width: 100%;
		min-height: 100vh;
		background-color: #fff;
		.content-box {
			height: 300px;
			background-color: lightcoral;
			margin-bottom: 164px;
		}
		.footer {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 164px;
			background-image: url('@/assets/img/index_bg.png');
			background-size: cover;
			background-attachment: fixed;
			background-position: center bottom;
			&-wrapper {
				height: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				color: #fff;
				font-size: 14px;	
			}
		}
	}
}


</style>