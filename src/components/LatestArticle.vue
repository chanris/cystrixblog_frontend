<template>
	<div class="article-wrapper">
		<div class="card-hd">
			<el-image class="card-icon" :src="timeIcon"/>
			最新文章
		</div>
		<div class="article-list">
			<div class="article-item" v-for="item,index in articleList" :key="item.id" :style="index === articleList.length - 1 ? {border: 0} : {}">
				<el-image class="img" 
				@click="goDetail(item)"
				fit="cover"
				:src="`http://47.109.110.189/download/cover/${item.coverImg}`"></el-image>
				<div class="item-right" >
					<div class="item-right-one" @click="goDetail(item)">{{item.title}}</div>
					<div class="item-right-two">{{ item.createTime.substring(0, 10) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import timeIcon from '@/assets/svg/time.svg'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _getArticleListWithoutContent } from '@/api/article.js'
const articleList = ref([])
const router = useRouter()

const goDetail = (article) => {
	router.push({path: `/article/detail/${article.id}`, force: true})
}


onMounted(()=>{
	getArticleList({pageNum: 1, pageSize: 5})
})
const getArticleList = (params) => {
	_getArticleListWithoutContent(params).then(({result})=>{
		articleList.value = result.list
	})
} 
</script>
<style lang="scss" scoped>
.article-wrapper {
	font-size: 17px;
	.article-list {
		color: rgb(76, 73, 72);
		.article-item {
			display: flex;
			height: 65px;
			width: 258.72px;
			border-bottom: 1px dashed rgb(245, 245, 245);
			margin: 4px 0;
			.img {
				height: 59px; 
				width: 59px; 
				margin-right: 10px;
				&:hover {
					cursor: pointer;
				}
			}
			.item-right {
				display: flex;
				flex-direction: column;
				justify-content: center;

				&-one {
					font-size: 14px;
					height: 19px;
					color: rgb(76, 73, 72);
					line-height: 19px;
					&:hover {
						color: #49B1F5;
						cursor: pointer;
					}
				}
				

				&-two {
					font-size: 12px;
					color: rgb(133, 133, 133);
					height: 24px;
					line-height: 24px;
				}
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