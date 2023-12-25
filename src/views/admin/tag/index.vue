<template>
	<div>
		<div style="height: 50px; background-color: #fff; margin-bottom: 20px; display: flex; align-items: center; padding-left: 10px;">
			<el-button type="primary" @click="visible = true">新增</el-button>
		</div >
		<el-table :data="tableData" style="width: 100%">
			<el-table-column fixed prop="index" label="序号" min-width="80" />
			<el-table-column prop="name" label="标签名称" min-width="120" />
			<el-table-column prop="createTime" label="创建日期" min-width="120" />
			<el-table-column fixed="right" label="操作" min-width="120">
				<template #default>
					<el-button link type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-model="visible" title="添加标签" style="width: 600px;">
			<el-form :model="formData">
				<el-form-item label="标签名称" label-width="120">
					<el-input v-model="formData.name" autocomplete="off" />
				</el-form-item>
			</el-form>
			<template #footer>
			<span class="dialog-footer">
				<el-button @click="visible = false">取消</el-button>
				<el-button type="primary" @click="visible = false">添加</el-button>
			</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import { ref } from 'vue'
const tableData = [
	{
		name: 'java',
		createTime: '2023-10-10 22:11:21'
	}
]
const visible = ref(false)
const formData = ref({
	name: ''
})
</script>
<style lang="scss" scoped></style>