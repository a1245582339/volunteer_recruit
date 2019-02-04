<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar></navbar>
      <nav-head :headerIndex="headerIndex"></nav-head>
      <app-main @listenActiveIndex="listenActiveIndex" style="margin:50px auto 0;width:1126px"></app-main>
      <footer-bar style="margin-top:50px"></footer-bar>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain, NavHead, FooterBar } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain,
    NavHead,
    FooterBar
  },
  data(){
    return{
      headerIndex:''
    }
  },
  computed: {
  },
  methods:{
    listenActiveIndex(data){
     this.headerIndex=data;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
