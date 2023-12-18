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
						<el-card class="card-box" style="height: 360px;">
							<div class="user-wrapper">
								<el-avatar shape="circle" :size="110" :src="defaultAvatar" fit="fill"
									@mouseover="rotateClockwise" @mouseleave="rotateCounterclockwise" />
								<div class="user-name">Cystrix</div>
								<div class="user-statistics">
									<div class="item">
										<div class="item-one">文章</div>
										<div class="item-two">6</div>
									</div>
									<div class="item">
										<div class="item-one">标签</div>
										<div class="item-two">11</div>
									</div>
									<div class="item">
										<div class="item-one">分类</div>
										<div class="item-two">6</div>
									</div>
								</div>
								<div class="user-followme"> <el-image :src="githubWhiteIcon"
										style="height: 20px; width: 20px; margin-right: 5px;" /> Follow Me</div>
								<div style="margin-top: 20px; display: flex; justify-content: center; align-items: center;">
									<el-image :src="githubIcon" style="height: 20px; width: 20px;"></el-image>
									<div style="width: 20px;"></div>
									<el-image :src="emailIcon" style="height: 20px; width: 20px; "></el-image>
								</div>
							</div>
						</el-card>

						<el-card class="card-box">
							<div class="notice-wrapper">
								<div class="card-hd">
									<el-image class="notice-icon card-icon" :src="noticeIcon"></el-image> 公告
								</div>
								<div class="list">
									<div class="item">
										This is my blog
									</div>
								</div>
							</div>
						</el-card>
						<el-card class="card-box">
							<div class="article-wrapper">
								<div class="card-hd">
									<el-image class="card-icon" :src="timeIcon" />
									最新文章
								</div>
								<div class="article-list">
									<div class="article-item">
										<el-image style="height: 59px; width: 59px; margin-right: 10px;"></el-image>
										<div class="item-right">
											<div class="item-right-one">jwt的介绍与使用</div>
											<div class="item-right-two">2022-03-19</div>
										</div>
									</div>
									<div class="article-item">
										<el-image style="height: 59px; width: 59px; margin-right: 10px;"></el-image>
										<div class="item-right">
											<div class="item-right-one">jwt的介绍与使用</div>
											<div class="item-right-two">2022-03-19</div>
										</div>
									</div>
								</div>
							</div>
						</el-card>
						<el-card class="card-box">
							<div class="category-wrapper">
								<div class="card-hd">
									<el-image :src="folderOpenIcon" class="card-icon" /> 分类
								</div>
								<div class="category-list">
									<div class="category-item">
										<div>C语言</div>
										<div>1</div>
									</div>
									<div class="category-item">
										<div>jwt</div>
										<div>1</div>
									</div>
									<div class="category-item">
										<div>前端</div>
										<div>1</div>
									</div>
								</div>
							</div>
						</el-card>
						<el-card class="card-box">
							<div class="tag-wrapper">
								<div class="card-hd">
									<el-image :src="tagIcon" class="card-icon"></el-image>标签
								</div>
								<div class="tag-cloud">
									<span class="tag-item">Hexo</span>
									<span class="tag-item">NoSql</span>
									<span class="tag-item">Redis</span>
									<span class="tag-item">iconfonts</span>
									<span class="tag-item">css</span>
									<span class="tag-item">内存</span>
									<span class="tag-item">数据类型</span>
									<span class="tag-item">补码</span>
								</div>
							</div>
						</el-card>
						<el-card class="card-box">
							<div class="archive-wrapper">
								<div class="card-hd">
									<el-image :src="archiveIcon" class="card-icon"></el-image>归档
								</div>
								<div class="archive-list">
									<div class="archive-item">
										<div>三月 2022</div>
										<div>1</div>
									</div>
									<div class="archive-item">
										<div>四月 2022</div>
										<div>2</div>
									</div>
								</div>
							</div>
						</el-card>
						<el-card class="card-box">
							<div class="website-wrapper">
								<div class="card-hd">
									<el-image :src="zhexianIcon" class="card-icon"></el-image>网站资讯
								</div>
								<div class="website-info">
									<div class="website-info-item">
										<div>文章数目：</div>
										<div>6</div>
									</div>
									<div class="website-info-item">
										<div>已运行时间：</div>
										<div>1073天</div>
									</div>
									<div class="website-info-item">
										<div>本站总字数：</div>
										<div>6.3k</div>
									</div>
									<div class="website-info-item">
										<div>本站访客数：</div>
										<div>136</div>
									</div>
									<div class="website-info-item">
										<div>本站总访问量：</div>
										<div>352</div>
									</div>
									<div class="website-info-item">
										<div>最后更新时间：</div>
										<div>2022年3月19日</div>
									</div>
								</div>
							</div>
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
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import NavigateBar from '@/components/NavigateBar.vue'
import defaultAvatar from '@/assets/img/default_avatar.jpg'
import githubWhiteIcon from '@/assets/svg/github-white.svg'
import githubIcon from '@/assets/svg/github.svg'
import emailIcon from '@/assets/svg/email.svg'
import noticeIcon from '@/assets/svg/notice.svg'
import timeIcon from '@/assets/svg/time.svg'
import folderOpenIcon from '@/assets/svg/folderOpen.svg'
import tagIcon from '@/assets/svg/tag.svg'
import archiveIcon from '@/assets/svg/archive.svg'
import zhexianIcon from '@/assets/svg/zhexian.svg'
// 滚动条设置
// let lastScrollPosition = 0
// const isHdBoxVisible = ref(true)

