<template>
  <div class="app-container" v-loading.body="listLoading">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="订单ID" width="180">
      </el-table-column>
      <el-table-column prop="time" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="recruit_title" label="招募标题">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="toCourse(scope.row.recruit_id)" type="primary" size="mini">查看详情</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { getOrder } from "@/api/recruit";
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

      getOrder({ stu_id: vm.userInfo.stu_id }).then(response => {
        var order = response.data;
        order.map((item, index) => {
          vm.tableData[index] = item;
          vm.tableData[index].time = vm.timestampToTime(item.create_time);
        });
        console.log(JSON.stringify(order))
        vm.listLoading = false;
      });
    },
    toCourse(id){
      this.$router.push('/recruitdetail?id='+id)
    },
  }
};
</script>
