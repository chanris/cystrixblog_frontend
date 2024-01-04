<template>
	<div class="website-wrapper">
		<div class="card-hd">
			<el-image :src="zhexianIcon" class="card-icon"></el-image>网站资讯
		</div>
		<div class="website-info">
			<div class="website-info-item">
				<div>文章数目：</div>
				<div>{{ siteInfo.articleNum }}</div>
			</div>
			<div class="website-info-item">
				<div>已运行时间：</div>
				<div>{{siteInfo.runDays}}天</div>
			</div>
			<div class="website-info-item">
				<div>本站总字数：</div>
				<div>{{siteInfo.wordsNum / 1000 }}k</div>
			</div>
			<div class="website-info-item">
				<div>本站访客数：</div>
				<div>{{siteInfo.visitorsNum}}</div>
			</div>
			<div class="website-info-item">
				<div>本站总访问量：</div>
				<div>{{siteInfo.visitorsNum}}</div>
			</div>
			<div class="website-info-item">
				<div>最后更新时间：</div>
				<div>{{timeDisplay(siteInfo.latestUpdateTime)}}</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import zhexianIcon from '@/assets/svg/zhexian.svg'
import { _getSiteInfo } from '@/api/site.js'
import { onMounted, ref } from 'vue'

onMounted(()=>{
	getSiteInfo()
})
const siteInfo = ref({
	articleNum: '',
	runDays: '',
	wordsNum: '',
	visitorsNum: '',
	visitNum: '',
	latestUpdateTime: ''
})

const timeDisplay = (str) => {
	if(!str) return
	let time = parseDateString(siteInfo.value.latestUpdateTime)
	return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
}

function parseDateString(date) {
  const [datePart, timePart] = date.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);
  const jsMonth = month - 1;
  return new Date(year, jsMonth, day, hour, minute, second);
}
const getSiteInfo = () => {
	_getSiteInfo().then(({result})=>{
		siteInfo.value = result
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

.website-wrapper {
	font-size: 14px;

	.website-info {
		width: 243px;
		color: rgb(76, 73, 72);
		&-item {
			display: flex;
			justify-content: space-between;
			height: 28px;
		}
	}
}
</style>