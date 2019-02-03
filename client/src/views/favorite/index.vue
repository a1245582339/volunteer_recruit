<template>
  <div style="margin-top:-50px" class="app-container" v-loading.body="listLoading">
    <h1 style="">收藏夹</h1>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="课程">
        <Moduletable :label="'课程名称'" :tableData="courseData" :delete-row='deleteRow' :toLink='toLink'></Moduletable>
      </el-tab-pane>
      <el-tab-pane label="资讯">
        <Moduletable :label="'资讯标题'" :tableData="newsData" :delete-row='deleteRow' :toLink='toLink'></Moduletable>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import {
    getCourseFavoriteById,
    getNewsFavoriteById,
    delCourseFav,
    delNewsFav
  } from "@/api/favorite";
  import Moduletable from "@/components/table/table";
  export default {
    components: {
      Moduletable
    },
    data() {
      return {
        order: [],
        listLoading: false,
        courseData: [],
        newsData: []
      };
    },
    created() {
      var vm = this;
      this.$emit("listenActiveIndex", "");
      this.listLoading = true;
      setTimeout(function () {
        vm.checkLogin();
      }, 1000);
    },
    computed: {
      userInfo() {
        return this.$store.state.user_info;
      }
    },
    methods: {
      checkLogin() {
        if (!this.$store.state.isLogin) {
          this.$alert("请先登录，点击确定返回首页", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push({
                name: "index"
              });
            }
          });
        } else {
          this.fetchData();
        }
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h = date.getHours() + ":";
        var m = date.getMinutes() + ":";
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      },
      handleClick(tab) {

      },
      // 获取数据
      fetchData() {
        var vm = this;
        this.listLoading = true;
        var data = [];
        getCourseFavoriteById({
          stu_id: vm.userInfo.stu_id
        }).then(response => {
          var order = response.data;
          var data = [];
          order.map((item, index) => {
            data[index] = item;
            data[index].itemid = item.course_id
            data[index].time = vm.timestampToTime(item.create_time);
            data[index].name = item.course_name
          });
          vm.courseData = data;
          vm.listLoading = false;
        });
        getNewsFavoriteById({
          stu_id: vm.userInfo.stu_id
        }).then(response => {
          var order = response.data;
          var data = [];
          order.map((item, index) => {
            data[index] = item;
            data[index].itemid = item.news_id
            data[index].time = vm.timestampToTime(item.create_time);
            data[index].name = item.news_name
          });
          vm.newsData = data;
          vm.listLoading = false;
        });
      },
      // 删除模块
      deleteRow(index, rows, label) {
        console.log(label)
        let id = rows.id; //删除
        var vm = this;
        this.$confirm("是否确定将该条收藏记录删除？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            if (label == "课程名称") {
              delCourseFav({
                id: id
              }).then(response => {
                if (response.code == 20000) {
                  vm.courseData.splice(index, 1);
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
            } else if (label == "资讯标题") {
              delNewsFav({
                id: id
              }).then(response => {
                if (response.code == 20000) {
                  vm.newsData.splice(index, 1);
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
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      toLink(id, label) {
        if (label == "课程名称") {
          this.$router.push('/coursedetail?courseid=' + id)
        } else if(label == "资讯标题") {
          this.$router.push('/newsdetail?newsid=' + id)
        }

      },
    }
  };

</script>
