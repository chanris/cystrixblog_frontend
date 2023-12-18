<template>
	<div class="archive-wrapper">
		<div class="card-hd">
			<el-image :src="archiveIcon" class="card-icon"></el-image>归档
		</div>
		<div class="archive-list">
			<div class="archive-item">
				<div>三月 2022</div>
				<div>1</div>
			</div>
			<div class="archive-item">
				<div>四月 2022</div>
				<div>2</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import archiveIcon from '@/assets/svg/archive.svg'
</script>
<style lang="scss" scoped>
.archive-wrapper {
	.archive-list {
		width: 243px;

		.archive-item {
			display: flex;
			justify-content: space-between;
			height: 28px;
			font-size: 14px;
		}
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