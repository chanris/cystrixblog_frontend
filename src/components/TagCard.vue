<template>
	<div class="tag-wrapper">
		<div class="card-hd">
			<el-image :src="tagIcon" class="card-icon"></el-image>标签
		</div>
		<div class="tag-cloud">
			<span class="tag-item" v-for="tag in tagList" :key="tag.id" :style="{color: tag.color}">{{tag.name}}</span>
		</div>
	</div>
</template>
<script setup>
import tagIcon from '@/assets/svg/tag.svg'
import {_getAllTagList} from '@/api/tag.js'
import { onMounted, ref } from 'vue'

onMounted(() => {
	getAllTags()
})

const tagList = ref([])
const getAllTags = () => {
	_getAllTagList().then(({result})=>{
		tagList.value = result
	})
}
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
.tag-wrapper {
	.tag-cloud {
		width: 243px;

		.tag-item {
			display: inline-block; // 行内元素无动画
			font-size: 15.4px;
			height: 30.8px;
			padding: 0 2px;
			&:hover {
				animation: pluse 0.5s 1 forwards; //关键帧  动画时间 动画次数  停留在最后一帧
				cursor: pointer;
			}
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