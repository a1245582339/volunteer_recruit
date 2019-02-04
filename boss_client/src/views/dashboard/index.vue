<template>
  <div class="dashboard-container">
    <div>欢迎进入</div>
    <div class="dashboard-text">用户名:{{name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'welcome',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'tel',
      'sex'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  font-size: 14px;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
