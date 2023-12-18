<template>
	<div class="user-wrapper">
		<el-avatar shape="circle" :size="110" :src="defaultAvatar" fit="fill" @mouseover="rotateClockwise"
			@mouseleave="rotateCounterclockwise" />
		<div class="user-name">Cystrix</div>
		<div class="user-statistics">
			<div class="item">
				<div class="item-one">文章</div>
				<div class="item-two">6</div>
			</div>
			<div class="item">
				<div class="item-one">标签</div>
				<div class="item-two">11</div>
			</div>
			<div class="item">
				<div class="item-one">分类</div>
				<div class="item-two">6</div>
			</div>
		</div>
		<div class="user-followme"> <el-image :src="githubWhiteIcon"
				style="height: 20px; width: 20px; margin-right: 5px;" /> Follow Me</div>
		<div style="margin-top: 20px; display: flex; justify-content: center; align-items: center;">
			<el-image :src="githubIcon" style="height: 20px; width: 20px;"></el-image>
			<div style="width: 20px;"></div>
			<el-image :src="emailIcon" style="height: 20px; width: 20px; "></el-image>
		</div>
	</div>
</template>
<script setup>
import defaultAvatar from '@/assets/img/default_avatar.jpg'
import githubWhiteIcon from '@/assets/svg/github-white.svg'
import githubIcon from '@/assets/svg/github.svg'
import emailIcon from '@/assets/svg/email.svg'

// 用户头像旋转
const rotateClockwise = () => {
	const avatar = document.querySelector('.el-avatar');
	avatar.style.transform = 'rotate(360deg)';
}

const rotateCounterclockwise = () => {
	const avatar = document.querySelector('.el-avatar');
	avatar.style.transform = 'rotate(-360deg)';
}
</script>
<style lang="scss" scoped>

@keyframes followProgress {
	0% {
		background-position: 0% 0;
	}

	100% {
		background-position: 100% 0;
	}
}

.el-avatar {
	transition: transform 0.5s ease; // 开始慢，中间快，结束慢
	transition-delay: 0s;
}

.el-avatar:hover {
	transform: rotate(360deg);
}

.user-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.user-name {
		height: 44px;
		line-height: 44px;
		font-size: 22px;
		font-weight: 500;
	}

	.user-followme {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 230px;
		height: 34px;
		color: #fff;
		font-size: 14px;
		background: linear-gradient(to right, #49B1F5 50%, #ff7242 50%);
		background-size: 200% 100%;
		transition: background-position 0.5s ease-in;
	}

	.user-followme:hover {
		background-position: -100% 0;
		cursor: pointer;
	}

	.user-statistics {
		display: flex;
		justify-content: center;
		margin-top: 5px;

		.item {
			width: 77px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&-one {
				height: 28px;
				font-size: 14px;
			}

			&-two {
				height: 40px;
				font-size: 19px;
			}
		}
	}
}
</style>