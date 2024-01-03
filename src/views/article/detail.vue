<template>
	<div class="wrapper">
		<NavigateBar></NavigateBar>
		<div class="title-box">
			<div class="wrap">
				<div class="title">{{article.title}}</div>
				<div class="publish">发表于 {{article.createTime}} <span>|</span> 更新于 {{article.updateTime}} <span>|</span> {{article.categoryName}}</div>
				<div class="info">字数统计：{{article.wordNum}} <span>|</span> 阅读时长：{{ readTime }}分钟 <span>|</span> 阅读量：{{article.viewCount}} </div>
			</div>
		</div>
		<div class="main">
			<div class="content-box">
				<el-row>
					<el-col :span="18" class="post-wrapper">
						<el-card class="post-content" v-loading="loading">
							<v-md-preview :text="article.content" ></v-md-preview>
							<div class="post-info">
								<div class="author"> 
									<div>
										<span class="head">文章作者：</span> <a href="/">Cystrix</a>
									</div>
									<div style="display: flex;">
										<span>点赞</span>
										<div style="display: flex; margin-right: 20px; cursor: pointer;" @click="doLikeOnce(article.id)" >
											<el-image v-if="isLike" style="width: 21px; height: 21px;" :src="heartIcon" ></el-image>
											<el-image v-else style="width: 21px; height: 21px;" :src="grayHeartIcon" ></el-image>
										</div>
										<el-image style="width: 21px; height: 21px;" :src="copyrightIcon"></el-image>
									</div>
								</div>
								<div style="height: 28px;"><span class="head">文章链接：</span> <a href="#">http://www.baidu.com/post/detail/xxxx/</a> </div>
								<div style="height: 28px;"><span class="head">版权声明：</span> 本博客所有文章除特别声明外，均采用 <a href="#">CC BY-NC-SA 4.0 </a> 许可协议。转载请注明来自  <a href="/">Cystrix's blog</a>！</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card class="card-box" style="height: 360px;">
							<UserInfo></UserInfo>
						</el-card>
						<el-card class="card-box">
							<Notice></Notice>
						</el-card>
						<el-card class="card-box">
							<LatestArticle></LatestArticle>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<Footer v-model:coverImg="coverImg"></Footer>
		</div>
	</div>
</template>
<script setup>
import NavigateBar from '@/components/layout/NavigateBar.vue'
import UserInfo from '@/components/UserInfo.vue'
import Notice from '@/components/Notice.vue'
import LatestArticle from '@/components/LatestArticle.vue'
import Footer from '@/components/layout/footer.vue'
import copyrightIcon from '@/assets/svg/copyright.svg'
import grayHeartIcon from '@/assets/svg/grayHeart.svg'
import heartIcon from '@/assets/svg/heart.svg' 
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleDetail, _likeArticle } from '@/api/article.js'
import { ElMessage } from 'element-plus'


const route = useRoute()
const router = useRouter()
const loading = ref(false)
const article = ref({
	id: '',
	title: '',
	content: '',
	createTime: '',
	updateTime: '',
	wordNum: '',
	viewCount: '',
	categoryName: '',
	categoryId: '',
	coverImg: ''
})
const coverImg = ref('')
onMounted(()=>{
	if(route.params.id) {
		let id = route.params.id
		loading.value = true
		getArticleDetail({id}).then(({result})=>{
			article.value = result
			let el = document.querySelector(".title-box")
			if(article.value.coverImg) {
				coverImg.value = `url('http://47.109.110.189/download/cover/${article.value.coverImg}')`
				el.style.backgroundImage = coverImg.value
			}
		}).finally(()=>{
			loading.value = false
		})
	}else {
		router.push({name: 'index'})
	}
	
})

const readTime = computed(()=>{
	return (article.value.wordNum && parseInt(article.value.wordNum / 200)) || 0
}) 

// 点赞
const isLike = ref(false)
const likeArticle = (params) => {
	_likeArticle(params).then((resp)=>{
		isLike.value = true
		ElMessage({
			type: 'success',
			message: '点赞成功'
		})
	})
}

const doLikeOnce = (() => {
	let once = false
	return (id) => {
		if(!once) {
			likeArticle({id})
			once = true
		}
	}	
})()


</script>
<style lang="scss" scoped>

a {
  color: rgb(153, 169, 191) !important;
  text-decoration: underline; /* 让a标签有下划线 */
}

.wrapper {
	color: #4C4948;
	.title-box {
		height: 400px;
		width: 100%;
		color: #fff;
		// background-image: url('@/assets/img/post_bg.jpg');
		background-color: #4C4948;
		filter: brightness(95%);
		background-position: center;
		background-size: cover;
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
				font-size: 35px;
				overflow: hidden;
			}
			.publish {
				font-size: 13.3px;
				height: 27px;
			}
			.info {
				font-size: 13.3px;
				height: 27px;
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

			.post-wrapper {
				margin-bottom: 40px;
				.post-content {
					width: 877px;
					.post-info {
						display: flex;
						flex-direction: column;
						justify-content: center;
						box-sizing: border-box;
						// height: 162px;
						width: 798px;
						border: 1px solid rgb(238, 238, 238);
						margin: 0 auto;
						padding: 10px 16px;
						font-size: 14px;						
						&:hover {
							box-shadow: 0 3px 6px 4px rgba(7,17,27,0.05);
						}
						.author {
							display: flex;
							justify-content: space-between;
							flex-direction: row;
							align-items: center;
							height: 28px;
						}

						.head {
							color: rgb(73, 177, 245);
							font-weight: 700;
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
</style>