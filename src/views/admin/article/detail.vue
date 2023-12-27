<template>
	<div class="container">
		<div class="top">
			<div>
				<el-button type="success" v-if="isPublish">已发布</el-button>
				<el-button type="warning" v-else >未发布</el-button>
			</div>
			<div style="display: flex; align-items: center;">
				<span style="width: 37px;">摘要：</span>
				<el-input
					v-model="digest"
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
					multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
					placeholder="请选择标签" style="width: 240px">
					<el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value" />

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
				<el-button type="primary">保存</el-button>
			</div>
		</div>
		<div class="content">
			<v-md-editor v-if="isEdit" v-loading="articleLoading"  v-model="article.content" height="790px"></v-md-editor>
			<v-md-preview v-else  v-loading="articleLoading" :text="article.content" height="790px" ></v-md-preview>
		</div>
	</div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {_getArticleDetail} from '@/api/article.js'
import { _categoryTree } from '@/api/category.js'
import { _getAllTagList, _createTag } from '@/api/tag.js'

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


// 文章名称
const isEdit =  ref(false)
const isPublish = ref(true)
const articleLoading = ref(false)
const article = ref({
	content: '',
	digest: ''
})
const getArticleDetail = (params) => {
	articleLoading.value = true
	_getArticleDetail(params).then(({result})=>{
		article.value = result
	}).finally(()=>{
		articleLoading.value = false
	})
}

// 分类
const cateLoading = ref(false)
const cateVal = ref()
const categoryList = ref([])
const categoryTree = (params) => {
	cateLoading.value = true
	_categoryTree(params).then((resp)=>{
		if(resp.code === 200) {
			categoryList.value.push(resp.result) 
		}
	}).finally(()=>{
		cateLoading.value = false
	})
}

// 标签
const tagLoading = ref(false)
const isAddTag = ref(false)
const tagVal = ref([])
const tagName = ref('')
const tagList = ref([])
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
			if(resp.code === 200) {
				tagList.value.push({value: resp.result, label: name})
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

</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	.top {
		display: flex; 
		justify-content: space-between;
		align-items: flex-start; 
		padding: 10px 10px;
		margin-bottom: 10px;
		background: #fff;
	}
	.content {
		background-color: #fff;
	}
}
</style>