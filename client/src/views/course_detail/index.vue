<template>
  <div v-loading="listLoading">
    <el-card class="course">
      <!-- ************面包屑************ -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'courselist' }">视频课程</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'courselist' , params:{classid:course.course_class_id}}">{{course.course_class_name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{course.course_name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- ************课程************ -->
      <div class="course-content">
        <img class="course-cover" :src="course.cover" alt="">
        <div class="course-text">
          <div class="text">
            <h1 style="margin:0">{{course.course_name}} </h1>
            <div v-if="isLogin" class="fav">
              <span @click="cancelFav" style="cursor: pointer;" v-if="haveFav">
                <span style="color:#f7ba2a" class="el-icon-star-on"></span><span style="color:#303133;font-size:14px;"> 已收藏</span>
              </span>
              <span @click="addFav" style="cursor: pointer;" v-else>
                <span style="color:#f7ba2a" class="el-icon-star-off"></span><span style="color:#303133;font-size:14px;"> 收藏</span>
                
              </span>
              <span style="color:#909399;font-size:14px;">收藏量：{{favCount}}</span>
            </div>
            <div class="price">
              <span>价 格</span>
              <span class="price-val">￥{{course.course_price}}</span>
            </div>
            <el-row class="course-btn">
              <el-button v-if="haveBought" type="primary" @click="play">开始学习</el-button>
              <el-button v-else-if="course.isDel!=1" type="danger" @click="buy">立即购买</el-button>
              <el-button v-if="!isLogin" type="text">登录后才可购买课程</el-button>
              <el-button v-if="course.isDel==1" type="info" disabled>已下架</el-button>
            </el-row>
            <p class="course-desp">{{course.course_desp}}</p>
          </div>
        </div>
      </div>
      <!-- ************购买框************ -->

      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <div v-if="userInfo.balance-course.course_price<0">
          <p style="color:#F56C6C">当前积分{{userInfo.balance}}，积分不足，无法购买</p>
        </div>
        <div v-else>
          <p>确定花费{{course.course_price}}积分购买此课程？</p><br>
          <p style="color:#67C23A">当前积分{{userInfo.balance}}</p>
        </div>
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="userInfo.balance-course.course_price>0" type="primary" @click="confirmBuy">确 定 购 买</el-button>
        </span>
      </el-dialog>

    </el-card>

    <Vediodialog :vedioUrl="course.video_url" :cover="course.cover" ref="vedio"></Vediodialog>
  </div>
</template>

<script>
import { getCourseById } from "@/api/course";
import { checkOrder, submitOrder } from "@/api/order";
import { checkCourseFav,addCourseFav,cancelCourseFav } from "@/api/favorite";
import Vediodialog from "@/components/vediodialog";
export default {
  name: "course",
  components: {
    Vediodialog
  },
  data() {
    return {
      course: [],
      listLoading: false,
      haveBought: false, // 此课程是否已被当前用户购买，默认为未购买
      dialogVisible: false,
      haveFav:false,
      favCount:0
    };
  },
  computed: {},
  created() {
    var vm = this;
    var course_id = this.getQueryVariable("courseid");
    if (!course_id) {
      this.$router.push("/404");
    } else {
      this.fetchCourse(course_id);
      this.fetchOrder(course_id, this.$store.state.user_info.stu_id);
      this.fetchFav(course_id, this.$store.state.user_info.stu_id)
      this.$emit("listenActiveIndex", "course");
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userInfo() {
      return this.$store.state.user_info;
    }
  },
  watch: {
    isLogin(val1, val2) {
      if (val1) {
        var course_id = this.getQueryVariable("courseid");
        this.fetchOrder(course_id, this.$store.state.user_info.stu_id);
        this.fetchFav(course_id, this.$store.state.user_info.stu_id)
      }
    }
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    fetchCourse(id) {
      var vm = this;
      vm.listLoading = true;
      getCourseById({
        id: id
      }).then(response => {
        vm.course = response.data;
        vm.listLoading = false;
      }).catch(err =>{
        vm.$router.push('/404')
      });
    },
    fetchOrder(course_id, stu_id) {
      var vm = this;
      checkOrder({
        course_id: course_id,
        stu_id: stu_id
      }).then(response => {
        vm.haveBought = response.data.haveBought;
      })
    },
    fetchFav(course_id, stu_id) {
      var vm = this;
      checkCourseFav({
        course_id: course_id,
        stu_id: stu_id
      }).then(response => {
        vm.haveFav = response.data.exist
        vm.favCount = response.data.count;
      });
    },
    buy() {
      if (this.userInfo.ischecked == 0) {
        this.$message({
          message: "很抱歉，只有通过审核的用户才可购买课程",
          type: "warning"
        });
        return false;
      }
      if (this.isLogin) {
        this.dialogVisible = true;
      } else {
      }
    },
    confirmBuy() {
      var vm = this;
      submitOrder({ course_id: vm.course.id, stu_id: vm.userInfo.stu_id }).then(
        response => {
          vm.fetchOrder(vm.course.id, this.$store.state.user_info.stu_id);
          vm.dialogVisible = false;
          if (response.status == 1) {
            this.$message(response.title);
          } else if (response.status == 2) {
            this.$message({
              message: "恭喜您购买成功，可以点击开始学习观看课程啦",
              type: "success"
            });
            vm.$store.commit(
              "changebalance",
              vm.userInfo.balance - vm.course.course_price
            );
          }
        }
      );
    },
    addFav(){
      var vm = this
      var course_id = this.getQueryVariable("courseid");
      var stu_id = this.$store.state.user_info.stu_id
      addCourseFav({course_id: course_id,stu_id: stu_id}).then(response=>{
        vm.haveFav = true
        if(response.title == "添加成功"){
          vm.favCount++
        }
        this.$message({
          message: '添加收藏成功',
          type: 'success'
        });
      })
    },
    cancelFav(){
      var vm = this
      var course_id = this.getQueryVariable("courseid");
      var stu_id = this.$store.state.user_info.stu_id
      cancelCourseFav({course_id: course_id,stu_id: stu_id}).then(response=>{
        vm.haveFav = false
        if(response.title == "取消成功"){
          vm.favCount--
        }
        this.$message({
          message: '取消收藏成功',
          type: 'success'
        });
      })
    },
    play() {
      this.$refs.vedio.noshow();
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.course-content {
  margin-top: 30px;
  .course-cover {
    width: 500px;
    height: 300px;
  }
  .course-text {
    float: right;
    width: 500px;
    .fav {
      width: 140px;
      margin: 10px 0 10px;
    }

    .text {
      float: left;
      .price {
        height: 40px;
        width: 480px;
        background-color: #f5f5f5;
        line-height: 40px;
        padding-left: 10px;
        .price-val {
          color: #f56c6c;
          margin-left: 30px;
          font-size: 26px;
        }
      }
      .course-btn {
        margin-top: 20px;
      }
      .course-desp {
        letter-spacing: 1px;
        text-indent: 25px;
      }
    }
  }
}
</style>
