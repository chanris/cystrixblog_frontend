<template lang="">
	<div class="category-wrapper">
		<div class="card-hd">
			<el-image :src="folderOpenIcon" class="card-icon" /> 分类
		</div>
		<div class="category-list">
			<div class="category-item">
				<div>C语言</div>
				<div>1</div>
			</div>
			<div class="category-item">
				<div>jwt</div>
				<div>1</div>
			</div>
			<div class="category-item">
				<div>前端</div>
				<div>1</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import folderOpenIcon from '@/assets/svg/folderOpen.svg'
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


.category-wrapper {
	.category-list {
		color: #4C4948;
		font-size: 14px;

		.category-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 28px;

		}
	}
}
</style>