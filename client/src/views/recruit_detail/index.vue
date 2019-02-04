<template>
  <div v-loading="listLoading">
    <el-card class="course">
      <!-- ************面包屑************ -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'recruitlist' }">招募信息</el-breadcrumb-item>
        <el-breadcrumb-item>{{detail.recruit_title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- ************课程************ -->
      <div class="course-content">
        <p class="course-cover" v-html="detail.desp"></p>
        <div class="course-text">
          <div class="text">
            <h1 style="margin:0">{{detail.recruit_title}} </h1>
            <div class="price">
              <span>所属旅社</span>
              <span style="color: #606266" class="price-val">{{detail.hostel_name}} </span>
              <el-button type="primary" size="mini" @click="showHostel = !showHostel">查看详情</el-button>
            </div>
            <div class="price">
              <span>薪资待遇</span>
              <span class="price-val">￥{{detail.salary}}k</span>
            </div>
            <el-row class="course-btn">
              <el-button v-if="haveRecruit" type="primary" disabled>已报名</el-button>
              <el-button v-else-if="isLogin" type="danger" @click="enlist">立即报名</el-button>
              <el-button v-if="!isLogin" type="text">登录后才可报名</el-button>
              <el-button v-if="detail.isDel==1" type="info" disabled>已停止招募</el-button>
            </el-row>
          </div>
        </div>
      </div>


      <!-- ************购买框************ -->

      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <div>
          <p>确定报名？</p>
          <br>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="confirm" type="primary">确 定 报 名</el-button>
        </span>
      </el-dialog>

    </el-card>

    <el-dialog title="青旅简介" :visible.sync="showHostel" width="45%">
      <div class="hostel-detail">
        <h3>{{hostel_detail.name}}</h3>
        <el-tag>{{hostel_detail.province}}</el-tag>
        <p>简介：{{hostel_detail.desp}}</p>
        <p>具体地址：{{hostel_detail.address}}</p>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, i) in hostel_detail.photos" :key="i">
            <img style="width: 100% ;height: 100%" :src="item" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getRecruit,
    createOrder,
    checkOrderExist
  } from '@/api/recruit'
  import {
    getHostelList
  } from '@/api/hostel'
  export default {
    name: "course",
    components: {},
    data() {
      return {
        id: this.$route.query.id,
        detail: {},
        listLoading: false,
        haveRecruit: false,
        dialogVisible: false,
        haveFav: false,
        favCount: 0,
        showHostel: false,
        hostel_detail: {}
      };
    },
    methods: {

      fetchData() {
        var vm = this;
        getRecruit({
          id: vm.id
        }).then(res => {
          this.detail = res.data[0]
          getHostelList({
            id: vm.detail.hostel_id
          }).then(res => {
            vm.hostel_detail = res.data[0]
            let photos = JSON.parse(JSON.parse(vm.hostel_detail.photos))
            vm.hostel_detail.photos = photos
          })
        })
        checkOrderExist({
          stu_id: vm.userInfo.stu_id,
          recruit_id: vm.id
        }).then(res => {
          vm.haveRecruit = res.data.exist
        })

      }
    },
    created() {
      // this.fetchData()
      var vm = this;
        getRecruit({
          id: vm.id
        }).then(res => {
          this.detail = res.data[0]
          getHostelList({
            id: vm.detail.hostel_id
          }).then(res => {
            vm.hostel_detail = res.data[0]
            let photos = JSON.parse(JSON.parse(vm.hostel_detail.photos))
            vm.hostel_detail.photos = photos
          })
        })
        checkOrderExist({
          stu_id: vm.userInfo.stu_id,
          recruit_id: vm.id
        }).then(res => {
          vm.haveRecruit = res.data.exist
        })

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

    },
    methods: {
      enlist() {
        this.dialogVisible = true
      },
      confirm() {
        var vm = this
        createOrder({
          stu_id: vm.userInfo.stu_id,
          recruit_id: vm.id
        }).then(res => {
          if(res.title == '未审核') {
            this.$message({
            showClose: true,
            message: res.title,
            type: 'warning'
          });
            return false
          }
          this.dialogVisible = false
          this.$message({
            showClose: true,
            message: res.title,
            type: 'success'
          });
          vm.$router.push({path: '/recruitlist'})
          vm.fetchData()
        })
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
      float: left;
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
          margin-top: 20px;

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

  .hostel-detail {
    h3 {
      font-weight: normal;
      font-size: 20px;
    }
  }

</style>
