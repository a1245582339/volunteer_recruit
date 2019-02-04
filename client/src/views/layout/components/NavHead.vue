<template>
<div>
  <el-menu router :default-active="headerIndex" class="nav" mode="horizontal" @select="handleSelect">
  
  <el-menu-item index="index">首页</el-menu-item>

  <el-menu-item index="recruit" :route="{name:'recruitlist'}">招募信息列表</el-menu-item>
  
  <el-menu-item index="order" :route="{name:'order'}">我的报名</el-menu-item>
  
  <el-menu-item index="me" :route="{name:'me'}">个人资料</el-menu-item>
</el-menu>
</div>
</template>

<script>
export default {
  props: {
    headerIndex: String // 传给headerIndex的值必须是子组件的index,值动态绑定到组件里
  },
  data() {
    return {
    }
  },
  components: {},
  created() {
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav {
  width: 1126px;
  margin: 0 auto;
}
</style>

