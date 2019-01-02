<template>
  <div id="user">
    <div class="main">
      <div class="query">
        <el-row class="input-group">
          <div class="input-item">
            <el-col :span="2" class="input-label">
              <label>岗位编码: </label>
            </el-col>
            <el-col :span="4">
              <el-input v-model="postCode" size="mini"></el-input>
            </el-col>
          </div>
          <div class="input-item">
            <el-col :span="2" class="input-label">
              <label>状态: </label>
            </el-col>
            <el-col :span="4">
              <el-select v-model="dictValue" size="mini" placeholder="全部">
                <el-option
                  v-for="item in postStateItems"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-col>
          </div>
          <div class="input-item">
            <el-col :span="2" class="input-label">
              <label>岗位编码: </label>
            </el-col>
            <el-col :span="4">
              <el-input v-model="postCode" size="mini"></el-input>
            </el-col>
          </div>
        </el-row>
        <div class="query-main">
          <el-button @click="getAllPost()" type="success" size="small" round>查询</el-button>
          <el-button @click="refresh()" type="primary" size="small" round>刷新</el-button>
        </div>
      </div>
      <div class="table"
           element-loading-text="正在加载中"
           v-loading="fullscreenLoading">
        <el-button
          type="success"
          @click="dialogVisible = true"
          class="el-icon-plus table_deal table_left_deal">
          增加
        </el-button>
        <el-button
          type="danger"
          @click="deleteSelection()"
          class="el-icon-delete table_deal table_right_deal">
          删除
        </el-button>
        <template class="table_main">
          <el-table
            size="mini"
            ref="multipleTable"
            :data="postDatas"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            :maxHeight="maxHeight">
            <el-table-column
              type="selection"
              align="center"
              min-width="2">
            </el-table-column>
            <el-table-column
              lable="编号"
              align="right"
              type="index"
              min-width="2">
            </el-table-column>
            <el-table-column
              align="center"
              prop="postName"
              label="岗位名称"
              min-width="5">
            </el-table-column>
            <el-table-column
              align="center"
              prop="postCode"
              label="岗位编码"
              min-width="5">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createBy"
              label="创建用户"
              min-width="5">
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              :formatter="changeStatus"
              label="状态"
              min-width="3"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="创建时间"
              min-width="5">
            </el-table-column>

            <el-table-column
              align="center"
              label="操作"
              min-width="5">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  class="el-icon-edit"
                  @click="addPost()" circle>
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="removePost(scope.row)"
                  class="el-icon-delete" circle>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            第 1 到 {{ total }} 条，共 {{ total }} 条记录
          </div>
        </template>
      </div>
    </div>
    <div>
      <el-dialog class="dialog"
        title="增加岗位"
        :visible.sync="dialogVisible"
        width="40%"
        >
        <span style="width: 60%">
          <el-row class="input-group" :model="form" :rules="rules" ref="form">
            <div class="input-item el-form-item">
              <el-col :span="6" class="input-label">
                <label>岗位编码: </label>
              </el-col>
              <el-col :span="12">
                <el-input ref="postCodeRef" :placeholder="form.postCodeHolder" v-model="form.postCode" property="name" size="mini" autocomplete="off"></el-input>
              </el-col>
            </div>
            <div class="input-item el-form-item">
              <el-col :span="6" class="input-label">
                <label>岗位名称: </label>
              </el-col>
                <el-col :span="12">
                <el-input ref="postNameRef" v-model="form.postName" :placeholder="form.postNameHolder" size="mini" autocomplete="off"></el-input>
              </el-col>
            </div>
            <div class="input-item el-form-item">
              <el-col :span="6" class="input-label">
                <label>排序: </label>
              </el-col>
                <el-col :span="12">
                <el-input type="number" ref="postSortRef" :placeholder="form.postSortHolder" v-model="form.postSort" size="mini" autocomplete="off"></el-input>
              </el-col>
            </div>
            <div class="input-item el-form-item">
              <el-col :span="6" class="input-label">
                <label>状态: </label>
              </el-col>
              <el-col :span="9" >
                <el-radio-group v-model="form.status">
                  <el-radio
                    v-for="item in postStateItems"
                    :key="item.dictValue"
                    :label="item.dictValue"
                    v-if="item.dictLabel !== '全部'">
                     {{ item.dictLabel}}
                  </el-radio>
                </el-radio-group>
              </el-col>
            </div>
            <div class="input-item el-form-item">
              <el-col :span="6" class="input-label">
                <label>备注: </label>
              </el-col>
              <el-col :span="12" >
                <el-input v-model="form.remark" size="mini" autocomplete="off"></el-input>
              </el-col>
            </div>
            <div class="input-item el-form-item">
            <el-col :span="11">
              <el-button size="small" type="primary" @click="confirm()">提交</el-button>
            </el-col>
            <el-col :span="4">
              <el-button size="small" @click="cancel()">取消</el-button>
            </el-col>
          </div>
          </el-row>
          <!--<el-form :model="form">-->
            <!--<el-form-item label="岗位名称" :label-width="formLabelWidth">-->
              <!--<el-input  v-model="form.name" size="mini" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="编码" :label-width="formLabelWidth">-->
              <!--<el-input v-model="form.name" size="mini" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="状态" :label-width="formLabelWidth">-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
              <!--<el-button size="small" type="primary" @click="confirm()">提交</el-button>-->
              <!--<el-button size="small" type="danger" @click="cancel()">取消</el-button>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        </span>
        <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
          <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
        <!--</span>-->
      </el-dialog>
    </div>
  </div>
