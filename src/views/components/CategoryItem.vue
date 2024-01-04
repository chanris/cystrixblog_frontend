<template>
	<div v-for="item in categoryList" :key="item.id">
		<div class="category-item" :style="{marginLeft: item.level + 'em'}">
			<el-image :src="cateCircle" style="height: 12px; width: 12px; padding-right: 5px;"></el-image> 
			<span>{{ item.name }}</span> <span style="color: #858585;">({{ item.articleNum }})</span>
		</div>
		<CategoryItem v-if="item.children && item.children.length > 0" v-model:categoryList="item.children"></CategoryItem>
	</div>
</template>
<script setup>
import cateCircle from '@/assets/svg/cateCircle.svg'
defineProps({
	categoryList: Array	
})
</script>
<style lang="scss" scoped>
.category-item {
	display: flex;
	align-items: center;
	height: 29px;
}
</style>