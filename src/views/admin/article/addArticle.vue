<template>
	<div class="container">
		<div style="margin: 0 auto 20px;">
			<el-button type="success">已发布</el-button>
			<el-button type="warning">未发布</el-button>
			<el-button type="primary">编辑</el-button>
		</div>
		<v-md-editor v-model="text" height="790px"></v-md-editor>
	</div>
</template>
<script setup>
import {ref} from 'vue'
const text = ref('')
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
}
</style>