<template>
	<div class="container">
		<div class="hd-box" v-show="isHdBoxVisible">
			<div class="hd-box__left">
				Cystrix's blog
			</div>
			<div class="hd-box__right">
				<div class="item">
					<HomeFilled style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 首页
				</div>
				<div class="item" style="margin-right: 10px;">
					<Suitcase style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 时间轴
				</div>
				<div class="item">
					<PriceTag style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 标签
				</div>
				<div class="item">
					<FolderOpened style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 分类
				</div>
				<div class="item">
					<ChatLineSquare style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 清单
				</div>
				<div class="item">
					<Paperclip style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 友链
				</div>
				<div class="item">
					<Apple style="width: 1.2em; height: 1.2em; margin-right: 5px;" /> 关于
				</div>
			</div>
		</div>
		<div class="arrowdown-box" @click="scrollToContent">
			<ArrowDownBold style="width: 1em; height: 1em;" />
		</div>
		<div class="main">
			<div class="content-box">
				<el-row :gutter="20">
					<el-col :span="18" class="post-wrapper">
						<el-card style="height: 280px;">
						</el-card>

						<div class="page-wrapper">
							<el-pagination :hide-on-single-page="true" background  layout="prev, pager, next" :total="50" />
						</div>
					</el-col>
					<el-col :span="6">
						<el-card class="card-box" style="height: 360px;">
							<div class="user-wrapper">
								<el-avatar 
								shape="circle" 
								:size="110"  
								:src="defaultAvatar" 
								fit="fill"
								@mouseover="rotateClockwise" 
  								@mouseleave="rotateCounterclockwise"/>
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
								<div class="user-followme"> <el-image :src="githubWhiteIcon" style="height: 20px; width: 20px; margin-right: 5px;"/> Follow Me</div>
								<div style="margin-top: 20px; display: flex; justify-content: center; align-items: center;"> 
									<el-image :src="githubIcon" style="height: 20px; width: 20px;"></el-image> 
									<div style="width: 20px;"></div>
									<el-image :src="emailIcon" style="height: 20px; width: 20px; "></el-image>
								</div>
							</div>
						</el-card>

						<el-card class="card-box" style="height: 108px;">
							公告
						</el-card>
						<el-card class="card-box" style="height: 430px;">
							最新文章
						</el-card>
						<el-card class="card-box" style="height: 284px;">
							标签
						</el-card>
						<el-card class="card-box" style="height: 215px;">
							归档
						</el-card>
						<el-card class="card-box" style="height: 259px;">
							网站资讯
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
import { onMounted, ref } from 'vue'
import defaultAvatar from  '@/assets/img/default_avatar.jpg'
import githubWhiteIcon from '@/assets/svg/github-white.svg'
import githubIcon from '@/assets/svg/github.svg'
import emailIcon from '@/assets/svg/email.svg'

// 滚动条设置
let lastScrollPosition = 0
const isHdBoxVisible = ref(true)

onMounted(() => {
	window.scrollTo({ top: 0 })
	window.addEventListener('scroll', handleScroll)
})

const scrollToContent = function () {
	const contentBoxHeight = document.querySelector('.content-box').offsetTop;
	window.scrollTo({
		top: contentBoxHeight + window.innerHeight,
		behavior: 'smooth'
	})
}

const handleScroll = () => {
	const newScrollPosition = window.scrollY
	if (newScrollPosition < lastScrollPosition) {
		isHdBoxVisible.value = true
	} else {
		isHdBoxVisible.value = false
	}
	lastScrollPosition = newScrollPosition
}

// 用户头像旋转
const rotateClockwise = () => {
  const avatar = document.querySelector('.el-avatar');
  avatar.style.transform = 'rotate(360deg)';
}

const rotateCounterclockwise = () => {
  const avatar = document.querySelector('.el-avatar');
  avatar.style.transform = 'rotate(-360deg)';
}

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

@keyframes fadeIn {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
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

.el-avatar {
  transition: transform 0.7s ease-in-out;
}
.el-avatar:hover {
	transform: rotate(360deg);
}

.container {
	height: 100vh;
	width: 100%;
	background-image: url('@/assets/img/index_bg.png');
	background-size: cover;
	background-position: center;
	background-attachment: fixed;

	.hd-box {
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		top: 0;
		width: 100%;
		height: 60px;
		padding: 0 36px;
		background-color: transparent;
		color: #fff;
		animation: fadeIn 1s ease-in-out, slideDown 1s ease-in-out;

		&__left {
			font-size: 18.2px;
			font-weight: 700;
		}

		&__right {
			display: flex;
			justify-content: flex-end;
			padding-right: 46px;
			align-items: center;
			font-size: 14.2px;

			.item {
				display: flex;
				cursor: pointer;
				align-items: center;
				width: 70px;
			}
		}
	}

	.arrowdown-box {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 25px;
		color: #fff;
		animation: bounce 1.5s infinite;
	}

	.main {
		position: relative;
		top: 100vh;
		width: 100%;
		min-height: 100vh;
		background-color: #fff;
		.content-box {
			padding-top: 20px;
			max-width: 1200px;
			margin: 0 auto;

			.post-wrapper {
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
}</style>