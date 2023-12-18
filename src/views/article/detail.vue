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
						<el-card class="post-content">
							<v-md-preview :text="text" ></v-md-preview>
							<div class="post-info"></div>
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
import NavigateBar from '@/components/NavigateBar.vue'
import UserInfo from '@/components/UserInfo.vue'
import Notice from '@/components/Notice.vue'
import LatestArticle from '@/components/LatestArticle.vue'
import Footer from '@/components/layout/footer.vue'
import { ref } from 'vue'

const text = ref(`### cystrixblog_frontend
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
			## xxxx
	
			
`)

</script>
<style lang="scss" scoped>
.wrapper {
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
						height: 162px;
						width: 798px;
						border: 1px solid rgb(238, 238, 238);
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