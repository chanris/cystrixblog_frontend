<template>
	<div class="contianer">
		<NavigateBar></NavigateBar>
		<div class="title-box">
			<div class="wrap">
				<div class="title">分类</div>
			</div>
		</div>
		<div class="main">
			<div class="content-box">
				<el-row>
					<el-col :span="18">
						<el-card class="main-card" v-loading="loading">
							<div class="title">分类 <span> - </span>{{sum}}</div>
							<div class="category-list">
								<div class="category-item">
									<el-image :src="cateCircle" style="height: 12px; width: 12px; padding-right: 5px;"></el-image> 
									<span>{{ rootCate.name }}</span> <span style="color: #858585;">({{ rootCate.articleNum }})</span>
								</div>
								<CategoryItem v-if="rootCate.children && rootCate.children.length > 0" v-model:categoryList="rootCate.children"></CategoryItem>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card class="card-box">
							<UserInfo></UserInfo>
						</el-card>
						<el-card class="card-box">
							<Notice></Notice>
						</el-card>
						<el-card class="card-box">
							<LatestArticle></LatestArticle>
						</el-card>
						<el-card class="card-box">
							<Catageory></Catageory>
						</el-card>
						<el-card class="card-box">
							<Tag></Tag>
						</el-card>
						<el-card class="card-box">
							<Archive></Archive>
						</el-card>
						<el-card class="card-box">
							<WebInfo></WebInfo>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<div class="footer">
				<div class="footer-wrapper">
					<div class="copyright">©2023-2025&nbsp;By&nbsp;Cystrix</div>
					<div>Hi,&nbsp;welcome&nbsp;to&nbsp;cystrix's&nbsp;blog</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import NavigateBar from '@/components/layout/NavigateBar.vue'
import UserInfo from '@/components/UserInfo.vue'
import Notice from '@/components/Notice.vue'
import Catageory from '@/components/CategoryCard.vue'
import LatestArticle from '@/components/LatestArticle.vue'
import Tag from '@/components/TagCard.vue'
import Archive from '@/components/ArchiveCard.vue'
import WebInfo from '@/components/WebInfo.vue'
import cateCircle from '@/assets/svg/cateCircle.svg'
import { _categoryTree2 } from '@/api/category'
import { onMounted, ref } from 'vue'
import CategoryItem from './components/CategoryItem.vue'

onMounted(()=>{
	categoryTree({id: 1})
})

const loading = ref(false)
const rootCate= ref('')
const categoryTree = (params) => {
	loading.value = true
	_categoryTree2(params).then(({result})=>{
		rootCate.value = result
		sumCategory(rootCate.value)
	}).finally(()=> {
		loading.value = false
	})
}

const sum = ref(0)
const sumCategory = (root) => {
	if(!root) return
	sum.value = sum.value + 1
	if(root.children) {
		for(let item of root.children) {
			sumCategory(item)
		}
	}
}

</script>
<style lang="scss" scoped>
.contianer {
	color: #4C4948;
	.title-box {
		position: relative;
		height: 400px;
		width: 100%;
		color: #fff;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: url('@/assets/img/categories_bg.jpeg');
			filter: brightness(80%);
			background-position: center;
			background-size: cover;
			z-index: -1;
		}

		.wrap {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 134px;
			width: 100%;
			margin: 0 auto;
			padding-top: 165px;

			.title {
				margin-top: 20px;
				margin-bottom: 8px;
				height: 52.5px;
				font-size: 40px;
				font-weight: 700;
				text-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;
			}
		}

	}

	.main {
		.content-box {
			margin: 0 auto;
			max-width: 1200px;
			padding-top: 40px;

			.card-box {
				margin-bottom: 20px;
			}

			.main-card {
				box-sizing: border-box;
				width: 877px;
				display: flex;
				// justify-content: center;
				align-items: center;
				// text-align: center;
				padding: 50px 40px;

				.category-list {
					text-align: left;
					font-size: 13px;
					width: 100%;
					.category-item {
						display: flex;
						align-items: center;
						height: 29px;
						&-2 {
							display: flex;
							align-items: center;
							height: 29px;
							margin-left: 2em;
						}
						&-3 {
							display: flex;
							align-items: center;
							height: 29px;
							margin-left: 4em;
						}
					}
				}

				.title {
					font-size: 36px;
					text-align: center;
					padding-left: 328px;
				}
			}
		}
	}
}

.footer {
	height: 164px;
	background-image: url('@/assets/img/categories_bg.jpeg'); // todo 18/12/23 需要按页面替换
	background-size: cover;
	background-position: center bottom;

	.footer-wrapper {
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-size: 14px;
	}
}

:deep(.el-card) {
	border-color: transparent;
	border-radius: 12px 8px 8px 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

:deep(.el-card:hover) {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.30); // 加深阴影
}
</style>