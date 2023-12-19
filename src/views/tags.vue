<template>
	<div class="box">
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
						<el-card class="tags-card">
							<div class="tag-title">标签 <span> - </span>11</div>
							<div class="tags-cloud">
								<span class="tag-item">Hexo</span>
								<span class="tag-item">NoSql</span>
								<span class="tag-item">Redis</span>
								<span class="tag-item">iconfonts</span>
								<span class="tag-item">css</span>
								<span class="tag-item">内存</span>
								<span class="tag-item">数据类型</span>
								<span class="tag-item">补码</span>
								<span class="tag-item">token</span>
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
			<Footer :backgroundUrl="'@/assets/img/tags_bg.jpeg'"></Footer>
		</div>
	</div>
</template>
<script setup>
import NavigateBar from '@/components/NavigateBar.vue'
import UserInfo from '@/components/UserInfo.vue'
import Notice from '@/components/Notice.vue'
import Catageory from '@/components/CategoryCard.vue'
import LatestArticle from '@/components/LatestArticle.vue'
import Tag from '@/components/TagCard.vue'
import Archive from '@/components/ArchiveCard.vue'
import WebInfo from '@/components/WebInfo.vue'
import Footer from '@/components/layout/footer.vue'
</script>
<style lang="scss" scoped>
.box {
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
			background-image: url('@/assets/img/tags_bg.jpeg');
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

			.tags-card {
				box-sizing: border-box;
				width: 877px;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				padding: 50px 40px;
				.tag-title {
					font-size: 36px;
				}

				.tags-cloud {
					.tag-item {
						display: inline-block;
						padding: 0px 8px;
						height: 33.59px;
						font-size: 16.8px;
						transition: font-size 0.3s ease;
					}
					.tag-item:hover {
						cursor: pointer;
						font-size: 18px;
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