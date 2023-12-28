<template>
	<div class="box">
		<div style="height: 50px; background-color: #fff; margin-bottom: 20px; display: flex; align-items: center; padding-left: 10px;">
			<el-button type="primary" @click="visible = true">新增</el-button>
		</div >
		<div style="background-color: #fff; display: flex;  flex-direction: column; justify-content: center;">
			<el-table v-loading="loading" :data="tagList" style="width: 100%">
				<el-table-column fixed prop="index" label="序号" min-width="80" >
					<template #default="scope">
						<div>
							{{ (indexCoordinate.pageNum - 1) * indexCoordinate.pageSize + scope.$index + 1}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="标签名称" min-width="120" />
				<el-table-column prop="createTime" label="创建日期" min-width="120" />
				<el-table-column prop="updateTime" label="更新日期" min-width="120" />
				<el-table-column fixed="right" label="操作" min-width="120">
					<template #default>
						<el-button link type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination 
				v-if="tagList && tagList.length > 0" 
				background layout="prev, pager, next" 
				:total="pageInfo.total" 
				v-model:page-size="pageInfo.pageSize" 
				v-model:current-page="pageInfo.pageNum"   
				hide-on-single-page />
			</div>
		</div>
		
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
import { _getTagListWithPage } from '@/api/tag.js'
import { ref, onMounted, watch } from 'vue'

onMounted(()=>{
	getTagList({...pageInfo.value})
})
const loading = ref(false)
const tagList = ref([])
const pageInfo = ref({
	pageNum: 1,
	pageSize: 10,
	total: 0
})
const indexCoordinate = ref({
	pageNum: 1,
	pageSize: 10,
})
const getTagList = (params) => {
	loading.value = true
	_getTagListWithPage(params).then(({result})=>{
		tagList.value = result.list
		indexCoordinate.value.pageNum = result.pageNum
		indexCoordinate.value.pageSize = result.pageSize
		pageInfo.value.pageNum = result.pageNum
		pageInfo.value.pageSize = result.pageSize
		pageInfo.value.total = result.total
	}).finally(()=>{
		loading.value = false
	})
}
watch(pageInfo.value, (val, oldVal) => {
	console.log(val)
	getTagList({...pageInfo.value})
})

// dialog
const visible = ref(false)
const formData = ref({
	name: ''
})
</script>
<style lang="scss" scoped>
.box {
	.page {
		margin: 20px auto;
	}
}
</style>