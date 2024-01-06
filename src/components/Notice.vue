<template >
	<div class="notice-wrapper">
		<div class="card-hd">
			<el-image class="notice-icon card-icon" :src="noticeIcon"></el-image> 公告
		</div>
		<div class="list">
			<div class="item">
				欢迎来到Cystrix's Blog
			</div>
		</div>
	</div>
</template>
<script setup>
import noticeIcon from '@/assets/svg/notice.svg'
</script>
<style lang="scss" scoped>

@keyframes pluse {
	0% {
		transform: scale(1);
	}

	100% {
		transform: scale(1.2);
	}
}

.notice-wrapper {
	display: flex;
	flex-direction: column;
	.notice-icon {
		animation: pluse 0.5s infinite alternate;
	}

	.list {
		.item {}
	}
}

.card-hd {
	display: flex;
	align-items: center;
	height: 30px;
	margin-bottom: 5px;
	font-size: 17px;
}

.card-icon {
	height: 20px;
	width: 20px;
	margin-right: 7px;
}

</style>