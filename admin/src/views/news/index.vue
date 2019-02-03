<template>
  <div class="app-container" v-loading.body="listLoading">
   <el-button type="primary" plain @click="addNews">添加资讯</el-button>
   <Moduletable :list="list" :label="label" :update-row='updateRow' :delete-row='deleteRow'></Moduletable>
   <Dialogtable :actionUrl="actionUrl" :list="list" :type="type" :form="form" :label="label" ref="dial" @commitform='commitForm'></Dialogtable>
  </div>

</template>

<script>
import { getNewsList, getNewsType, updateNews, delNews ,getHTML} from "@/api/news";
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
      currentType:'',
      articleUrl:'',
      actionUrl:"http://127.0.0.1:3000/updateNewsCover",
      label: {
        moudleId:"资讯ID",
        moduleName: "资讯标题名称",
        moduleDesp: "资讯描述",
        moudleType: "资讯类型",
        content:"文章内容",
        avatar:"封面",
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
    this.getClass();
  },
  methods: {
    // 添加新资讯
    addNews(){
      this.$refs.dial.noshow();
    },
    // 获取资讯类型
    getClass() {
      var vm = this;
      this.listLoading = true;
      var arr = [];
      getNewsType().then(response => {
        response.data.map((item,index)=>{
          arr[index]={
            id:item.id,
            name:item.news_type_name
          }
        })
        vm.type=arr;
      });
      
    },
    // 获取数据
    fetchData() {
      var vm = this;
      this.listLoading = true;
      var data = [];
      getNewsList().then(response => {
        response.data.map((item, index) => {
          data[index] = {
            id: item.id,
            name: item.news_name,
            desp: item.news_desp,
            url: item.article_url,
            type: item.news_type_name,
            typeVal: item.news_type_id,
            content:item.content,  // TODO这里传到后台是一堆html标签，应该要去掉空格，需要正则表达式，以此节省后台资源空间
            avatar: item.cover
          };
        });
        console.log(JSON.stringify(data))
        vm.list=data;
        this.listLoading = false;
      });
    },
    // 删除模块
    deleteRow(index, rows) {
      let data = rows[index].id; //删除新闻
      this.$confirm("是否确定将该条资讯删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delNews(data).then(response => {
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
        });
      }).catch(()=>{
        this.$message({
            type: 'info',
            message: '已取消删除'
          });  
      })
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
      this.form.url = rows[index].url;
      this.form.desp = rows[index].desp;
      this.form.category_id = rows[index].category_id;
      this.form.content = rows[index].content;
      this.form.avatar = rows[index].avatar;
      this.$refs.dial.noshow();
      console.log("执行更改程序");
    },
    commitForm() {
      // 更改模块的表单提交;
      let data = this.form;

      updateNews(data).then(response => {
        this.$refs.dial.noshow();
        this.fetchData();
        this.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
  }
};
</script>
