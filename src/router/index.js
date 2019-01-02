import Vue from 'vue'
import Router from 'vue-router'
import User from '../pages/user/User.vue'
import Post from '../pages/post/Post.vue'

Vue.use(Router)

const main = {
  template: '<div>这个是主页</div>'
}
const attendenceTemplate = {
  template: '<div>考勤管理attendenceTemplate</div>'
}
const DetailInfo = {
  template: '<div>this is DetailInfo pages</div>'
}
const PsdInfo = {
  template: '<div>this is password pages</div>'
}
const Theform = {
  template: '<div>this is Theform pages</div>'
}
const Monthform = {
  template: '<div>this is Monthform pages</div>'
}
const Template = {
  template: '<div>this is Theform pages</div>'
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: main
    },
    {
      path: '/user',
      name: '用户管理',
      component: User
    },
    {
      path: '/userInfo/:id',
      name: '用户详情页',
      component: DetailInfo
    },
    {
      path: '/psd',
      name: '密码管理',
      component: PsdInfo
    }, {
      path: '/salary',
      name: '工资管理',
      component: Template
    },
    {
      path: '/attendence',
      name: '考勤管理',
      component: attendenceTemplate
    },
    {
      path: '/month',
      name: '月度绩效',
      component: Monthform
    },
    {
      path: '/year',
      name: '年度绩效',
      component: Theform
    },
    {
      path: '/admin',
      name: '系统管理',
      component: Template
    },
    {
      path: '/feedback',
      name: '意见反馈',
      component: Template
    },
    {
      path: '/system/user',
      name: '用户管理',
      component: User
    },
    {
      path: '/system/role',
      name: '角色管理',
      component: Template
    },
    {
      path: '/system/menu',
      name: '菜单管理',
      component: Template
    },
    {
      path: '/system/post',
      name: '岗位管理',
      component: Post
    },
    {
      path: '/system/depart',
      name: '部门管理',
      component: Template
    },
    {
      path: '/system/log',
      name: '日志管理',
      component: Template
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
export default router
