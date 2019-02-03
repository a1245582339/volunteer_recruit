<template>
  <div class="app-container" v-loading.body="listLoading">
   <el-button type="primary" plain @click="addType">添加资讯类型</el-button>
   <Moduletable :list="list" :label="label" :update-row='updateRow' :delete-row='deleteRow'></Moduletable>
   <Dialogtable :list="list"  :form="form" :label="label" ref="add" @commitform='commitForm'></Dialogtable>

  
  </div>

</template>

<script>
import {getNewsType, delNews ,delNewsType, updateNewsType} from "@/api/news";
import Moduletable from "@/components/table/table";
import Dialogtable from "@/components/tabledialog";
export default {
  components: {
    Moduletable,
    Dialogtable
  },
  data() {
    return {
      list: [],
      courseCount: [],
      listLoading: true,
      currentType: "",
      label: {
        moudleId: "资讯类型ID",
        moduleName: "类型名称",
        moduleCount: "资讯数量"
      },
      delMassage: "",

      form: {
        id: "",
        name: "",
        count: ""
      }
    };
  },
  created() {
    this.fetchData();
    //this.getClass();
  },
  methods: {
    // 添加新类型
    addType() {
      this.$refs.add.noshow();
    },

    // 获取数据
    fetchData() {
      var vm = this;
      this.listLoading = true;
      var data = [];
      getNewsType().then(response => {
        response.data.map((item, index) => {
          data[index] = {
            id: item.id,
            name: item.news_type_name,
            count: item.count
          };
        });
        vm.list = data;
        this.listLoading = false;
      });
    },
    openDelMassage(data, rows, index) {
      var vm = this;
      this.$confirm(vm.delMassage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delNewsType(data).then(response => {
          console.log(response);
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
        })
      }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });  
        })
    },
    // 删除模块
    deleteRow(index, rows) {
      let data = rows[index].id; //根据课程id删除课程
      console.log("要删除的模块name:", data);
      if (rows[index].count != 0) {
        this.delMassage = "该分组下有多个资讯，将被一起删除，是否确认删除？";
      }else{
        this.delMassage = "该条记录将被删除，是否确定删除？";
      }
      this.openDelMassage(data, rows,index);
    },
    // 修改
    updateRow(index, rows) {
      // 获取当前行的内容  rows[index]
      // console.log(rows[index])
      this.form.id = rows[index].id;
      this.form.name = rows[index].name;
      this.$refs.add.noshow();
      console.log("执行更改程序");
    },
    commitForm() {
      // 更改模块的表单提交
      console.log(JSON.stringify(this.form));
      let data = this.form;

      updateNewsType(data).then(response => {
        this.$refs.add.noshow();
        this.fetchData();
        this.$message({
          message: "修改成功",
          type: "success"
        });
      });
    }
  }
};
</script>
