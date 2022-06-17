import request from '@/utils/request'

export default {
  subjectCreate() {
    return request({
      url: '/eduservice/eduSubject/addSubject',
      method: 'post'
    })
  },
  subjectList(page, limit, teacherQuery) {
    return request({
      url: '/eduservice/eduSubject/addSubject?currentPage=' + page + '&currentLimit=' + limit,
      method: 'post',
      data: teacherQuery
    })
  }
}
