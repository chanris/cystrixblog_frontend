<template>
	<div class="box">
		<div class="form">
			<div style="display: flex; align-items: center;"> <span style="width: 70px;">文章名称：</span>
				<el-input style="width: 200px;" maxlength="30" v-model.trim="article.title" placeholder="请输入文章名称" clearable></el-input>
			</div>
			<div style="display: flex; align-items: center;">
				<span style="width: 37px;">摘要：</span>
				<el-input
					v-model.trim="article.digest"
					:autosize="{ minRows: 1, maxRows: 4 }"
					resize="none"
					clearable
					type="textarea"
					placeholder="文章摘要（限两百字）"
					maxlength="200"
					style="width: 300px;"
				/>
			</div>
			<div style="display: flex; align-items: center;"> <span style="width: 45px;">标签：</span>
				<el-select v-loading="tagLoading" v-model="article.tagIdList" 
				multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
					placeholder="请选择标签" style="width: 240px">
					<el-option v-for="item in tagList" :key="item.value" :label="item.name" :value="item.id" />
					<template #footer>
						<el-button v-if="!isAddTag" text bg size="small" @click="isAddTag = true">
							新建标签
						</el-button>
						<template v-else>
							<el-input style="margin-bottom: 10px;" v-model="tagName"  maxlength="15"
								placeholder="请输入标签名称" size="small" clearable />
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
					v-model="article.categoryId"
					:data="categoryList"
					check-strictly
					:render-after-expand="false"
					show-checkbox/>
			</div>
			<el-button type="primary" @click="publishArticle">发布</el-button>
		</div>
		<div>
			<v-md-editor v-model.trim="article.content" height="790px"></v-md-editor>
		</div>
	</div>
</template>
<script setup>
import { _createArticle } from '@/api/article.js'
import { _getAllTagList, _createTag } from '@/api/tag.js'
import { _getCategoryByArticleId, _updateCategoryRef, _categoryTree } from '@/api/category.js'
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const article = ref({
	content: '',
	title: '',
	digest: '',
	tagIdList: [],
	categoryId: ''
})
const addArticle = (params) => {
	_createArticle(params).then(()=>{
		ElMessage({
			type: 'success',
			message: '添加成功'
		})
		router.push({name: 'adminArticle'})
	})
}
const publishArticle = () => {
	if(article.value.content === '') {
		ElMessage({
			type: 'error',
			message: '文章内容不能为空'
		})
		return
	}else if(article.value.title === '') {
		ElMessage({
			type: 'error',
			message: '文章标题不能为空'
		})
		return
	}else if(article.value.digest === '') {
		ElMessage({
			type: 'error',
			message: '文章摘要不能为空'
		})
		return
	}else {
		addArticle(article.value)
	}
	
}

//标签
onMounted(()=>{
	getAllTagList()
})
const tagList = ref([])
const isAddTag = ref(false)
const tagName = ref('')
const tagLoading = ref(false)
const getAllTagList = () => {
	tagLoading.value = true
	_getAllTagList().then(({result})=>{
		tagList.value = result
		tagList.value.forEach(item => {
			item.value = item.id
			item.label = item.name
		})
	}).finally(()=>{
		tagLoading.value = false
	})
}
const confirmTag = () => {
	if (tagName.value) {
		let name = tagName.value
		_createTag({name: tagName.value}).then((resp)=>{
			tagList.value.push({id: resp.result, name})
			ElMessage({
				type:'success',
				message: '添加成功'
			})
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

//分类：
const cateLoading = ref(false)
const categoryList = ref([])
onMounted(()=>{
	categoryTree({id: 1})
})
const categoryTree = (params) => {
	cateLoading.value = true
	_categoryTree(params).then(({result})=>{
		categoryList.value.push(result) 
	}).finally(()=>{
		cateLoading.value = false
	})
}
</script>
<style lang="scss" scoped>
.box {
	.form {
		box-sizing: border-box;
		padding: 20px 20px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start; 
		margin: 0 0 10px;
		background-color: #fff;
	}
}
</style>