// onMounted(() => {
// 	window.scrollTo({ top: 0 })
// 	window.addEventListener('scroll', handleScroll)
// })

const scrollToContent = function () {
	const contentBoxHeight = document.querySelector('.content-box').offsetTop;
	window.scrollTo({
		top: contentBoxHeight + window.innerHeight,
		behavior: 'smooth'
	})
}

// const handleScroll = () => {
// 	const newScrollPosition = window.scrollY
// 	if (newScrollPosition < lastScrollPosition) {
// 		isHdBoxVisible.value = true
// 	} else {
// 		isHdBoxVisible.value = false
// 	}
// 	lastScrollPosition = newScrollPosition
// }

// 用户头像旋转
const rotateClockwise = () => {
	const avatar = document.querySelector('.el-avatar');
	avatar.style.transform = 'rotate(360deg)';
}

const rotateCounterclockwise = () => {
	const avatar = document.querySelector('.el-avatar');
	avatar.style.transform = 'rotate(-360deg)';
}

// 刷新首页
const router = useRouter()
const goIndex = () => {
	router.go(0)
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
const goDetail = () => {
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



@keyframes slideDown {
	0% {
		transform: translateY(-100%);
	}

	100% {
		transform: translateY(0)
	}
}

@keyframes followProgress {
	0% {
		background-position: 0% 0;
	}

	100% {
		background-position: 100% 0;
	}
}

@keyframes pluse {
	0% {
		transform: scale(1);
	}

	100% {
		transform: scale(1.2);
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

.el-avatar {
	transition: transform 0.5s ease; // 开始慢，中间快，结束慢
	transition-delay: 0s;
}

.el-avatar:hover {
	transform: rotate(360deg);
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

				.user-wrapper {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.user-name {
						height: 44px;
						line-height: 44px;
						font-size: 22px;
						font-weight: 500;
					}

					.user-followme {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 230px;
						height: 34px;
						color: #fff;
						font-size: 14px;
						background: linear-gradient(to right, #49B1F5 50%, #ff7242 50%);
						background-size: 200% 100%;
						transition: background-position 0.5s ease-in;
					}

					.user-followme:hover {
						background-position: -100% 0;
						cursor: pointer;
					}

					.user-statistics {
						display: flex;
						justify-content: center;
						margin-top: 5px;

						.item {
							width: 77px;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;

							&-one {
								height: 28px;
								font-size: 14px;
							}

							&-two {
								height: 40px;
								font-size: 19px;
							}
						}
					}
				}

				.notice-wrapper {
					display: flex;
					flex-direction: column;

					.notice-icon {
						animation: pluse 0.5s infinite alternate;
					}

					.list {

						// margin-top: 10px;
						.item {}
					}
				}

				.article-wrapper {
					font-size: 17px;

					.article-list {
						.article-item {
							display: flex;
							height: 66px;
							width: 230px;

							.item-right {
								display: flex;
								flex-direction: column;
								justify-content: center;

								&-one {
									font-size: 14px;
									height: 19px;
									color: rgb(76, 73, 72);
									line-height: 19px;
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

				.category-wrapper {
					.category-list {
						color: #4C4948;
						font-size: 14px;

						.category-item {
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 28px;

						}
					}
				}

				.tag-wrapper {
					.tag-cloud {
						width: 243px;

						.tag-item {
							font-size: 15.4px;
							height: 30.8px;
							padding: 0 2px;
						}
					}
				}

				.archive-wrapper {
					.archive-list {
						width: 243px;

						.archive-item {
							display: flex;
							justify-content: space-between;
							height: 28px;
							font-size: 14px;
						}
					}
				}

				.website-wrapper {
					font-size: 14px;

					.website-info {
						width: 243px;

						&-item {
							display: flex;
							justify-content: space-between;
							height: 28px;
						}
					}
				}
			}
		}

		.footer {
			height: 164px;
			background-image: url('@/assets/img/index_bg.png');
			background-size: cover;
			background-position: center bottom;

			&-wrapper {
				height: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				color: #fff;
				font-size: 14px;
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
		padding: 0;
		width: 877px;
		display: flex;
	}

}</style>