<template lang="">
	<div class="category-wrapper">
		<div class="card-hd">
			<el-image :src="folderOpenIcon" class="card-icon" /> 分类
		</div>

		<div class="category-list" v-if="rootCate">
			<div class="category-item">
				<div>{{rootCate.label}}</div>
				<div>{{rootCate.articleNum}}</div>
			</div>
			<div v-for="item in rootCate.children" :key="item.id">
				<div class="category-item">
					<div>{{item.label}}</div>
					<div>{{item.articleNum}}</div>
				</div>
				<div v-if="item.children">
					<div :style="{marginLeft: (item.level * 5) + 'px' }" v-for="sub in item.children" :key="sub.id">
						<div class="category-item">
							<div>{{sub.label}}</div>
							<div>{{sub.articleNum}}</div>
						</div>
						<div v-if="sub.children">
							<div :style="{marginLeft: (sub.level * 5) + 'px' }" v-for="ssub in sub.children" :key="ssub.id">
								<div class="category-item">
									<div>{{ssub.label}}</div>
									<div>{{ssub.articleNum}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import folderOpenIcon from '@/assets/svg/folderOpen.svg'
import { _categoryTree2 } from '@/api/category.js'
import { onMounted, ref } from 'vue'

onMounted(()=>{
	categoryTree({id: 1})
})

const rootCate= ref('')
const categoryTree = (params) => {
	_categoryTree2(params).then(({result})=>{
		rootCate.value = result
	})
}

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
		font-size: 14px;
		color: rgb(76, 73, 72);
		.category-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 5px;
			height: 28px;
			&:hover {
				// background-color: #49b1f5;
				animation: bgcGradient 0.5s 1 forwards;
				cursor: pointer;
			}
		}
	}
}
</style>