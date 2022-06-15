<template>
  <div class="app-container">
    老师添加
    <el-form ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="teacherData.name" placeholder="名称"></el-input>
      </el-form-item>


      <el-form-item label="图片">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacherData.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/oss/ossFile'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
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
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: {
    ImageCropper,
    PanThumb
  },
  data() {
    return {
      teacherData: {
        name: '',
        id: '',
        avatar: ''
      },
      imagecropperKey: 0,
      imagecropperShow: false,
      BASE_API: process.env.VUE_APP_BASE_API
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
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.teacherData.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
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

