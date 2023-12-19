<template>
	<div class="container">
		<NavigateBar></NavigateBar>
		<div class="arrowdown-box" @click="scrollToContent">
			<ArrowDownBold style="width: 1em; height: 1em;" />
		</div>
		<div class="blog-name">Cystrix's blog</div>
		<div class="motto"><span>{{ mottoDisplay }}</span> <span class="type-cursor"
				:class="{ 'type-cursor-blink': isBlink }">|</span> </div>
		<div class="main">
			<div class="content-box">
				<el-row>
					<el-col :span="18" class="post-wrapper">
						<el-card class="post-item">
							<el-image class="post-cover" @click="goDetail"></el-image>
							<div class="post-item-right">
								<div class="recent-post-info">
									<div class="article-title" @click="goDetail">JWT的介绍与使用</div>
									<div class="article-meta-wrap">
										<Grid style="height: 13px; width: 13px; padding-right: 2px;"></Grid>发表于 <span
											style="padding-left: 2px;">2020-03-19</span> <span
											style="padding: 0 6px;">|</span>
										<Present style="height: 13px; width: 13px;"></Present> <span
											style="padding-left: 2px;">jwt</span>
									</div>
									<div class="content">
										JWT(JSON WEB TOKEN)的介绍与使用1. 什么是JWT JSON Web
										Token(JWT)，是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准。该token被设计为紧凑而安全,特别适用于分
									</div>
								</div>
							</div>
						</el-card>
						<el-card class="post-item">
							<el-image class="post-cover" @click="goDetail"></el-image>
							<div class="post-item-right">
								<div class="recent-post-info">
									<div class="article-title" @click="goDetail">JWT的介绍与使用</div>
									<div class="article-meta-wrap">
										<Grid style="height: 13px; width: 13px; padding-right: 2px;"></Grid>发表于 <span
											style="padding-left: 2px;">2020-03-19</span> <span
											style="padding: 0 6px;">|</span>
										<Present style="height: 13px; width: 13px;"></Present> <span
											style="padding-left: 2px;">jwt</span>
									</div>
									<div class="content">
										JWT(JSON WEB TOKEN)的介绍与使用1. 什么是JWT JSON Web
										Token(JWT)，是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准。该token被设计为紧凑而安全,特别适用于分
									</div>
								</div>
							</div>
						</el-card>
						<div class="page-wrapper">
							<el-pagination :hide-on-single-page="true" background layout="prev, pager, next" :total="50" />
						</div>
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
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import NavigateBar from '@/components/layout/NavigateBar.vue'
import UserInfo from '@/components/UserInfo.vue'
import Notice from '@/components/Notice.vue'
import Catageory from '@/components/CategoryCard.vue'
import LatestArticle from '@/components/LatestArticle.vue'
import Tag from '@/components/TagCard.vue'
import Archive from '@/components/ArchiveCard.vue'
import WebInfo from '@/components/WebInfo.vue'
import Footer from '@/components/layout/footer.vue'

//跳转到正文部分
const scrollToContent = function () {
	const contentBoxHeight = document.querySelector('.content-box').offsetTop;
	window.scrollTo({
		top: contentBoxHeight + window.innerHeight,
		behavior: 'smooth'
	})
}

// 座右铭显示
const mottoList = ref([])
const motto = ref("Don't go gentle into that good night")
const mottoDisplay = ref('')
const isBlink = ref(false) // 控制光标闪烁
// const mottoDisplayTimer = setInterval(()=>{
// 	if(flag) {
// 		mottoDisplay.value = motto.value.substring(0, index++)
// 	}
// }, 500)

