<template>
  <div class="app-container">
    老师添加
    <el-form ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="teacherData.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/teacher'

export default {
  data() {
    return {
      teacherData: {
        name: '',
        id: ''
      }
    }
  },
  created() {
    this.init()
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const ids = this.$route.params.id
        this.thacherInfo(ids)
      } else {
        this.teacherData = {}
      }
    },
    thacherInfo(id) {
      teacher.teacherInfo(id)
        .then(response => {
          this.teacherData = response.data.data
        })
    },
    onSubmit() {
      if (this.teacherData.id) {
        this.updateTeacher()
      } else {
        this.createTeacher()
      }
    },
    createTeacher() {
      teacher.createTeacher(this.teacherData)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/teacher/table' })
        })
    },
    updateTeacher() {
      teacher.updateTeacher(this.$route.params.id, this.teacherData)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/teacher/table' })
        })
    }
  }

}

</script>

