<template>
  <div class="app-container">
    老师列表
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="eduTeacherVO.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-serach" @click="getTeacherList()">搜索</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      border
      fit
      highlight-current-row>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="'/teacher/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-serach" @click="detete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="currentLimit"
      :total="total"
      style="text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getTeacherList"
    >
    </el-pagination>
  </div>
</template>

<script>
import teacher from '@/api/teacher'

export default {
  data() {
    return {
      list: null,
      currentPage: 1,
      currentLimit: 5,
      total: 0,
      eduTeacherVO: {
        name: ''
      }
    }
  },
  created() {
    this.getTeacherList()
  },
  methods: {
    getTeacherList(page = this.currentPage, limit = this.currentLimit, query = this.eduTeacherVO) {
      teacher.teacherList(page, limit, query)
        .then(response => {
          this.list = response.data.data
          this.total = response.data.total
        })
        .cache(error => {
          console.log(error)
        })
    },
    resetData() {
      this.eduTeacherVO = {}
      this.getTeacherList()
    },
    detete(id) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.deleteTeacher(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTeacherList(this.currentPage, this.currentLimit, this.eduTeacherVO)
          })
          .cache(error => {
            console.log(error)
          })
      })
    }
  }

}

</script>

