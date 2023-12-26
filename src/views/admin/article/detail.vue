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
				<el-select v-model="tagVal" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
					placeholder="请选择标签" style="width: 240px">
					<el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value" />

					<template #footer>
						<el-button v-if="!isAddTag" text bg size="small" @click="isAddTag = true">
							新建标签
						</el-button>
						<template v-else>
							<el-input style="margin-bottom: 10px;" v-model="categoryName" class="option-input"
								placeholder="请输入标签名称" size="small" />
							<el-button type="primary" size="small" @click="confirmCate">添加</el-button>
							<el-button size="small" @click="clear">取消</el-button>
						</template>
					</template>
				</el-select>
			</div>
			<div>
				<span>分类：</span>
				<el-tree-select
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
			<v-md-editor v-if="isEdit"  v-model="content" height="790px"></v-md-editor>
			<v-md-preview v-else :text="content" height="790px" ></v-md-preview>
		</div>
	</div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {_getArticleDetail} from '@/api/article.js'

const isEdit =  ref(false)
const isPublish = ref(true)
const route = useRoute()
const router = useRouter()
const content = ref('')

onMounted(()=>{
	if(route.params.id) {
		getArticleDetail({id: route.params.id})
	}else {
		router.push('/admin')
	}
})

const getArticleDetail = (params) => {
	_getArticleDetail(params).then(({result})=>{
		content.value = result.content
	})
}

const digest = ref('')
const isAddTag = ref(false)
const tagVal = ref([])
const tagName = ref('')

const clear = () => {
	tagName.value = ''
	isAddTag.value = false
}
const tagList = ref([
	{
		value: 'Option1',
		label: 'Java',
	},
	{
		value: 'Option2',
		label: 'C++',
	},
	{
		value: 'Option3',
		label: 'JVM',
	},
	{
		value: 'Option4',
		label: 'SpringBoot',
	},
	{
		value: 'Option5',
		label: 'Java后端',
	},
])

const cateVal = ref()
const categoryList = [
  {
    value: '1',
    label: 'Java后端',
    children: [
      {
        value: '1-1',
        label: 'nosql',
        children: [
          {
            value: '1-1-1',
            label: 'redis',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'spring',
    children: [
      {
        value: '2-1',
        label: 'springboot',
        children: [
          {
            value: '2-1-1',
            label: 'springboot源码解析',
          },
        ],
      },
      {
        value: '2-2',
        label: 'java',
        children: [
          {
            value: '2-2-1',
            label: 'java集合类',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: '关系性数据库',
    children: [
      {
        value: '3-1',
        label: 'mysql5',
        children: [
          {
            value: '3-1-1',
            label: 'mysql5.7',
          },
        ],
      },
      {
        value: '3-2',
        label: 'mysql8',
        children: [
          {
            value: '3-2-1',
            label: 'mysql8.0',
          },
        ],
      },
    ],
  },
]
const confirmTag = () => {
	if (tagName.value) {
		tagList.value.push({
			label: tagName.value,
			value: tagName.value,
		})
		clear()
	}
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