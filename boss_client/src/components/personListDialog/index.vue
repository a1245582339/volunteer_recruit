<template>
  <div>
    <!-- 弹出框***************************************************** -->
    <el-dialog @open="open" @close="close" :before-close="handleClose" title="应召列表" :visible.sync="dialogFormVisible" center>
      <el-table
    :data="stuData"
    border
    style="width: 100%">
    <el-table-column
      prop="stu_name"
      label="学生姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>
  </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import { getRecruitList } from '@/api/recruit'
  export default {
    props: [
      'recruit_id'
    ],
    computed: {

    },
    data() {
      var vm = this;
      
      return {
        stuData:[],
        dialogFormVisible: false
      };
    },
    methods: {
      noshow() {
        this.dialogFormVisible = !this.dialogFormVisible;
      },
      handleClose(done) {
        this.noshow()
        console.log('关闭了')
      },
      close() {
        this.stuData = []
      },
      open() {
        var vm = this
        getRecruitList({recruit_id: vm.recruit_id}).then(res => {
          vm.stuData = res.data
        })
      }
    },
    mounted() {}
  };

</script>

<style scoped>
  .dialog-form {
    /* border: 1px solid #000; */
    text-align: center;
  }

</style>
