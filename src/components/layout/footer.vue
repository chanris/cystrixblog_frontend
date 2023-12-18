<template>
	<div class="footer">
		<div class="footer-wrapper">
			<div class="copyright">©2023-2025&nbsp;By&nbsp;Cystrix</div>
			<div>Hi,&nbsp;welcome&nbsp;to&nbsp;cystrix's&nbsp;blog</div>
		</div>
	</div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.footer {
	height: 164px;
	background-image: url('@/assets/img/index_bg.png'); // todo 18/12/23 需要按页面替换
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
</style>