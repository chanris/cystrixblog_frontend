<template>
	<div class="container">
		<div class="top">
			<div>
				<el-tag v-if="isPublish" type="success" effect="dark" round>已发布</el-tag>
				<el-tag v-else type="warning" effect="dark" round>未发布</el-tag>
			</div>
			<div style="display: flex; align-items: center;">
				<span style="width: 37px;">标题：</span>
				<el-input
					v-model.trim="article.title"
					clearable
					type="input"
					placeholder="文章标签"
					maxlength="30"
					style="width: 260px;"
				/>
			</div>
			<div style="display: flex; align-items: center;">
				<span style="width: 37px;">摘要：</span>
				<el-input
					v-model.trim="article.digest"
					:autosize="{ minRows: 1, maxRows: 4 }"
					resize="none"
					clearable
					type="textarea"
					placeholder="文章摘要（限量两百字）"
					maxlength="200"
					style="width: 300px;"
				/>
			</div>
			<div style="display: flex; align-items: center;"> 
				<span style="width: 45px;">标签：</span>
				<el-select v-model="tagVal" 
					v-loading="tagLoading"
					@change="tagChange"
					@remove-tag="tagRemove"
					@blur="submitTagChange"
					multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
					placeholder="请选择标签" style="width: 240px">
					<el-option v-for="item in tagList" :key="item.value" :label="item.name" :value="item.id" />

					<template #footer>
						<el-button v-if="!isAddTag" text bg size="small" @click="isAddTag = true">
							新建标签
						</el-button>
						<template v-else>
							<el-input style="margin-bottom: 10px;" v-model="tagName" class="option-input"
								placeholder="请输入标签名称" size="small" />
							<el-button type="primary" size="small" @click="confirmTag">添加</el-button>
							<el-button size="small" @click="clear">取消</el-button>
						</template>
					</template>
				</el-select>
			</div>
			<div>
				<span>分类：</span>
				<el-tree-select
					v-loading="cateLoading"
					placeholder="请选择分类"
					v-model="cateVal"
					:data="categoryList"
					check-strictly
					:render-after-expand="false"
					show-checkbox/>
			</div>
			<div>
				<el-button plain color="#626aef" @click="() => {isEdit = !isEdit; isPublish = false}">编辑</el-button>
				<el-button type="primary" @click="saveUpdate">保存</el-button>
			</div>
		</div>
		<div class="content">
			<v-md-editor v-if="isEdit" v-loading="articleLoading"  v-model="article.content" height="790px"></v-md-editor>
			<v-md-preview v-else  v-loading="articleLoading" :text="article.content" height="790px" ></v-md-preview>
		</div>
	</div>
</template>
<script setup>
import {ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _getArticleDetail,  _updateArticleDetail} from '@/api/article.js'
import { _categoryTree, _getCategoryByArticleId, _updateCategoryRef } from '@/api/category.js'
import { _getAllTagList, _createTag, _getTagListByArticleId, 
	_deleteRef, _batchAddRef } from '@/api/tag.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

onMounted(()=>{
	if(route.params.id) {
		getArticleDetail({id: route.params.id})
		categoryTree({id: 1})
		getAllTagList()
	}else {
		router.push('/admin')
	}
})


// 文章
const isEdit =  ref(false)
const isPublish = ref(true)
const articleLoading = ref(false)
const article = ref({
	content: '',
	digest: '',
	title: ''
})
const getArticleDetail = (params) => {
	articleLoading.value = true
	_getArticleDetail(params).then(({result})=>{
		article.value = result
	}).finally(()=>{
		articleLoading.value = false
	})
}
const updateArticleDetail = (params) => {
	_updateArticleDetail(params).then((resp)=>{
		if(resp.code === 200) {
			ElMessage({
				type: 'success',
				message: '更新成功'
			})
			isPublish.value = true
		}
	})
}
const saveUpdate = () => {
	updateArticleDetail(article.value)
}
watch(()=>article.value.title, (val, oldVal)=>{
	if(val && oldVal !== '') {
		isPublish.value = false
	}
})
watch(()=>article.value.digest, (val, oldVal)=>{
	if(val && oldVal !== '') {
		isPublish.value = false
	}
})

