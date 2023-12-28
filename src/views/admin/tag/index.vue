<template>
	<div class="box">
		<div style="height: 50px; background-color: #fff; margin-bottom: 20px; display: flex; align-items: center; padding-left: 10px;">
			<el-button type="primary" @click="addVisible = true">新增</el-button>
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
					<template #default="scope">
						<el-popconfirm title="确定要删除该文标签？" 
						@confirm="delTag(scope.row)" 
						cancel-button-text="取消" 
						confirm-button-text="删除"
						confirm-button-type="danger">
							<template #reference>
								<el-button link type="danger" size="small" >删除</el-button>
							</template>
						</el-popconfirm>
						<el-button link type="primary" size="small" @click="updateTag(scope.row)">修改</el-button>
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
		
		<el-dialog  v-model="addVisible" title="添加标签"  style="width: 600px;">
			<el-form ref="addFrom" :model="formData" :rules="addFormRules">
				<el-form-item label="标签名称" label-width="120" prop="name">
					<el-input v-model.trim="formData.name" autocomplete="off" />
				</el-form-item>
			</el-form>
			<template #footer>
			<span class="dialog-footer">
				<el-button @click="addVisible = false">取消</el-button>
				<el-button type="primary" @click="createTag(addFrom)">添加</el-button>
			</span>
			</template>
		</el-dialog>

		<el-dialog v-model="updateVisible" title="更新标签" style="width: 600px;">
			<el-form ref="updateForm" :model="updateData" :rules="updateFormRules" >
				<el-form-item label="标签名称" label-width="120" prop="name">
					<el-input v-model.trim="updateData.name"/>
				</el-form-item>
			</el-form>
			<template #footer>
			<span class="dialog-footer">
				<el-button @click="updateVisible = false">取消</el-button>
				<el-button type="primary" @click="renameTag(updateForm)">更新</el-button>
			</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import { _getTagListWithPage, _deleteTag, _updateTag, _createTag } from '@/api/tag.js'
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch } from 'vue'

// 标签列表
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
	getTagList({...pageInfo.value})
})

// 添加标签 dialog
const addVisible = ref(false)
const formData = ref({
	name: ''
})

// 删除标签
const delTag = (row) => {
	_deleteTag({id: row.id}).then(()=>{
		// 刷新列表
		getTagList({})
		ElMessage({
			type: 'success',
			message: '删除成功'
		})
	})
}
//更新标签
const updateData = ref({
	name: '',
	id: ''
})
const updateForm = ref()
const updateVisible = ref(false)
const updateFormRules = ref({
	name: [
		{ required: true, message: '请输入标签名称', trigger: 'blur' },
		{ min: 2, max: 20, message: '名称长度不小于2不大于20', trigger: 'blur' },
	],
})
const updateTag = (row) => {
	updateVisible.value = true
	updateData.value.id = row.id
	updateData.value.name = row.name
}
const renameTag = (formEl) => {
	if(!formEl) return 
	formEl.validate((valid)=>{
		if(valid){
			_updateTag(updateData.value).then(()=>{
				ElMessage({
					type: 'success',
					message: '更新成功'
				})
				getTagList({})
			}).finally(()=>{
				updateData.value.name = ''
				updateData.value.id = ''
				updateVisible.value = false
			})
		}
	})

	
}
// 创建标签
const addFrom = ref()
const addFormRules = ref({
	name: [
		{ required: true, message: '请输入标签名称', trigger: 'blur' },
		{ min: 2, max: 20, message: '名称长度不小于2不大于20', trigger: 'blur' },
	],
})
const createTag = (formEL) => {

	if(!formEL) return 
	formEL.validate((valid)=>{
		if(valid) {
			_createTag({name: formData.value.name}).then(()=>{
				ElMessage({
					type: 'success',
					message: '添加成功'
				})
				getTagList({})
			}).finally(()=>{
				formData.value.name = ''
				addVisible.value = false
			})
		}
	})
	
}
</script>
<style lang="scss" scoped>
.box {
	.page {
		margin: 20px auto;
	}
}
</style>