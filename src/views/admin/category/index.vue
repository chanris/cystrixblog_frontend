<template>
	<div class="container">
		<el-tree :data="dataSource" 
		show-checkbox 
		node-key="id" 
		default-expand-all 
		:expand-on-click-node="false">
			<template #default="{ node, data }">
				<span class="custom-tree-node">
					<span>{{ node.label }}</span>
					<span>
						<a @click="append(data)"> 添加 </a>
						<a style="margin-left: 8px" @click="remove(node, data)"> 删除 </a>
					</span>
				</span>
			</template>
		</el-tree>
	</div>
</template>
<script setup>
import { ref } from 'vue'
let id = 1000

const append = (data) => {
	const newChild = { id: id++, label: 'testtest', children: [] }
	if (!data.children) {
		data.children = []
	}
	data.children.push(newChild)
	dataSource.value = [...dataSource.value]
}

const remove = (node, data) => {
	const parent = node.parent
	const children = parent.data.children || parent.data
	const index = children.findIndex((d) => d.id === data.id)
	children.splice(index, 1)
	dataSource.value = [...dataSource.value]
}

const dataSource = ref([
	{
		id: 1,
		label: 'Level one 1',
		children: [
			{
				id: 4,
				label: 'Level two 1-1',
				children: [
					{
						id: 9,
						label: 'Level three 1-1-1',
					},
					{
						id: 10,
						label: 'Level three 1-1-2',
					},
				],
			},
		],
	},
	{
		id: 2,
		label: 'Level one 2',
		children: [
			{
				id: 5,
				label: 'Level two 2-1',
			},
			{
				id: 6,
				label: 'Level two 2-2',
			},
		],
	},
	{
		id: 3,
		label: 'Level one 3',
		children: [
			{
				id: 7,
				label: 'Level two 3-1',
			},
			{
				id: 8,
				label: 'Level two 3-2',
			},
		],
	},
])
</script>
<style lang="scss" scoped>
.container {

}
.custom-tree-node {
	font-size: 20px;
	font-weight: 600;
}
</style>