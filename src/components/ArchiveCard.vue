<template>
	<div class="archive-wrapper">
		<div class="card-hd">
			<el-image :src="archiveIcon" class="card-icon"></el-image>归档
		</div>
		<div class="archive-list">
			<div class="archive-item" v-for="item in archiveList" :key="item.year + item.month">
				<div>{{ monthDisplay(item.month) }} {{item.year}}</div>
				<div>{{ item.articleNum }}</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import archiveIcon from '@/assets/svg/archive.svg'
import { _archiveList} from '@/api/archive.js'
import { onMounted, ref } from 'vue'

onMounted(()=>{
	getArchiveList({pageNum: 1, pageSize: 6})
})

const archiveList = ref([])
const getArchiveList = (params) => {
	_archiveList(params).then(({result})=>{
		archiveList.value = result.list
	})
}
const monthList = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
const monthDisplay = (month) => {
	if(!month) return ''
	return monthList[parseInt(month)-1] + '月'
}
 
</script>
<style lang="scss" scoped>
.archive-wrapper {
	.archive-list {
		width: 243px;
		color: rgb(76, 73, 72);
		.archive-item {
			display: flex;
			justify-content: space-between;
			height: 28px;
			font-size: 14px;
			&:hover {
				// background-color: #49b1f5;
				animation: bgcGradient 0.5s 1 forwards;
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