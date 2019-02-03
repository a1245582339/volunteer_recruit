<template>
  <div class="app-container" v-loading.body="listLoading">
   <Moduletable :cannotEdit="cannotEdit" :list="list" :label="label" :delete-row='deleteRow'></Moduletable>
  </div>

</template>

<script>
import { getOrderList, delOrder } from "@/api/order";
import Moduletable from "@/components/table/table";
export default {
  components: {
    Moduletable,
  },
  data() {
    return {
      list: [],
      listLoading: true,
      cannotEdit:true,
      label: {
        moudleId: "订单ID",
        moduleName: "课程名称",
        moduleDesp: "学生用户名",
        moudlePrice: "花费积分",
        moudleCreatTime: "创建时间",
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
         return Y+M+D+h+m+s;
    },
    // 获取数据
    fetchData() {
      var vm = this;
      this.listLoading = true;
      var data = [];
      
      getOrderList().then(response => {
        response.data.map((item, index) => {
          var create_time=vm.timestampToTime(item.create_time)
          data[index] = {
            id: item.id,
            name: item.course_name,
            price: item.spend,
            desp: item.stu_name,
            create_time: create_time,
          };
        });
        vm.list=data;
        this.listLoading = false;
      });
    },
    // 删除模块
    deleteRow(index, rows) {
      let data = rows[index].id; //删除管理员
      this.$confirm("是否确定将该订单删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delOrder(data).then(response => {
          if (response.code == 20000) {
            rows.splice(index, 1);
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
      }).catch(()=>{
        this.$message({
            type: 'info',
            message: '已取消删除'
          });  
      })
    },
  }
};
</script>
