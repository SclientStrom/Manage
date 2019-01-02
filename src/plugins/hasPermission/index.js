const hasPermission = {
  install (Vue) {
    Vue.directive('hasPermission', {
      bind (el, binding, vnode) {
        let permissionList = vnode.context.$route.meta.permission
        if (!permissionList) {
          console.error(`权限判断，你所访问的页面，没有此访问权限: ${vnode.context.$route.path}`)
          return
        }
        if (typeof (permissionList) !== 'object' || !permissionList.length) {
          console.error(`权限判断不生效。因路由中permission字段非数组类型或内容为空，请检查路由表设置。当前路由地址：${vnode.context.$route.path}`)
          return
        }
        if (!permissionList.includes(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
export default hasPermission
