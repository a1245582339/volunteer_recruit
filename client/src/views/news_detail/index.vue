<template>
  <div v-loading="listLoading">
    <el-card class="news">
      <!-- ************面包屑************ -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'news' }">新闻资讯</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'news' , params:{typeid:news.news_type_id}}">{{news.news_type_name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{news.news_name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- ************资讯************ -->
      <div class="news">
        <h1 class="news-title">{{news.news_name}}</h1>
        <div v-if="isLogin" class="fav">
          <span @click="cancelFav" style="cursor: pointer;" v-if="haveFav">
            <span style="color:#f7ba2a" class="el-icon-star-on"></span>
            <span style="color:#303133;font-size:14px;"> 已收藏</span>
          </span>
          <span @click="addFav" style="cursor: pointer;" v-else>
            <span style="color:#f7ba2a" class="el-icon-star-off"></span>
            <span style="color:#303133;font-size:14px;"> 收藏</span>

          </span>
          <span style="color:#909399;font-size:14px;">收藏量：{{favCount}}</span>
        </div>
        <p class="news-desp">简介：{{news.news_desp}}</p>
        <img class="news-cover" :src="news.cover" alt="">
        <div v-html="news.content"></div>
      </div>

    </el-card>

  </div>
</template>

<script>
import { getNewsById, addPageView } from "@/api/news";
import { checkNewsFav,addNewsFav,cancelNewsFav } from "@/api/favorite";
export default {
  name: "news",
  data() {
    return {
      news: [],
      listLoading: false,
      haveFav: false,
      favCount: 0
    };
  },
  watch: {
    isLogin(val1, val2) {
      if (val1) {
        var news_id = this.getQueryVariable("newsid");
        this.fetchFav(news_id, this.$store.state.user_info.stu_id);
      }
    }
  },
  created() {
    var vm = this;
    var news_id = this.getQueryVariable("newsid");
    if (!news_id) {
      this.$router.push("/404");
    } else {
      this.fetchNews(news_id);

      this.$emit("listenActiveIndex", "news");
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
    fetchNews(id) {
      var vm = this;
      vm.listLoading = true;
      getNewsById({
        id: id
      }).then(response => {
        vm.news = response.data;
        vm.listLoading = false;
        vm.visit(); // 增加浏览量
      }).catch(err =>{
        vm.$router.push('/404')
      });
    },
    visit() {
      var vm = this;
      if (vm.userInfo.stu_id) {
        var stu_id = vm.userInfo.stu_id;
      } else {
        var stu_id = -1;
      }
      addPageView({
        news_id: vm.news.id,
        stu_id: stu_id
      });
    },
    fetchFav(news_id, stu_id) {
      var vm = this;
      checkNewsFav({
        news_id: news_id,
        stu_id: stu_id
      }).then(response => {
        vm.haveFav = response.data.exist;
        vm.favCount = response.data.count;
      });
    },
    addFav() {
      var vm = this;
      var news_id = this.getQueryVariable("newsid");
      var stu_id = this.$store.state.user_info.stu_id;
      addNewsFav({ news_id: news_id, stu_id: stu_id }).then(response => {
        vm.haveFav = true;
        if (response.title == "添加成功") {
          vm.favCount++;
        }
        this.$message({
          message: "添加收藏成功",
          type: "success"
        });
      });
    },
    cancelFav() {
      var vm = this;
      var news_id = this.getQueryVariable("newsid");
      var stu_id = this.$store.state.user_info.stu_id;
      cancelNewsFav({ news_id: news_id, stu_id: stu_id }).then(response => {
        vm.haveFav = false;
        if (response.title == "取消成功") {
          vm.favCount--;
        }
        this.$message({
          message: "取消收藏成功",
          type: "success"
        });
      });
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.news {
  margin-top: 50px;
  .news-title {
    text-align: center;
  }
  .news-desp {
    color: #606266;
    font-size: 14px;
  }
  .news-cover {
    display: block;
    width: 500px;
    height: 300px;
    margin: 0 auto;
  }
  .fav {
    width: 140px;
    margin: 10px 0 10px;
  }
}
</style>
