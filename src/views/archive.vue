<template>
	<div class="container">
		<NavigateBar></NavigateBar>
		<div class="title-box">
			<div class="wrap">
				<div class="title">标签</div>
			</div>
		</div>
		<div class="main">
			<div class="content-box">
				<el-row>
					<el-col :span="18">
						<el-card class="main-card" v-loading="loading">
							<div class="archive-box">
								<div class="article-sort-title">
									文章总览 - {{ sum }}
								</div>
								<div class="article-sort">
									<div v-for="item in list" :key="item.id">
										<div class="article-sort-item year" v-if="item.flag">{{ item.title }}</div>
										<div class="article-sort-item" v-else>
											<el-image class="cover" fit="cover" :src="`http://47.109.110.189/download/cover/${item.coverImg}`" @click="goDetail(item.id)" style="height: 80px; width: 80px; " />
											<div class="article-sort-item-info">
												<div class="info-one" style="display: flex; align-items: center;">
													<Calendar style="height: 1em; width: 1em;"></Calendar> <span
														style="padding-left: 6px;">{{ item.createTime.substring(0, 10) }}</span>
												</div>
												<div class="info-two" @click="goDetail(item.id)">{{item.title}}</div>
											</div>
										</div>
									</div>
								</div>
								<div class="page-wrapper">
									<el-pagination :hide-on-single-page="true" 
										background layout="prev, pager, next"
										v-model:page-size="pageInfo.pageSize"
										v-model:current-page="pageInfo.pageNum"
										:total="pageInfo.total" />
								</div>
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
			<Footer></Footer>
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
import Footer from '@/components/layout/footer.vue'
import { onMounted, ref, watch} from 'vue'
import { _listArticleWithPage } from '@/api/archive.js'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
onMounted(()=>{
	if(route.query.year && route.query.month) {
		pageInfo.value.year = route.query.year
		pageInfo.value.month = route.query.month
	}
	listArticleWithPage(pageInfo.value)
})
const pageInfo = ref({
	pageNum: 1,
	pageSize: 10,
	total: 0,
	year: '',
	month: ''
})
const list = ref([])
const sum = ref(0)
const loading = ref(false)
const listArticleWithPage = (params) => {
	loading.value = true
	list.value = []	
	_listArticleWithPage(params).then(({result})=>{
		pageInfo.value.pageNum = result.pageNum
		pageInfo.value.pageSize = result.pageSize
		pageInfo.value.total = result.total
		sum.value = result.list.length
		let ele = ''
		result.list.forEach(item => {
			item.flag = false
			let year = item.createTime.substring(0, 4)
			if(ele && ele.createTime.substring(0, 4) !== year) {
				list.value.push({id: Math.floor(Math.random() * 1000000000), title: year, flag: true})			
			}
			list.value.push(item)
			ele = item
		})
	}).finally(()=>{
		loading.value = false
	})
}

watch([()=>pageInfo.value.pageNum, ()=>pageInfo.value.pageSize], 
	([pageNum, pageSize], [oldPageNum, oldPageSize]) => {
		// todo 23/12/29 为什么每次监听 pageNum === oldPageNum ?
		listArticleWithPage(pageInfo.value)
})


const goDetail = (id) => {
	router.push({path:`/article/detail/${id}`})
}



</script>
<style lang="scss" scoped>
.container {
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
			background-image: url('@/assets/img/archive_bg.jpeg');
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
				display: flex;
				box-sizing: border-box;
				width: 877px;
				max-height: 1800px;
				align-items: center;
				padding: 50px 40px;

				.archive-box {
					color: #4C4948;

					.article-sort {
						box-sizing: border-box;
						// margin-left: 10px;
						border-left: 2px solid rgb(170, 218, 250);
						padding-left: 30px;

						&-item {
							position: relative;
							display: flex;
							align-items: center;
							height: 80px;
							margin-bottom: 20px;

							.cover:hover {
								cursor: pointer;
							}

							&::before {
								position: absolute;
								top: 50%;
								transform: translateY(-50%);
								left: calc(-1rem - 17px);
								width: 0.3rem;
								height: 0.3rem;
								border: 0.15rem solid #49b1f5;
								border-radius: 0.3rem;
								background: #fff;
								content: '';
							}

							&:hover::before {
								border-color: #ff7242;
							}

							&-info {
								display: flex;
								flex-direction: column;
								// align-items: center;
								padding: 0px 16px;
								.cover:hover {
									cursor: pointer;
								}

								.info-one {
									height: 24.69px;
									font-size: 12.35px;
									color: #858585;
								}

								.info-two {
									height: 28.59px;
									&:hover {
										cursor: pointer;
									}
								}
							}

							&-img {
								overflow: hidden;
								width: 80px;
								height: 80px;

							}
						}

						.year {
							font-size: 18.59px;
							height: 37.19px;
							padding-left: 10px;
						}
					}

					.page-wrapper {
						display: flex;
						justify-content: center;
						margin-top: 20px;
					}

					.article-sort-title {
						font-size: 22.36px;
						position: relative;
						padding: 0px 0px 20px 20px;
						height: 64.72px;
						line-height: 64.72px;

						&::before {
							position: absolute;
							top: 28.35%;
							left: -0.45rem;
							z-index: 3;
							width: 0.5rem;
							height: 0.5rem;
							border: 0.25rem solid #49b1f5;
							border-radius: 0.5rem;
							background-color: #fff;
							content: '';
							line-height: 0.5rem;
						}

						&:hover::before {
							border-color: #ff7242;
						}

						&::after {
							position: absolute;
							bottom: 0;
							left: 0;
							z-index: 0;
							width: 0.1rem;
							height: 1.95em;
							background: #aadafa;
							content: '';
						}
					}
				}
			}
		}
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

:deep(.main-card > .el-card__body) {
	padding: 0;
	width: 877px;
}
</style>