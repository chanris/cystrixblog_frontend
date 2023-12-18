<template>
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
</template>
<script setup>
import timeIcon from '@/assets/svg/time.svg'
</script>
<style lang="scss" scoped>
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
</style>