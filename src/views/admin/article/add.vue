<template>
	<div class="box">
		<div class="form">
			<div style="display: flex; align-items: center;"> <span style="width: 70px;">文章名称：</span>
				<el-input style="width: 200px;" maxlength="30" v-model="title" placeholder="请输入文章名称" clearable></el-input>
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
			<div style="display: flex; align-items: center;"> <span style="width: 45px;">标签：</span>
				<el-select v-loading="loading" v-model="tagVal" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
					placeholder="请选择标签" style="width: 240px">
					<el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value" />

					<template #footer>
						<el-button v-if="!isAddTag" text bg size="small" @click="isAddTag = true">
							新建标签
						</el-button>
						<template v-else>
							<el-input style="margin-bottom: 10px;" v-model="tagName"  maxlength="15"
								placeholder="请输入新标签名称" size="small" clearable />
							<el-button type="primary" size="small" @click="confirmTag">添加</el-button>
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
					lazy
					:load="loadCateNode"
					check-strictly
					:render-after-expand="false"
					show-checkbox/>
			</div>
			<el-button type="primary" @click="visible = true">发布</el-button>
		</div>
		<div>
			<v-md-editor v-model="content" height="790px"></v-md-editor>
		</div>
	</div>
</template>
<script setup>
import { _getAllTagList, _createTag } from '@/api/tag.js'
import { ElMessage } from 'element-plus'

import { ref, onMounted } from 'vue'
const content = ref('')
const title = ref('')
const digest = ref('')
const isAddTag = ref(false)
const tagVal = ref([])
const tagName = ref('')
const loading = ref(false)



onMounted(()=>{
	getAllTagList()
})
const tagList = ref([])
const getAllTagList = () => {
	loading.value = true
	_getAllTagList().then(({result})=>{
		tagList.value = result
		tagList.value.forEach(item => {
			item.value = item.id
			item.label = item.name
		})
	}).finally(()=>{
		loading.value = false
	})
}
const confirmTag = () => {
	if (tagName.value) {
		let name = tagName.value
		_createTag({name: tagName.value}).then((resp)=>{
			if(resp.code === 200) {
				// getAllTagList()
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

const loadCateNode = (node, resolve) => {
	if(node.level === 0) {
		return resolve([{ name: '默认分类'}])
	}
	if(node.level > 1) return resolve([])
	setTimeout(()=> {
		const data = []
	}, 500)
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