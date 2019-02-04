<template>
  <div class="wrap">
    <div>
      <p class="title">
        {{item.recruit_title}}
      </p>
      <span class="salary">
       薪资待遇： {{item.salary}}k
      </span>
    </div>
    <div style="margin-top: 5px;color: #909399">
      <p class="host-name">
        青旅名称：{{item.hostel_name}}
      </p>
      <span>
       发布时间： {{item.create_time | timestampToTime}}
      </span>
    </div>

  </div>
</template>
<script>
  export default {
    props: {
      item: Object
    },
    filters: {
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
    }
  }

</script>
<style lang="scss" scoped>
  .wrap {
    border-top: 1px solid #DCDFE6;
    padding: 15px;
    cursor: pointer;
    div{
        overflow: hidden;
    }
    p {
      margin: 0;
      float: left;
    }
    span {
        float: right;
    }
    .title {
      color: #303133;
      font-size: 20px;
    }
    .salary {
        color: #F56C6C;
        font-size: 20px;
    }
  }

</style>