</template>
<script>

import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
import ElInput from '../../../node_modules/element-ui/packages/input/src/input.vue'
import ElCol from 'element-ui/packages/col/src/col'
import ElRadioButton from '../../../node_modules/element-ui/packages/radio/src/radio-button.vue'
import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue'
export default {
  components: {
    ElFormItem,
    ElRadioButton,
    ElCol,
    ElInput,
    ElButton},
  template: 'User',
  data () {
    return {
      dialogVisible: false,
      dictValue: '',
      postCode: '',
      postStateItems: [],
      maxHeight: this.getMaxHeight(),
      total: 0,
      loading: true,
      fullscreenLoading: false,
      postDatas: [],
      multipleSelection: [],
      form: {
        postName: '',
        postNameHolder: '请输入岗位名称',
        postCode: '',
        postCodeHolder: '请输入岗位编码',
        dictValue: '',
        status: '0',
        postSort: '',
        postSortHolder: '请输入排序数字'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  rules: {
    postCode: [{
      required: true,
      message: '请输入信息'
    }]
  },
  mounted () {
    this.getdictPost()
    this.getAllPost()
  },
  methods: {
    confirm: function () {
      this.filterRequireForm()
      this.axios.post('api/account/savePost', this.form)
        .then(response => {
          this.dialogVisible = false
          this.clearForm()
          this.getAllPost()
        })
        .catch(error => {
          console.log(error)
        })
    },
    filterRequireForm: function () {
      if (this.form.postCode === '') {
        this.$refs.postCodeRef.focus()
        return false
      }
      if (this.form.postName === '') {
        this.$refs.postNameRef.focus()
        return false
      }
      if (this.form.postSort === '') {
        this.$refs.postSortRef.focus()
        return false
      }
    },
    cancel: function () {
      this.clearForm()
      this.dialogVisible = false
    },
    clearForm: function () {
      this.form.postCode = ''
      this.form.postName = ''
      this.form.postSort = ''
      this.form.status = '0'
      this.form.remark = ''
    },
    getdictPost: function () {
      var params = new URLSearchParams()
      params.append('dictType', 'sys_normal_disable')
      this.axios.post('api/account/selectDictDataByType', params)
        .then(response => {
          this.postStateItems = response.data
          this.postStateItems.unshift({dictLabel: '全部', dictValue: ''})
        })
        .catch(error => {
          console.log(error)
        })
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    getMaxHeight () {
      let maxHeight = screen.height
      return maxHeight * 0.28
    },
    refresh () {
      this.getAllPost()
    },
    changeStatus (row, column, cellValue, index) {
      if (cellValue === '0') {
        return <el-button type="success" size="mini" round>正常</el-button>
      } else {
        return <el-button type="danger" size="mini" round>停用</el-button>
      }
    },
    removePost (row) {
      var params = new URLSearchParams()
      params.append('ids', row.postId)
      this.doRemove(params)
    },
    doRemove (params) {
      this.$confirm('你是否要删除这条记录呢?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.axios.post('api/account/deletePostByIds', params)
          .then(response => {
            this.getAllPost()
            this.$message({
              size: 'mini',
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(error => {
            console.log(error)
          })
      }).catch(() => {
      })
    },
    deleteSelection () {
      var deletePostIds = ''
      const selectedRows = this.multipleSelection
      for (var index = 0; index <= selectedRows.length; index++) {
        const selectRow = selectedRows[index]
        if (deletePostIds.length !== 0) {
          deletePostIds = deletePostIds.concat(',')
        }
        for (const key in selectRow) {
          if (key === 'postId') {
            deletePostIds = deletePostIds.concat(selectRow[key])
          }
        }
        var params = new URLSearchParams()
        params.append('ids', deletePostIds)
        this.doRemove(params)
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getAllPost () {
      console.log(this.dictValue)
      this.fullscreenLoading = true
      setTimeout(() => {
        this.axios.post('api/account/selectAllPost')
          .then(response => {
            this.postDatas = response.data
            this.total = response.data.length
          })
          .catch(error => {
            console.log(error)
          })
        this.fullscreenLoading = false
      }, 400)
    }
  }
}
</script>
<style>
  @import "../../components/css/user.css";
</style>
