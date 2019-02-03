<template>
  <div class="app-container" v-loading.body="listLoading">
    <IEcharts class="echart" :option="bar"></IEcharts>
    <IEcharts class="echart" :option="line"></IEcharts>
  </div>

</template>

<script>
import { getNewsVisitLog, getNewsType, getNewsList } from "@/api/news";
import IEcharts from "vue-echarts-v3/src/lite.js";
export default {
  components: {
    IEcharts
  },
  data() {
    return {
      news: [],
      listLoading: false,
      bar: {
        title: {
          text: "历史一周资讯访问量折线图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          show: true,
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {},
        xAxis: {
          name: "资讯名称",
          type: "category",
          data: []
        },
        yAxis: {
          name: "访问量",
          type: "value",
          data: []
        },
        series: [
          {
            name: "Sales",
            type: "bar",
            data: []
          }
        ]
      },
      line: {
        title: {
          text: "历史一周资讯访问量折线图"
        },
        legend: {
          show: true,
          data: []
        },
        tooltip: {},
        xAxis: {
          name: "一周日期",
          type: "category",
          data: []
        },
        yAxis: {
          name: "访问量",
          type: "value"
        },
        series: []
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    getDateArr() {
      var timestamp = Date.parse(new Date());
      var day1 = this.timestampToTime(timestamp - 518400000);
      var day2 = this.timestampToTime(timestamp - 432000000);
      var day3 = this.timestampToTime(timestamp - 345600000);
      var day4 = this.timestampToTime(timestamp - 259200000);
      var day5 = this.timestampToTime(timestamp - 172800000);
      var day6 = this.timestampToTime(timestamp - 86400000);
      var day7 = this.timestampToTime(timestamp);
      var dateArr = [day1, day2, day3, day4, day5, day6, day7];
      return dateArr; // 获取过去七天的日期（含今天）
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    },
    // 获取数据
    fetchData() {
      var vm = this;
      this.listLoading = true;
      getNewsType().then(response => {
        getNewsList().then(response => {
          var barxAxis = [];
          for (let i = 0; i < response.data.length; i++) {
            vm.line.series.push({
              name: "",
              type: "line",
              tack: "总量",
              areaStyle: { normal: {} },
              data: [0, 0, 0, 0, 0, 0, 0]
            });
          }
          response.data.map((item, index) => {
            var data = response.data;
            vm.news = data;
            data.map((item, index) => {
              item.view_count = 0; //  给资讯的初始浏览量设置为0
              barxAxis[index] = item.news_name; // 给横轴加刻度
              vm.line.series[index].name = item.news_name; // 折线图的name
            });
          });
          vm.bar.xAxis.data = barxAxis; // 第一个柱状图的x轴
          vm.line.xAxis.data = vm.getDateArr(); // 第二个，折线图的x轴
          getNewsVisitLog({ duration: 604800 }).then(response => {
            //一周秒值
            var data = response.data;
            data.map((item, index) => {
              for (let i = -1; i < 6; i++) {
                if (
                  Math.floor(
                    (((new Date().getTime())+28800000) / 1000 - item.create_time) / 86400
                  ) ==
                  i + 1
                ) {
                  vm.line.series.map(o => {
                    if (o.name == item.news_info.news_name) {
                      o.data.reverse();
                      o.data[i + 1] += 1;
                      o.data.reverse();
                    }
                  });
                }
              }
              vm.news.map((o, i) => {
                if (item.news_info.news_name == o.news_name) {
                  o.view_count += 1;
                }
              });
            });
            var view_count = [];
            vm.news.map((item, index) => {
              view_count[index] = item.view_count;
            });
            vm.bar.series[0].data = view_count;
            vm.listLoading = false;
          });
        });
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.echart {
  width: 1000px !important;
  height: 300px !important;
}
</style>
