<template>
<div>
  <el-menu router :default-active="headerIndex" class="nav" mode="horizontal" @select="handleSelect">
  
  <el-menu-item index="index">首页</el-menu-item>
  
  <el-submenu index="2">

      <template slot="title">
        视频课程
      </template>
 
    <el-menu-item class="navitem" index="course" :route="{name:'courselist'}">全部课程</el-menu-item>
    <el-menu-item class="navitem" v-for="(item,index) in courseClass" :key="item.id" :index="index+'2'" :route="{name:'courselist',params:{classid:item.id}}">{{item.course_class_name}}</el-menu-item>
  </el-submenu>

  <!-- <el-submenu index="3">
    <template slot="title">IT资讯</template>
    <el-menu-item class="navitem" index="news" :route="{name:'news'}">全部资讯</el-menu-item>
    <el-menu-item class="navitem" v-for="(item,index) in newsType" :key="item.id" :index="index+'3'" :route="{name:'news',params:{typeid:item.id}}">{{item.news_type_name}}</el-menu-item>
  </el-submenu> -->

  <el-menu-item index="me" :route="{name:'me'}">个人资料</el-menu-item>

  <el-menu-item index="order" :route="{name:'order'}">订单管理</el-menu-item>
</el-menu>
</div>
</template>

<script>
import { courseClassList, getNewsType } from "@/api/type";
export default {
  props:{
    headerIndex:String // 传给headerIndex的值必须是子组件的index,值动态绑定到组件里
  },
  data() {
    return {
      courseClass: [],
      newsType: []
    };
  },
  components: {},
  created() {
    this.fetchCourseClass();
    this.fetchNewsType();
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {

    },
    fetchCourseClass() {
      courseClassList().then(response => {
        this.courseClass = response.data;
      });
    },
    fetchNewsType() {
      getNewsType().then(response => {
        this.newsType = response.data;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav {
  width: 1126px;
  margin: 0 auto;
}
</style>

