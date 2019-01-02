<template>
  <div class="app">
    <div class="left">
      <div class="left_top">
      </div>
      <div class="left_middle">
        <p><span class="login_name">孙龙</span></p>
        <p><span class="login_post">研发一部</span></p>
      </div>
      <div class="left_bottom">
        <el-menu :default-active="$route.path"
                 textColor="#ffffff"
                 background-color="#2f4050"
                 unique-opened
                 size="mini"
                 active-text-color="#0e9aef"
                 class="el-menu-vertical-demo" router>
          <!--<el-menu-item-->
          <!--v-for="menu in menus"-->
          <!--:index="menu.route"-->
          <!--:key="menu.route"-->
          <!--v-if="!menu.children">-->
          <!--<i v-bind:class="menu.iconClass"></i> {{ menu.name }}-->
          <!--</el-menu-item>-->
          <el-submenu
            v-for="menu in menus"
            :index="`${menu.route}`"
            :key="menu.route"
            v-if="menu.children">
            <template slot="title">
              <i v-bind:class="menu.iconClass"></i> {{ menu.name}}
            </template>
            <el-menu-item v-for="item in menu.children" :index="item.route" :key="item.route">
              <i v-bind:class="item.iconClass"></i>
              <span> {{ item.name }} </span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="right">
      <div class="right_top">
        <div class="welcome">后台管理系统</div>
      </div>
      <div class="right_main">
        <!-- 此处放置el-tabs代码 -->
        <div class="template-tabs">
          <el-tabs tab-position="top" v-model="tabActiveIndex" type="card" v-if="tabOptions.length"
                   @tab-click="tabClick" closable @tab-remove="tabRemove">
            <el-tab-pane :key="item.name" v-for="(item) in tabOptions" :label="item.name" :name="item.route">
            </el-tab-pane>
            <div class="content-wrap">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </div>
          </el-tabs>
        </div>
      </div>
      <div class="right_bootom">
        sunlong@com.cn
      </div>
    </div>
  </div>
</template>

<script>
import './iconFont/iconfont.css'
import ElIcon from '../node_modules/element-ui/packages/icon/src/icon.vue'

