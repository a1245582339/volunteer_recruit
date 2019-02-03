<template>
  <div v-loading="listLoading">

   <div>
    <el-radio-group @change="typeChange" v-model="radio">
      <el-radio-button label=-1>全部资讯</el-radio-button>
      <el-radio-button v-for="(item, index) in newsType" :key="index" :label="item.id">{{item.news_type_name}}</el-radio-button>
    </el-radio-group>
  </div>

  <el-card class="course">
      <div slot="header" class="clearfix">
      </div>
      <el-row>
        <el-col v-if="newsRow.length==0" style="height:325px;line-height:326px;text-align:center;margin-bottom: 30px;" :span="24">{{'很抱歉>__< 暂无数据'}}</el-col>
      </el-row>
      <el-row v-for="(item,i) in newsRow" :key="i+'row'">
        <el-col :span="7" v-for="(o, index) in newsRow[i]" :key="o.id" :offset="index > 0 ? 2 : 0">
          <el-card class="course-card" :body-style="{ padding: '0px' }">
            <img :src="o.cover" class="image">
            <div style="padding: 14px;">
              <p class="card-title">{{o.news_name}}</p>
              <p class="card-desp">{{o.news_desp}}</p>
              <div class="bottom clearfix">
                <time class="time">{{o.date}}</time>
                <el-button type="text" class="button" @click="toDetail(o.id)">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
  </el-card>
  </div>
</template>

<script>
import { getNewsList, getNewsBytype } from "@/api/news";
import { getNewsType } from "@/api/type";

export default {
  name: "news",
  data() {
    return {
      newsType: [],
      news: [],
      newsRow: [],
      radio: -1,
      listLoading: false
    };
  },
  computed: {},
  created() {
    this.fetchNewsType();
    this.$emit("listenActiveIndex", "news");
    if (this.$route.params.typeid) {
      this.radio = this.$route.params.typeid;
      this.typeChange(this.$route.params.typeid);
    } else {
      this.fetchNews();
    }
  },
  methods: {
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
    fetchNews() {
      var vm = this;
      vm.listLoading = true;
      getNewsList().then(response => {
        this.newsRow = [];
        this.news = response.data;
        response.data.map((item, index) => {
          this.news[index].date = vm.timestampToTime(
            response.data[index].create_time
          );
        });
        for (let i = 0; i < this.news.length; i += 3) {
          this.newsRow.push(this.news.slice(i, i + 3)); // 每三个一组，放到同一行
        }
        vm.listLoading = false;
      });
    },
    fetchNewsType() {
      var vm = this;
      vm.listLoading = true;
      getNewsType().then(response => {
        this.newsType = response.data;
        vm.listLoading = false;
      });
    },
    typeChange(id) {
      var vm = this;
      vm.listLoading = true;
      if (id == -1) {
        console.log("选中的全部资讯");
        this.fetchNews();
      } else {
        getNewsBytype({ id: id }).then(response => {
          if (response.data.length == 0) {
            vm.newsRow = [];
          } else {
            vm.news = response.data;
            console.log(JSON.stringify(vm.news))
            response.data.map((item, index) => {
              vm.news[index].date = vm.timestampToTime(
                response.data[index].create_time
              );
            });
            vm.newsRow = [];
            for (let i = 0; i < this.news.length; i += 3) {
              
              vm.newsRow.push(this.news.slice(i, i + 3)); // 每三个一组，放到同一行
              console.log(i)
            }
            console.log(JSON.stringify(vm.newsRow))
          }
          vm.listLoading = false;
        });
      }
    },
    toDetail(id){
      var vm=this
      for(let i =0;i<vm.news.length;i++){
        if(vm.news[i].id==id){
          this.$router.push("/newsdetail?newsid="+id)
        }
      }
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.block {
  width: 1126px;
  margin: 0 auto;
}
.banner {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .banner-title {
    position: absolute;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    text-align: center;
    h3 {
      margin: 0;
      color: #fff;
      line-height: 30px;
    }
  }
}
.read-more {
  float: right;
  color: #0366d6;
}
.course {
  width: 1126px;
  margin: 30px auto 0;
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
  .card-title {
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .card-desp {
    font-size: 14px;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
}
.el-col-offset-2 {
  margin-left: 65px;
}
.el-col-7 {
  margin-bottom: 30px;
}
</style>
