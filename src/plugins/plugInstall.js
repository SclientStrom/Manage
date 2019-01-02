import Vue from 'vue'
import hasPermission from './hasPermission'

const plugins = [
  hasPermission
]
plugins.map((plugin) => {
  Vue.use(plugin)
})
export default Vue
