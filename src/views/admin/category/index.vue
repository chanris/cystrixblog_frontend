<template>
	<div class="container">
		<el-tree v-loading="loading" style="width: 800px;" :data="cateTree" show-checkbox node-key="categoryTree" default-expand-all :expand-on-click-node="false">
			<template #default="{ node, data }">
				<span class="custom-tree-node">
					<span>{{ node.label }}</span>
					<span style="font-weight: 500; margin-left: 200px;">
						<a @click="append(data)" style="color: red;"> 添加 </a>
						<a style="margin-left: 8px; color: blue;" @click="remove(node, data)"> 删除 </a>
					</span>
				</span>
			</template>
		</el-tree>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { _categoryTree, _addCategory, _removeCategory } from '@/api/category.js'
import { ElMessage, ElMessageBox } from 'element-plus'

onMounted(() => {
	getCategoryTree({ id: 1 })
})

const cateTree = ref([])
const loading = ref(false)
const getCategoryTree = (params) => {
	loading.value = true
	_categoryTree(params).then(({ result }) => {
		cateTree.value.push(result)
	}).finally(()=>{
		loading.value = false
	})
}
const append = (data) => {
	ElMessageBox.prompt('请输入标签名称', '添加标签', {
		confirmButtonText: '添加',
		cancelButtonText: '取消',
		inputPattern: /.+/,
		inputErrorMessage: '名称不能为空',
	}).then(({ value }) => {
		const newChild = {label: value, children: []}
		if (!data.children) {
			data.children = []
		}
		let params = {name: value, pid: data.id}
		_addCategory(params).then(({result})=>{
			// 现在能触发这个函数，那么入参必为正常返回的数据 即 resp === {code: 200, msg: 'xxx', [result: {}]}
			newChild.id = result
			data.children.push(newChild)
			cateTree.value = [...cateTree.value]
			ElMessage({
				type: 'success',
				message: '添加成功'
			})
		})
	}).catch(() => {})
}

const remove = (node, data) => {
	ElMessageBox.confirm(
    '你确定要删除该分类?',
    '删除分类',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    })
    .then(() => {
		_removeCategory({id: data.id}).then(()=>{
			const parent = node.parent
			const children = parent.data.children || parent.data
			const index = children.findIndex((d) => d.id === data.id)
			children.splice(index, 1)
			cateTree.value = [...cateTree.value]
			ElMessage({
				type: 'success',
				message: '删除成功'
			})
		})
    }).catch((action) => {})
	
}
</script>
<style lang="scss" scoped>
.container {
	background: #fff;
	padding: 20px 20px;
}

.custom-tree-node {
	font-size: 20px;
	font-weight: 600;
}
</style>