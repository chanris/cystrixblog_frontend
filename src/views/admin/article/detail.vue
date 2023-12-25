<template>
	<div class="container">
		<div style="display: flex; justify-content: space-between; padding: 0 0 10px; ">
			<div>
				<el-button type="success" v-if="isPublish">已发布</el-button>
				<el-button type="warning" v-else >未发布</el-button>
			</div>
			<div>
				<el-button plain color="#626aef" @click="() => {isEdit = !isEdit; isPublish = false}">编辑</el-button>
				<el-button type="primary">保存</el-button>
			</div>
		</div>
		<div class="content">
			<v-md-editor v-if="isEdit"  v-model="text" height="790px"></v-md-editor>
			<v-md-preview v-else :text="text" height="790px" ></v-md-preview>
		</div>
	</div>
</template>
<script setup>
import {ref} from 'vue'
const text = ref(`
## 你好
`)
const isEdit =  ref(false)
const isPublish = ref(true)

</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	.content {
		background-color: #fff;
	}
}
</style>