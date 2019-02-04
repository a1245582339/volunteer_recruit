<template>
  <div v-loading="listLoading">
    
  <el-card class="recruit">
      <div slot="header" class="clearfix">
        <el-input placeholder="请输入内容" v-model="searchWord" style="width:500px">
         </el-input>
    <el-button slot="append" icon="el-icon-search" @click="fetchData"></el-button>
      </div>
        <div v-if="list.length==0" style="height:325px;line-height:326px;text-align:center;margin-bottom: 30px;" :span="24">{{'很抱歉>__< 暂无数据'}}</div>
        <div v-else>
            <div v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">
              <list-item :item="item" />
            </div>
        </div>
  </el-card>
  </div>
</template>

<script>
import { getRecruit } from "@/api/recruit";
import listItem from './listItem'
export default {
  name: "recruit",
  components: {
    listItem
  },
  data() {
    return {
      list: [],
      listLoading: false,
      searchWord: ''
    };
  },
  computed: {},
  created() {
    this.fetchData();
    this.$emit("listenActiveIndex", "course");
  },
  methods: {
    fetchData(){
      var vm = this
      getRecruit({searchWord: vm.searchWord}).then(res => {
        
        vm.list = res.data.filter(item => {
          return item.ischecked == 1
        })
      })
    },
    toDetail(id){
      this.$router.push({
        name: "recruitdetail",
        query: {
          id: id
        }
      })
      
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
.recruit {
  width: 1126px;
  margin: 30px auto 0;
  .price{
    font-size: 18px;
    color: rgb(252, 0, 0);
  }
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