// 封装异步任务： promise写法
// const x = function() {
// 	return Promise((resolve, reject) => {
// 		console.log('Promise executed...')
// 		// if execute success
// 		let msg = {code: 'rest.success', result: '{xxx}'}
// 		let errMsg = {code: 'failed', result: 'xxxx'}
// 		resolve(msg)
// 	//reject(msg) // 这样会抛出一个primose异常，
// 	}).then((value)=>{
// 		console.log(value)
// 	}, err=> {
// 		console.log('捕获err信息')
// 		console.log(err)
// 	})
// }
const mottoDisplayHandler = function () {
	return new Promise((resolve) => {
		// motto 长度不能为0！
		let length = motto.value.length + 1
		let index = 1
		let timer = setInterval(() => {
			if (length !== index) {
				mottoDisplay.value = motto.value.substring(0, index++)
			} else {
				resolve(timer)
			}
		}, 200)
	})
}
const mottoHiddenHandler = function () {
	return new Promise((resolve) => {
		let length = motto.value.length
		let index = length
		let timer = setInterval(() => {
			if (index >= 0) {
				mottoDisplay.value = motto.value.substring(0, index--)
			} else {
				resolve(timer)
			}
		}, 50)
	})
}

// 模仿线程睡眠
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const loopDisplay = function () {
	mottoDisplayHandler().then(timer => {
		clearInterval(timer)
		isBlink.value = true
		// 睡一秒执行 mottohidden 操作
		sleep(1000).then(() => {
			isBlink.value = false
			mottoHiddenHandler().then(timer => {
				clearInterval(timer)
				loopDisplay()
			})
		})
	})
}
loopDisplay()

// 去文章详情页
const router = useRouter()
const goDetail = () => {
	console.log('tirgger...')
	router.push({ name: 'articleDetail' })
}



onBeforeUnmount(() => {
	// mottoDisplayTimer.clear()
	// mottoHidenTimmer.clear()
})
</script>

<style scoped lang="scss">
@keyframes bounce {
	0% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(15px);
	}

	100% {
		transform: translateY(0);
	}
}


@keyframes typing {
	from {
		width: 0
	}

	to {
		width: 100%
	}
}

@keyframes blink-animation {
	50% {
		opacity: 0;
	}
}

.motto {
	position: absolute;
	top: 50%;
	left: 50%;
	height: 36px;
	line-height: 36px;
	transform: translateX(-50%);
	z-index: 3;
	color: #fff;
	white-space: nowrap;
	font-size: 24px;
}

.type-cursor {
	display: inline-block;
	transform: translateX(-100%);
}

.type-cursor-blink {
	animation: blink-animation 0.5s ease infinite;
}

.container {
	height: 100vh;
	width: 100%;
	background-image: url('@/assets/img/index_bg.png');
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	color: #4C4948;

	.blog-name {
		position: absolute;
		top: 43%;
		left: 50%;
		height: 60px;
		line-height: 60px;
		transform: translateX(-50%);
		font-size: 40px;
		font-weight: 700;
		color: #fff;
	}

	.arrowdown-box {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 25px;
		color: #fff;
		animation: bounce 1.5s infinite;
		cursor: pointer;
	}

	.main {
		position: relative;
		top: 100vh;
		width: 100%;
		min-height: 100vh;
		background-color: #fff;

		.content-box {
			padding-top: 40px;
			max-width: 1200px;
			margin: 0 auto;

			.post-wrapper {
				.post-item {
					display: flex;
					width: 877px;
					height: 280px;
					margin-bottom: 20px;
					flex-direction: row;

					.post-cover {
						width: 395px;
						height: 280px;
						z-index: 2;
						&:hover {
							cursor: pointer;
						}
					}

					&-right {
						height: 280px;
						padding: 0 40px;

						.recent-post-info {
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: center;

							.article-title {
								font-size: 24px;
								margin-bottom: 6px;

								&:hover {
									cursor: pointer;
								}
							}

							.article-meta-wrap {
								display: flex;
								height: 25px;
								align-items: center;
								color: rgb(133, 133, 133);
							}

							.content {
								height: 84px;
								width: 403px;
								margin-top: 6px;
								color: rgb(76, 73, 72);
								font-size: 14px;
								overflow-y: hidden;
								overflow-x: hidden;
							}
						}
					}
				}

				.page-wrapper {
					display: flex;
					justify-content: center;
					margin-top: 20px;
				}
			}

			.card-box {
				margin-bottom: 20px;
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

	:deep(.el-card__body.post-item) {
		box-sizing: border-box;
		// display: flex;
		// width: 879px;
	}

	:deep(.post-item > .el-card__body) {
		display: flex;
		padding: 0;
		width: 877px;
	}

}
</style>