export default {
  name: 'App',
  components: {
    ElIcon,
    mainTemplate: require('./pages/Main.vue').default
  },
  computed: {
    tabOptions () {
      return this.$store.state.options
    },
    // 动态设置及获取当前激活的tab页
    tabActiveIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set (val) {
        this.$store.commit('set_active_index', val)
      }
    }
  },
  watch:
    {
      '$route' (to) {
        let flag = false
        for (let option of this.tabOptions) {
          if (option.name === to.name) {
            flag = true
            this.$store.commit('set_active_index', to.path)
            console.log('success')
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {route: to.path, name: to.name})
          this.$store.commit('set_active_index', to.path)
        }
      }
    },

  data: function () {
    return {
      min_height: 200,
      menus:
        [
          {route: '/', name: '首页', iconClass: 'icon iconfont icon-shouye', children: false},
          {route: '/user', name: '用户管理', iconClass: 'icon iconfont icon-yonghu1', children: false},
          {route: '/psd', name: '密码管理', iconClass: 'icon iconfont icon-mima', children: false},
          {route: '/salary', name: '工资管理', iconClass: 'icon iconfont icon-gongzi', children: false},
          {route: '/attendence', name: '考勤管理', iconClass: 'icon iconfont icon-kaoqin', children: false},
          {
            router: '/system',
            name: '系统管理',
            iconClass: 'icon iconfont icon-xitong',
            children: [
              {route: '/system/user', iconClass: 'icon iconfont icon-yonghu1', name: '用户管理'},
              {route: '/system/role', iconClass: 'icon iconfont icon-yonghu1', name: '角色管理'},
              {route: '/system/menu', iconClass: 'icon iconfont icon-yonghu1', name: '菜单管理'},
              {route: '/system/post', iconClass: 'icon iconfont icon-yonghu1', name: '岗位管理'},
              {route: '/system/depart', iconClass: 'icon iconfont icon-yonghu1', name: '部门管理'},
              {route: '/system/log', iconClass: 'icon iconfont icon-yonghu1', name: '日志管理'}
            ]
          },
          {
            route: '/perform',
            name: '绩效考核',
            iconClass: 'icon iconfont icon-tubiaozhizuomoban-',
            children: [
              {route: '/month', iconClass: 'icon iconfont icon-yuedukaohe', name: '月度绩效'},
              {route: '/year', iconClass: 'icon iconfont icon-niandukaohe', name: '年度绩效'}
            ]
          },
          {route: '/admin', name: '系统管理', iconClass: 'icon iconfont icon-xitong', children: false},
          {route: '/feedback', name: '意见反馈', iconClass: 'icon iconfont icon-yijian', children: false}
        ],
      store:
        []
    }
  },
  methods: {
    tabClick (tab) {
      let path = this.tabActiveIndex
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      if (path === '/userInfo') {
        path = path + '/' + this.$store.state.userInfo.name
      }
      // 路由跳转
      this.$router.push({path: path})
    },
    tabRemove (targetName) {
      if (targetName === '/') {
        return
      }

      // 将改tab从options里移除
      this.$store.commit('delete_tabs', targetName)

      // 还同时需要处理一种情况当需要移除的页面为当前激活的页面时，将上一个tab页作为激活tab
      let path = this.$store.state.activeIndex
      if (path === targetName) {
        // 设置当前激活的路由
        if (path && path >= 1) {
          this.$store.commit('set_active_index', this.tabOptions[this.tabOptions.length - 1].route)
          this.$router.push({path: path})
        } else {
          this.$router.push({path: '/'})
        }
      }
    }
  }
}
</script>

<style>
  * {
    margin: 0px;
    padding: 0px;
  }
  li{
    margin-top: 0px !important;
  }
  html, body {
    width: 100%;
    height: 100%;
  }

  .app {
    width: 100%;
    height: 100%;
    min-height: 630px;
    /*max-height: 3000px;*/
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 200px;
  }

  .el-submenu__title i {
    color: white;
  }

  .left {
    width: 16%;
    background: #2f4050;
    height: 100%;
    float: left;
    font-size: 16px;
    min-width: 210px;
  }
  .left_top {
    min-height: 120px;
    background: url('assets/jetair.png') #337ab7 no-repeat center;
    background-size: 25%;
  }
  .left_middle{
    font-size: 12px;
    color: white;
    text-align: center;
    min-height: 50px;
    background: #337ab7;
  }
  i {
    padding-right: 10px;
    margin-left: 20px;
  }

  li {
    list-style-type: none;
    margin-top: 4%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .right {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .right_top {
    width: 100%;
    min-height: 50px;
    color: #888888;
    border-bottom: 1px solid #eeeeee;
  }

  .right_main {
    width: 100%;
    height: 88%;
    border-bottom: medium solid #eeeeee;
  }

  .right_bootom {
    margin-right: 8%;
    margin-top: 5px;
    float: right;
  }

  .welcome {
    text-align: right;
    float: right;
    margin-top: 1%;
    margin-right: 5%;
  }

  .el-submenu [class^=el-icon-] {
    font-size: 14px;
  }

  .el-submenu__title {
    font-size: 14px;
  }

  .iconfont {
    padding-left: 7%;
  }

  .welcome label {
    margin-left: 10px;
  }

  .right_bootom {

  }

  .el-menu-item, .el-submenu__title{
    height: 45px;
    line-height: 45px;
  }
  .el-submenu .el-menu-item{
    height: 45px;
    line-height: 45px;
  }
  .el-tabs__nav-scroll {
    border-bottom: 2px solid #39aef5;
  }
  .el-tabs__header {
    position: inherit;
  }
</style>
