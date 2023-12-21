<template>
	<div class="wrapper">
		<NavigateBar></NavigateBar>
		<div class="title-box">
			<div class="wrap">
				<div class="title">JWT的介绍与使用</div>
				<div class="publish">发表于 2023-03-19 <span>|</span> 更新于 2022-03-19 <span>|</span> JWT</div>
				<div class="info">字数统计：2.2k <span>|</span> 阅读时长：8分钟 <span>|</span> 阅读量：16 </div>
			</div>
		</div>
		<div class="main">
			<div class="content-box">
				<el-row>
					<el-col :span="18" class="post-wrapper">
						<el-card class="post-content" v-loading="loading">
							<v-md-preview :text="text" ></v-md-preview>
							<div class="post-info">
								<div class="author"> 
									<div>
										<span class="head">文章作者：</span> <a href="#">Cystrix</a>
									</div>
									<div>
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
			<Footer></Footer>
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
import { ref, onMounted } from 'vue'
import { getArticleDetail } from '@/api/article.js'

onMounted(()=>{
	getArticleDetail({id: 39}).then(({result})=>{
		text.value = result.content
	}).finally(()=>{
		loading.value = false
	})
})

const text = ref('')
const loading = ref(true)

</script>
<style lang="scss" scoped>

a {
  color: rgb(153, 169, 191) !important;
  text-decoration: underline; /* 让a标签有下划线 */
}

.wrapper {
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
			background-image: url('@/assets/img/post_bg.jpg');
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