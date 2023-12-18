<template>
	<div class="tag-wrapper">
		<div class="card-hd">
			<el-image :src="tagIcon" class="card-icon"></el-image>标签
		</div>
		<div class="tag-cloud">
			<span class="tag-item">Hexo</span>
			<span class="tag-item">NoSql</span>
			<span class="tag-item">Redis</span>
			<span class="tag-item">iconfonts</span>
			<span class="tag-item">css</span>
			<span class="tag-item">内存</span>
			<span class="tag-item">数据类型</span>
			<span class="tag-item">补码</span>
		</div>
	</div>
</template>
<script setup>
import tagIcon from '@/assets/svg/tag.svg'
</script>
<style lang="scss" scoped>
.tag-wrapper {
	.tag-cloud {
		width: 243px;

		.tag-item {
			font-size: 15.4px;
			height: 30.8px;
			padding: 0 2px;
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