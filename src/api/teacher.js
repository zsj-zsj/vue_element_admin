import request from '@/utils/request'

export default {
  teacherList(page, limit, teacherQuery) {
    return request({
      url: '/eduservice/eduTeacher/teacherList?currentPage=' + page + '&currentLimit=' + limit,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacher(id) {
    return request({
      url: '/eduservice/eduTeacher/deleteTeacher/' + id,
      method: 'delete'
    })
  },
  createTeacher(data) {
    return request({
      url: '/eduservice/eduTeacher/createTeacher',
      method: 'post',
      data: data
    })
  },
  teacherInfo(id) {
    return request({
      url: '/eduservice/eduTeacher/teacherInfo/' + id,
      method: 'get'
    })
  },
  updateTeacher(id, data) {
    return request({
      url: '/eduservice/eduTeacher/updateTeacher/' + id,
      method: 'put',
      data: data
    })
  }
}
