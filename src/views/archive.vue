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
						<el-card class="main-card">
							<div class="archive-box">
								<div class="article-sort-title">
									文章总览 - 6
								</div>
								<div class="article-sort">
									<div class="article-sort-item year">2022</div>
									<div class="article-sort-item">
										<a href="#" class="article-sort-item-img">
											<el-image src="@/assets/img/post_bg.jpg" style="height: 80px; width: 80px;"
												alt="" />
										</a>
										<div class="article-sort-item-info">
											<div class="info-one" style="display: flex; align-items: center;">
												<Calendar style="height: 1em; width: 1em;"></Calendar> <span
													style="padding-left: 6px;">2020-03-19</span>
											</div>
											<div class="info-two">JWT的介绍与使用</div>
										</div>
									</div>
									<div class="article-sort-item">
										<a href="#" class="article-sort-item-img">
											<el-image src="@/assets/img/post_bg.jpg" style="height: 80px; width: 80px;"
												alt="" />
										</a>
										<div class="article-sort-item-info">
											<div class="info-one" style="display: flex; align-items: center;">
												<Calendar style="height: 1em; width: 1em;"></Calendar> <span
													style="padding-left: 6px;">2020-03-19</span>
											</div>
											<div class="info-two">JWT的介绍与使用</div>
										</div>
									</div>
									<div class="article-sort-item">
										<a href="#" class="article-sort-item-img">
											<el-image src="@/assets/img/post_bg.jpg" style="height: 80px; width: 80px;"
												alt="" />
										</a>
										<div class="article-sort-item-info">
											<div class="info-one" style="display: flex; align-items: center;">
												<Calendar style="height: 1em; width: 1em;"></Calendar> <span
													style="padding-left: 6px;">2020-03-19</span>
											</div>
											<div class="info-two">JWT的介绍与使用</div>
										</div>
									</div>
								</div>
								<div class="page-wrapper">
									<el-pagination :hide-on-single-page="true" background layout="prev, pager, next"
										:total="50" />
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

								.info-one {
									height: 24.69px;
									font-size: 12.35px;
									color: #858585;
								}

								.info-two {
									height: 28.59px;
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