// 分类
const cateLoading = ref(false)
const cateVal = ref('')
const categoryList = ref([])
const getCategoryByArticleId = (params) => {
	_getCategoryByArticleId(params).then((resp)=>{
		if(resp.code === 200) {
			cateVal.value = '' + resp.result.id
		}
	})
}
const categoryTree = (params) => {
	cateLoading.value = true
	_categoryTree(params).then((resp)=>{
		if(resp.code === 200) {
			categoryList.value.push(resp.result) 
		}
	}).finally(()=>{
		cateLoading.value = false
		getCategoryByArticleId({id: parseInt(route.params.id)})
	})
}
const updateCategoryRef = (params) => {
	_updateCategoryRef(params).then((resp)=>{
		if(resp.code === 200) {
			ElMessage({
				type: 'success',
				message: '更新成功'
			})
		}
	})
}
watch(() => cateVal.value, (val, oldVal)=>{
	if(val && oldVal !== '') {
		updateCategoryRef({articleId: parseInt(route.params.id), categoryId: parseInt(val)})
	}
})

// 标签
const tagLoading = ref(false)
const isAddTag = ref(false)
const tagVal = ref([])
const tagOriginVal = ref(new Set())
const addTagIds = ref([])
const tagName = ref('')
const tagList = ref([])
const getAllTagList = () => {
	tagLoading.value = true
	_getAllTagList().then(({result})=>{
		tagList.value = result
		getTagListByArticle({id: route.params.id})
	}).finally(()=>{
		tagLoading.value = false
	})
}
const getTagListByArticle = (params) => {
	_getTagListByArticleId(params).then((resp)=>{
		if(resp.code === 200) {
			for(let item of resp.result) {
				tagVal.value.push(item.id)
				tagOriginVal.value.add(item.id)
			}
		}else {
			ElMessage({
				type: 'error',
				message: resp.msg
			})
		}
	})
}
const confirmTag = () => {
	if (tagName.value) {
		let name = tagName.value
		_createTag({name: tagName.value}).then((resp)=>{
			if(resp.code === 200) {
				tagList.value.push({id: resp.result, name})
				ElMessage({
					type:'success',
					message: '添加成功'
				})
			}
		})
		clear()
	}else {
		ElMessage({
			type:'error',
			message: '标签名称不能为空'
		})
	}
}

const clear = () => {
	tagName.value = ''
	isAddTag.value = false
}
const tagChange = (tagIds)=>{
	let ids = tagIds.filter(item => !tagOriginVal.value.has(item))
	if(ids.length) {
		addTagIds.value = ids
	}
}
const submitTagChange = () => {
	if(addTagIds.value.length) {
		let params = []
		addTagIds.value.forEach(id => {
			params.push({tagId: id, articleId: parseInt(route.params.id)})
		})
		batchAddTagRef(params)
	}
}
const tagRemove = (tagId) => {
	deleteRef({articleId: parseInt(route.params.id), tagId})
}
const deleteRef = (params) => {
	_deleteRef(params).then((resp)=>{
		if(resp.code === 200) {
			ElMessage({
				type: 'success',
				message: '删除成功'
			})
		}
	})
}
const batchAddTagRef = (params) => {
	_batchAddRef(params).then((resp)=>{
		if(resp.code === 200) {
			// 刷新文章标签 关联
			getTagListByArticle({id: route.params.id})
			ElMessage({
				type: 'success',
				message: '添加成功'
			})
		}
	}).finally(()=>{
		addTagIds.value = []
	})
}


</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	.top {
		// position: fixed;
		// z-index: 2;
		// width: 1567px;
		display: flex; 
		justify-content: space-between;
		align-items: center;
		padding: 10px 10px;
		margin-bottom: 10px;
		background: #fff;
	}
	.content {
		// position: relative;
		// bottom: -100px;
		// margin-top: 20px;
		background-color: #fff;
		
	}
}
</style>