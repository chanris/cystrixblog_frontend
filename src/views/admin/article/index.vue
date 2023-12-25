<template>
	<div class="container">
		<div class="search"  >
			<el-form :model="searchData" label-width="80px" :inline="true">
				<el-form-item label="文章名称">
					<el-input v-model="searchData.name" />
				</el-form-item>
				<el-form-item label="发布日期">
					<el-date-picker 
						style="height: 40px;"
						v-model="searchData.timeRange"
						type="daterange"
						unlink-panels
						range-separator="->"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						:shortcuts="shortcuts"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="height: 40px;">搜索</el-button>
					<el-button style="height: 40px;">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list">
			<div style="padding: 20px; border-bottom: 1px solid rgb(235, 238, 245);">
				<el-button type="primary" style="height: 40px;" @click="addArticle">添加文章</el-button>
			</div>
			<el-table :data="articleList" style="width: 100%">
				<el-table-column fixed prop="index" label="序号" min-width="80" >
					<template #default="scope">
						<div>
							{{ scope.$index }}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="文章名称" min-width="120" />
				<el-table-column prop="digest" label="摘要" min-width="200" />
				<el-table-column prop="wordNum" label="文章字数" min-width="120" />
				<el-table-column prop="visitNum" label="浏览量" min-width="100" />
				<el-table-column prop="likeNum" label="点赞数" min-width="100" />
				<el-table-column prop="publishTime" label="发布日期" min-width="100" />
				<!-- <el-table-column prop="address" label="热度排名" min-width="100" /> -->
				<el-table-column fixed="right" label="操作" min-width="60">
					<template #default="scope">
						<el-button link type="primary" size="small">详情</el-button>
						<el-popconfirm title="确定要删除该文章？" @confirm="delConfirm(scope.row)">
							<template #reference>
								<el-button link type="danger" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination background layout="prev, pager, next" :total="1000" />
			</div>
		</div>
		
	</div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const delConfirm = (scope) => {
	ElMessage({
		type: 'success',
		message: '文章已删除'	
	})
}

const searchData =  ref({
	name: '',
	timeRange: '' 
})

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const articleList = ref([
{
	name: 'JWT的介绍与使用',
	digest: '文章摘要文章摘要文章摘要文章摘要文章摘要。。。',
	wordNum: 100,
	visitNum: 200,
	likeNum: 10,
	publishTime: '2023-10-13 13:20:59'
},
{
	name: 'JWT的介绍与使用',
	digest: '文章摘要文章摘要文章摘要文章摘要文章摘要。。。',
	wordNum: 100,
	visitNum: 200,
	likeNum: 10,
	publishTime: '2023-10-13 13:20:59'
},
{
	name: 'JWT的介绍与使用',
	digest: '文章摘要文章摘要文章摘要文章摘要文章摘要。。。',
	wordNum: 100,
	visitNum: 200,
	likeNum: 10,
	publishTime: '2023-10-13 13:20:59'
}
])
const router = useRouter()
const addArticle = () => {
	router.push({name: 'adminArtileAdd'})
}
</script>
<style lang="scss" scoped>
.container {
	.search {
		height: 40px;
		padding: 20px;
		background-color: #fff;
	}
	.list {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		background-color: #fff;
		width: 100%;
		.page {
			margin: 20px auto 10px; // 上 （左右） 下
		}
	}
}

:deep(.el-form) {
	display: flex;
	justify-content: space-between;
}

:deep(.el-form-item) {
	margin-bottom: 0 !important;
	display: flex;
	align-items: center;
}

:deep(.el-input) {
	height: 40px;
}

:deep(.el-form-item__label) {
	font-size: 14px;
}
:deep(.el-table__row) {
	padding: 12px 0;
	height: 64.4px;
}
</style>