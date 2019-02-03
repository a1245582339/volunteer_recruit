<template>
  <div v-loading="listLoading">

   <div>
    <el-radio-group @change="classChange" v-model="radio">
      <el-radio-button label=-1>全部课程</el-radio-button>
      <el-radio-button v-for="(item, index) in courseClass" :key="index" :label="item.id">{{item.course_class_name}}</el-radio-button>
    </el-radio-group>
  </div>

  <el-card class="course">
      <div slot="header" class="clearfix">
      </div>
      <el-row>
        <el-col v-if="courseRow.length==0" style="height:325px;line-height:326px;text-align:center;margin-bottom: 30px;" :span="24">{{'很抱歉>__< 暂无数据'}}</el-col>
      </el-row>
      <el-row v-for="(item,i) in courseRow" :key="i+'row'">
        <el-col :span="7" v-for="(o, index) in courseRow[i]" :key="o.id" :offset="index > 0 ? 2 : 0">
          <el-card class="course-card" :body-style="{ padding: '0px' }">
            <img :src="o.cover" class="image">
            <div style="padding: 14px;">
              <p class="card-title">{{o.course_name}}</p>
              <p class="card-desp">{{o.course_desp}}</p>
              <div class="bottom clearfix">
                <span class="price">￥{{o.course_price}}</span>
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
import { getCourse, getCourseByclass } from "@/api/course";
import { courseClassList } from "@/api/type";

export default {
  name: "course",
  data() {
    return {
      course: [],
      courseClass: [],
      courseRow: [],
      radio: -1,
      listLoading: false
    };
  },
  computed: {},
  created() {
    this.fetchCourseClass();
    this.$emit("listenActiveIndex", "course");
    if (this.$route.params.classid) {
      this.radio=this.$route.params.classid
      this.classChange(this.$route.params.classid);
    } else {
      this.fetchCourse();
    }
  },
  methods: {
    fetchCourse() {
      var vm = this;
      vm.listLoading = true;
      getCourse().then(response => {
        this.courseRow = [];
        this.course = response.data;
        for (let i = 0; i < this.course.length; i += 3) {
          this.courseRow.push(this.course.slice(i, i + 3)); // 每三个一组，放到同一行
        }
        vm.listLoading = false;
      });
    },
    fetchCourseClass() {
      var vm = this;
      vm.listLoading = true;
      courseClassList().then(response => {
        this.courseClass = response.data;
        vm.listLoading = false;
      });
    },
    classChange(id) {
      var vm = this;
      vm.listLoading = true;
      if (id == -1) {
        console.log("选中的全部课程");
        this.fetchCourse();
      } else {
        getCourseByclass({ id: id }).then(response => {
          if (response.data.length == 0) {
            this.courseRow = [];
          } else {
            this.course = response.data;
            this.courseRow = [];
            for (let i = 0; i < this.course.length; i += 3) {
              this.courseRow.push(this.course.slice(i, i + 3)); // 每三个一组，放到同一行
            }
          }
          vm.listLoading = false;
        });
      }
    },
    toDetail(id){
      var vm=this
      for(let i =0;i<vm.course.length;i++){
        if(vm.course[i].id==id){
          this.$router.push("/coursedetail?courseid="+id)
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
