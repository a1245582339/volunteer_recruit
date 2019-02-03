<template>
  <div class="app-container" v-loading.body="listLoading">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="订单ID" width="180">
      </el-table-column>
      <el-table-column prop="time" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="course_name" label="课程名称" width="180">
      </el-table-column>
      <el-table-column prop="spend" label="花费积分">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="toCourse(scope.row.course_id)" type="primary" size="mini">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteRow(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { getOrderByStuId, delOrder } from "@/api/order";
export default {
  data() {
    return {
      order: [],
      listLoading: false,
      tableData: []
    };
  },
  created() {
    var vm = this
    this.$emit('listenActiveIndex','order')
    this.listLoading=true
    setTimeout(function(){vm.checkLogin()},1000)
    
  },
  computed: {
    userInfo() {
      return this.$store.state.user_info;
    }
  },
  methods: {
    checkLogin() {
      if(!this.$store.state.isLogin){
        this.$alert('请先登录，点击确定返回首页', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({name:"index"})
          }
        });
      }else{
        this.fetchData()
      }
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 获取数据
    fetchData() {
      var vm = this;
      this.listLoading = true;
      var data = [];

      getOrderByStuId({ stu_id: vm.userInfo.stu_id }).then(response => {
        var order = response.data;
        order.map((item, index) => {
          vm.tableData[index] = item;
          vm.tableData[index].time = vm.timestampToTime(item.create_time);
        });
        vm.listLoading = false;
      });
    },
    // 删除模块
    deleteRow(index, rows) {
      let data = rows.id; //删除
      var vm = this;
      this.$confirm("是否确定将该订单删除？注意！删除后将无法观看购买的课程！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delOrder(data).then(response => {
            if (response.code == 20000) {
              vm.tableData.splice(index, 1);
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "删除失败",
                type: "success"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toCourse(id){
      this.$router.push('/coursedetail?courseid='+id)
    },
  }
};
</script>
