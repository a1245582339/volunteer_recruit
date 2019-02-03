<template>
  <div class="app-container" v-loading.body="listLoading">
   <Moduletable :cannotEdit="cannotEdit" :cannotDel="cannotDel" :list="list" :label="label"></Moduletable>
</div>

</template>

<script>
import { getNewsFavorite} from "@/api/favorite";
import Moduletable from "@/components/table/table";
export default {
  components: {
    Moduletable
  },
  data() {
    return {
      list: [],
      listLoading: true,
      cannotEdit:true,
      cannotDel:true,
      label: {
        moudleId: "收藏夹ID",
        moduleName: "学生用户名",
        moduleDesp: "资讯",
        moudleCreatTime: "创建时间",
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
      getNewsFavorite().then(response => {
        response.data.map((item, index) => {

          var create_time=vm.timestampToTime(item.create_time)

          data[index] = {
            id: item.id,
            name: item.stu_name,
            desp: item.news_name,
            create_time: create_time
          };
        });
        vm.list = data;
        this.listLoading = false;
      });
    }
  }
};
</script>
