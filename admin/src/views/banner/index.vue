<template>
  <div style="margin-top:50px;margin-left:50px;width:1000px">
    <el-button type="primary" @click="submit">提交</el-button>
    <p>将需要设置为轮播的课程拖拽至右侧</p>
    <div class="dndList">
      <div class="dndList-list" :style="{width:width1}">
        <h3>{{list1Title}}</h3>
        <draggable :list="list1" class="dragArea" :options="{group:'article'}">
          <div class="list-complete-item" v-for="item in list1" :key='item.id'>
            <div class="list-complete-item-handle">{{item.course_name}}</div>
          </div>
        </draggable>


      </div>
      <div class="dndList-list" :style="{width:width2}">
        <h3>{{list2Title}}</h3>
        <draggable :list="filterList2" class="dragArea" :options="{group:'article'}" @change="onchange">
          <div class="list-complete-item" v-for="item in filterList2" :key='item.id'>
            <div class='list-complete-item-handle2'>{{item.course_name}}</div>
          </div>
        </draggable>
      </div>
    </div>
    
  </div>

</template>
<script>
import { getCourseList } from "@/api/table";
import { updateCourse ,updateBanner} from "@/api/do";
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  computed: {
    filterList2() {
      return this.list2.filter(v => {
          return v;
      });
    }
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      list1: [],
      list2: [],
      list1Title: "课程列表",
      list2Title: "轮播列表",
      width1: "30%",
      width2: "30%"
    };
  },
  methods: {
    onchange() {
      this.filterList2.map(item =>{
        item.isBanner = 1
      })
      this.list1.map(item =>{
        item.isBanner = 0
      })
    },
    submit() {
      var newArr = this.list1.concat(this.filterList2)
      updateBanner({data:newArr}).then(response => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
    // 获取数据
    fetchData() {
      var vm = this;
      this.listLoading = true;
      var data1 = [];
      var data2 = [];
      getCourseList().then(response => {
        response.data.map((item, index) => {
          if (item.isBanner == 0) {
            data1.push({id:item.id,course_name:item.course_name,isBanner:item.isBanner});
          } else {
            data2.push({id:item.id,course_name:item.course_name,isBanner:item.isBanner});
          }
        });
        vm.list1=data1;
        vm.list2=data2;
        this.listLoading = false;
      });
    },

    isNotInList1(v) {
      return this.list1.every(k => v.id !== k.id);
    },
    isNotInList2(v) {
      return this.list2.every(k => v.id !== k.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
