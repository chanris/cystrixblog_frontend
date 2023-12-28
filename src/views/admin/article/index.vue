<template>
	<div class="container">
		<div class="search"  >
			<el-form :model="searchData" label-width="80px" :inline="true">
				<el-form-item label="文章名称">
					<el-input v-model="searchData.title" />
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
					<el-button type="primary" style="height: 40px;" @click="doSearch">搜索</el-button>
					<el-button style="height: 40px;" @click="resetSearch">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list">
			<div style="padding: 20px; border-bottom: 1px solid rgb(235, 238, 245);">
				<el-button type="primary" style="height: 40px;" @click="goArticleAdd">添加文章</el-button>
			</div>
			<el-table v-loading="loading" :data="articleList" style="width: 100%">
				<el-table-column fixed prop="index" label="序号" min-width="80" >
					<template #default="scope">
						<div>
							{{ (indexCoordinate.pageNum - 1) * indexCoordinate.pageSize + scope.$index + 1}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="文章名称" min-width="120" />
				<!-- <el-table-column prop="digest" label="摘要" min-width="200" /> -->
				<el-table-column prop="wordNum" label="文章字数" min-width="120" />
				<el-table-column prop="viewCount" label="浏览量" min-width="100" />
				<el-table-column prop="likeCount" label="点赞数" min-width="100" />
				<el-table-column prop="createTime" label="发布日期" min-width="100" />
				<el-table-column prop="updateTime" label="更新日期" min-width="100" />
				<!-- <el-table-column prop="address" label="热度排名" min-width="100" /> -->
				<el-table-column fixed="right" label="操作" min-width="60">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="goArticleDetail(scope.row)">详情</el-button>
						<el-popconfirm title="确定要删除该文章？" 
						@confirm="delConfirm(scope.row)" 
						cancel-button-text="取消" 
						confirm-button-text="删除"
						confirm-button-type="danger">
							<template #reference>
								<el-button link type="danger" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination v-if="articleList" background layout="prev, pager, next" :total="pageInfo.total" v-model:page-size="pageInfo.pageSize" v-model:current-page="pageInfo.pageNum"   hide-on-single-page />
			</div>
		</div>
		
	</div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch} from 'vue'
import { useRouter } from 'vue-router'
import { _getArticleList, _removeArticle } from '@/api/article.js'
import { parseTime } from '@/utils/format.js'

const loading = ref(false)

const removeArticle = (params) => {
	_removeArticle(params).then((res)=>{
		if(res.code === 200) {
			ElMessage({
				type: 'success',
				message: '文章已删除'
			})
		}
	}).finally(()=>{
		getArticleList({...searchData.value, ...pageInfo.value})
	})
}
const delConfirm = (item) => {
	removeArticle({id: item.id})
}

const searchData =  ref({
	title: '',
	timeRange: '',
	startTime: '',
	endTime: ''
})

watch(searchData.value, (val, oldVal)=>{
	if(val.timeRange) {
		val.startTime = parseTime(val.timeRange[0]) 
		val.endTime = parseTime(val.timeRange[1]) 
	}else {
		val.startTime = ''
		val.endTime = ''
	}
})

const doSearch = () => {
	getArticleList({...searchData.value})
}
const resetSearch = () => {
	searchData.value.title = ''
	searchData.value.timeRange = ''
	getArticleList({})
}

const pageInfo = ref({
	pageNum: 1,
	pageSize: 10,
	total: 0
})
const indexCoordinate = ref({
	pageNum: 1,
	pageSize: 10,
})

watch([()=>pageInfo.value.pageNum, ()=>pageInfo.value.pageSize], 
	([pageNum, pageSize], [oldPageNum, oldPageSize]) => {
		// todo 23/12/29 为什么每次监听 pageNum === oldPageNum ?
		// console.log(`admin pageInfo watch is triggered. val:`, pageNum, 'oldVal', pageNum)
		getArticleList({...searchData.value, ...pageInfo.value})
})


const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
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

const articleList = ref([])

onMounted(()=>{
	getArticleList({...searchData.value, ...pageInfo.value})
})

const getArticleList = (params) => {
	loading.value = true
	_getArticleList(params).then(({result})=>{
		articleList.value = result.list
		pageInfo.value.total = result.total
		pageInfo.value.pageNum = result.pageNum
		pageInfo.value.pageSize = result.pageSize
		indexCoordinate.value.pageNum = result.pageNum
		indexCoordinate.value.pageSize = result.pageSize
	}).finally(()=>{
		loading.value = false
	})
}

const router = useRouter()
const goArticleDetail = (item) => {
	router.push({
		path: '/admin/article/detail',
		name: 'adminArtileDetail',
		params: {id: item.id}
	})
}
const goArticleAdd = () => {
	router.push({name: 'adminArticleAdd'})
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