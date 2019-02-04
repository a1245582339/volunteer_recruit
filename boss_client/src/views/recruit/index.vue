<template>
  <div class="app-container" v-loading.body="listLoading">
    <el-button type="primary" @click="newRecruit">新建招募信息</el-button>
   <Moduletable :list="list" :label="label" :showList="showList" :preview="preview" :cannotEdit="true" :delete-row='deleteRow' :updateRow="updateRow"></Moduletable>
   <recruit-dialog :desp="desp" ref="desp" />
   <Dialogtable :imgUploadList="false" :type="hostel" :form="form" :label="label" ref="dial" @commitform='commitForm'></Dialogtable>
   <person-list-dialog ref="showList" :recruit_id="recruit_id" />
  </div>

</template>

<script>
import { getRecruit, delRecruit, upDataRecruit } from '@/api/recruit'
import { getHostelList } from '@/api/hostel'
import Moduletable from '@/components/table/table'
import RecruitDialog from '@/components/recruitdialog/index'
import Dialogtable from '@/components/tabledialog'
import personListDialog from '@/components/personListDialog'
export default {
  components: {
    Moduletable,
    RecruitDialog,
    Dialogtable,
    personListDialog
  },
  data() {
    return {
      list: [],
      listLoading: true,
      desp: '',
      hostel: [],
      recruit_id: 0,
      label: {
        moudleId: '招募信息编号',
        moduleName: '招募标题',
        moudleType: '青旅名称',
        canPreview: '详情',
        moudleCheck: '审核状态',
        moudlePrice: '义工待遇',
        showDesp: '工作内容',
        showStu: '应召学生'
      },

      form: {
        name: '',
        address: '',
        coefficient: '',
        desp: '',
        oldname: '',
        type: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 转换时间戳
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    // 获取数据
    async fetchData() {
      var vm = this
      this.listLoading = true
      var data = []
      await getHostelList({ boss_id: vm.$store.state.user.id }).then(res => {
        this.hostel = res.data
      })
      await getRecruit({ boss_id: vm.$store.state.user.id }).then(res => {
        data = res.data.map(item => {
          let ischecked
          if (item.ischecked == 1) {
            ischecked = '已审核'
          } else {
            ischecked = '待审核'
          }
          var hostel_name
          for (let i = 0; i < this.hostel.length; i++) {
            if (item.hostel_id == this.hostel[i].id) {
              hostel_name = this.hostel[i].name
            }
          }
          return {
            id: item.id,
            name: item.recruit_title,
            tel: item.tel,
            hostel_id: item.hostel_id,
            type: hostel_name,
            ischecked: ischecked,
            avatar: item.avatar,
            password: item.password,
            price: item.salary,
            dialogContent: item.desp
          }
        })

        vm.list = data
        this.listLoading = false
      })
    },
    // 删除模块
    deleteRow(index, rows) {
      const data = rows[index].id // 根据学生id删除课程
      console.log('要删除的模块name:', data)
      delRecruit(data)
        .then(response => {
          console.log(response)
          if (response.code == 20000) {
            rows.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: '删除失败',
            type: 'success'
          })
        })
    },
    preview(desp) {
      this.desp = desp
      this.$refs.desp.noshow()
    },
    newRecruit() {
      this.form.id = ''
      this.form.name = ''
      this.form.address = ''
      this.form.price = ''
      this.form.desp = ''
      this.form.typeName = this.hostel

      this.$refs.dial.noshow()
    },
    showList(id) {
      this.recruit_id = id
      this.$refs.showList.noshow()
    },
    updateRow(index, rows) {
      this.form.id = rows[index].id
      this.form.name = rows[index].name
      this.form.typeName = rows[index].type
      this.form.type = rows[index].hostel_id
      this.form.price = rows[index].price
      this.form.desp = rows[index].dialogContent
      this.$refs.dial.noshow()
      console.log('执行更改程序')
    },
    commitForm() {
      var vm = this
      this.listLoading = true
      this.$refs.dial.noshow()
      upDataRecruit(vm.form).then(res => {
        this.fetchData()
      })
    }
  }
}
</script>
