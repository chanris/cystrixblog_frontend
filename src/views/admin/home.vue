<template>
	<div class="box">
		<div class="top">
			<div class="left">
				<el-image style="height: 50px; width: 50px;"></el-image>
				Cystrix Blog后台管理系统
			</div>
			<div class="right">
				<el-image style="height: 30px; width: 30px;"></el-image>
				<span>xxx，你好</span>
			</div>
		</div>
		<div class="main">
			<div class="sidebar"></div>
			<div class="content-box">
				<div class="crumb"></div>
				<div class="content">
					<div style="height: 100vh; background-color: lightcyan;"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.box {
	background-color: rgb(240, 245, 249);
	.top {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		height: 64px;
		background-color: #1790E8;
		padding: 0 20px;
		.left {
			display: flex;
			align-items: center;
			font-size: 20px;
			font-weight: 700;
			color: #fff;
		}
		.right {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
	.main {
		display: flex;
		height: calc(100vh - 64px);
		.sidebar {
			width: 245px;
			height: calc(100vh - 64px);
			background-color: #fff;
		}
		.content-box {
			box-sizing: border-box;
			padding: 0 20px 20px 20px;
			width: 1620px;
			.crumb {
				height: 50px;
				width: 100%;
				background: pink;
			}
			.content {
				width: 100%;
				height: calc(100vh - 134px);
				background-color: #fff;
				overflow-y: scroll
			}
		}
		
	}
	
	
}
</style>