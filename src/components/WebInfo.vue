<template>
	<div class="website-wrapper">
		<div class="card-hd">
			<el-image :src="zhexianIcon" class="card-icon"></el-image>网站资讯
		</div>
		<div class="website-info">
			<div class="website-info-item">
				<div>文章数目：</div>
				<div>6</div>
			</div>
			<div class="website-info-item">
				<div>已运行时间：</div>
				<div>1073天</div>
			</div>
			<div class="website-info-item">
				<div>本站总字数：</div>
				<div>6.3k</div>
			</div>
			<div class="website-info-item">
				<div>本站访客数：</div>
				<div>136</div>
			</div>
			<div class="website-info-item">
				<div>本站总访问量：</div>
				<div>352</div>
			</div>
			<div class="website-info-item">
				<div>最后更新时间：</div>
				<div>2022年3月19日</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import zhexianIcon from '@/assets/svg/zhexian.svg'
</script>
<style lang="scss" scoped>
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

.website-wrapper {
	font-size: 14px;

	.website-info {
		width: 243px;

		&-item {
			display: flex;
			justify-content: space-between;
			height: 28px;
		}
	}
}
</style>