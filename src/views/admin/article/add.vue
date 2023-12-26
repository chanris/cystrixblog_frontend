<template>
	<div class="box">
		<div class="form">
			<div style="display: flex; align-items: center;"> <span style="width: 70px;">文章名称：</span>
				<el-input style="width: 200px;" v-model="title" placeholder="请输入文章名称" clearable></el-input>
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
				<el-select v-model="value4" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
					placeholder="请选择标签" style="width: 240px">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />

					<template #footer>
						<el-button v-if="!isAddTag" text bg size="small" @click="isAddTag = true">
							新建标签
						</el-button>
						<template v-else>
							<el-input style="margin-bottom: 10px;" v-model="tagName" class="option-input"
								placeholder="请输入新标签名称" size="small" />
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
					v-model="value"
					:data="data"
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

import { ref } from 'vue'
const content = ref('')
const title = ref('')
const digest = ref('')
const isAddTag = ref(false)
const value4 = ref([])
const tagName = ref('')

const clear = () => {
	tagName.value = ''
	isAddTag.value = false
}
const options = ref([
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

const value = ref()

const data = [
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
		options.value.push({
			label: tagName.value,
			value: tagName.value,
		})
		clear()
	}
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