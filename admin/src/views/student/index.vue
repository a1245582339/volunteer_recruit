<template>
  <div class="app-container" v-loading.body="listLoading">
   <Moduletable :list="list" :label="label" :update-row='updateRow' :delete-row='deleteRow' :check='check'></Moduletable>
   <Dialogtable :actionUrl="actionUrl" :list="list" :type="type" :form="form" :label="label" ref="dial" @commitform='commitForm'></Dialogtable>
  
  </div>

</template>

<script>
import { getStudentList, checkStudent ,delStudent, updateStudent, updateStuAvatar} from "@/api/student";
import Moduletable from "@/components/table/table";
import Dialogtable from "@/components/tabledialog";
import Vediodialog from "@/components/vediodialog";
export default {
  components: {
    Moduletable,
    Dialogtable,
    Vediodialog
  },
  data() {
    return {
      list: [],
      type: [],
      listLoading: true,
      currentType: "",
      actionUrl:"http://127.0.0.1:3000/updateStuAvatar",
      label: {
        moudleId: "学生ID",
        moduleName: "学生用户名",
        moudleType: "学生性别",
        moudlePrice: "学生剩余积分",
        moudleTel: "学生手机号",
        moudleCreatTime: "创建时间",
        moudleCheck: "审核",
        moudlePassword:"密码",
        avatar:"头像"
      },

      form: {
        name: "",
        price: "",
        coefficient: "",
        desp: "",
        oldname: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 转换时间戳
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
      getStudentList().then(response => {
        response.data.map((item, index) => {
          var ischecked;
          var create_time='';
          if (item.ischecked == 1) {
            ischecked = "已审核";
          } else {
            ischecked = "待审核";
          }
          var create_time=vm.timestampToTime(item.create_time)

          data[index] = {
            id: item.id,
            name: item.stu_name,
            price: item.balance,
            tel: item.tel,
            ischecked: ischecked,
            create_time: create_time,
            type: item.sex,
            avatar:item.avatar,
            password:item.password
          };
        });
        vm.type = [{ id: "男", name: "男" }, { id: "女", name: "女" }];
        vm.list = data;
        this.listLoading = false;
      });
    },
    // 删除模块
    deleteRow(index, rows) {
      let data = rows[index].id; //根据学生id删除课程
      console.log("要删除的模块name:", data);
      delStudent(data)
        .then(response => {
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
        .catch(err => {
          this.$message({
            message: "删除失败",
            type: "success"
          });
        });
    },
    // 修改
    updateRow(index, rows) {
      // 获取当前行的内容  rows[index]
      // console.log(rows[index])
      this.form.id = rows[index].id;
      this.form.name = rows[index].name;
      this.form.oldname = rows[index].name;
      this.form.typeName = rows[index].type;
      this.form.type = rows[index].typeVal;
      this.form.price = rows[index].price;
      this.form.coefficient = rows[index].coefficient;
      this.form.tel = rows[index].tel;
      this.form.desp = rows[index].desp;
      this.form.password = rows[index].password;
      this.form.avatar = rows[index].avatar;
      this.$refs.dial.noshow();
      console.log("执行更改程序");
    },
    commitForm() {
      // 更改模块的表单提交
      console.log(JSON.stringify(this.form));
      let data = this.form;

      updateStudent(data).then(response => {
        console.log('response',response)
        this.$refs.dial.noshow();
        this.fetchData();
        this.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
    check(index, list) {
      if (list[index].ischecked == "已审核") {
        this.$message({
          message: "此学生为已审核状态",
          type: "info"
        });
      } else {
        this.$confirm("是否确定将此学生修改为已审核状态？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          checkStudent(list[index].id).then(response => {
            if (response.code == 20000) {
              list[index].ischecked='已审核'
              this.$message({
                message: "更改成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "更改失败",
                type: "success"
              });
            }
          });
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消更改'
          });  
        });
      }
    }
  }
};
</script>
