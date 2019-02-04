<template>
  <div>
    <img style="" :src="user_info.avatar" alt="">
    <ul>
        <li>
        <span class="label">学生编号</span>
        <span class="value">{{user_info.stu_id}}</span>
      </li>
        <li>
        <span class="label">用户昵称</span>
        <span class="value">{{user_info.volun_name}}</span>
      </li>
      <li>
        <span class="label">电话号码</span>
        <span class="value">{{user_info.tel}}</span>
      </li>
      <li>
        <span class="label">性别</span>
        <span class="value">{{user_info.sex}}</span>
      </li>
      <li>
        <span class="label">审核状态</span>
        <span class="value">{{user_info.ischecked ? '已审核' : '待审核'}}</span>
      </li>
    </ul>
  </div>

</template>
<script>
  export default {
    props: {
      user_info: Object
    }
  }

</script>
<style lang="scss" scoped>
  img {
    width: 100px;
    height: 100px;
  }

  ul {
    list-style: none;
    padding: 0;
    color: #606266;
    font-size: 1.1rem;
    li {
      margin-top: 3px;
      overflow: hidden;
      .label {
        float: left;
      }
      .value {
        float: right;
      }
    }
  }

</style>
