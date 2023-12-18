<template>
	<div class="wrapper">
		<NavigateBar></NavigateBar>
		<div class="title-box"></div>
		<div class="main">
			<div class="content-box">
				<el-row>
					<el-col :span="18" class="post-wrapper"></el-col>
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
		</div>
	</div>
</template>
<script setup>
import NavigateBar from '@/components/NavigateBar.vue'
</script>
<style lang="scss" scoped>
.wrapper {
	.title-box {
		height: 400px;
		background-color: lightcoral;
	}
	.main {
		.content-box {
			margin: 0 auto;
			max-width: 1200px;
			background-color: lightblue;
			.card-box {
				margin-bottom: 20px;
			}
		}
	}
}
</style>