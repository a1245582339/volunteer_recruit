<template>
  <div class="app-container" v-loading.body="listLoading">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-button type="primary" @click="update">提交更改</el-button>
      </div>
      <div>
        <span>用户名：</span>
        <el-input class="el-input" v-model="user_info.boss_name" disabled></el-input>
        <br>
        <!-- <span>密码：</span> <el-input class="el-input" v-model="password" placeholder="修改密码请在此处输入原密码并验证"></el-input> <el-button @click="check">验证</el-button><br> -->
        <span>电话号码：</span>
        <el-input class="el-input" v-model="user_info.tel"></el-input>
        <br>
        <span>性别：</span>
        <el-select class="el-input" v-model="user_info.sex" placeholder="请选择">
          <el-option v-for="(item, index) in sex" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
    </el-card>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
        <el-button type="primary" @click="changePassword" :disabled="passwordDis">提交更改</el-button>
      </div>
      <div>
        <span>原密码：</span>
        <el-input class="el-input" v-model="password" placeholder="修改密码请在此处输入原密码并验证"></el-input>
        <el-button @click="check">验证</el-button>
        <br>
        <span>新密码：</span>
        <el-input class="el-input" v-model="newPassword" :disabled="passwordDis"></el-input>
        <br>
        <span>确认密码：</span>
        <el-input class="el-input" v-model="repeatPassword" :disabled="passwordDis"></el-input>
        <br>

      </div>
    </el-card>
  </div>

</template>

<script>
  import {
    checkPassword,
    updateBoss,
    updatePassword
  } from '@/api/user'
  export default {
    components: {},
    data() {
      return {
        password: '',
        newPassword: '',
        repeatPassword: '',
        user_info: this.$store.state.user,
        listLoading: false,
        sex: ['男', '女'],
        passwordDis: true
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      // 获取数据
      fetchData() {

      },
      update() {
        var vm = this
        updateBoss(vm.user_info).then(res => {
           this.$message({
              message: '修改成功',
              type: 'success'
            });
        })
      },
      check() {
        var vm = this
        checkPassword({
          id: vm.user_info.id,
          password: this.password
        }).then(res => {
          if (res.type == 'success') {
            this.$message({
              message: '验证成功，请修改密码',
              type: 'success'
            });
            vm.passwordDis = false
          } else {
            this.$message.error('验证失败，请重新输入原密码');
            vm.passwordDis = true
          }
        })
      },
      changePassword() {
        var vm = this
        if (!/^[a-zA-Z]\w{5,17}$/.test(vm.newPassword)) {
          this.$message.error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线！');
        } else if(vm.newPassword != vm.repeatPassword) {
          this.$message.error('两次密码不一致，请重新输入');
        } else {
          updatePassword({id: vm.user_info.id, password: vm.newPassword}).then(res => {
            this.$message({
              message: '更改成功',
              type: 'success'
            });
          })
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  .box-card {
    width: 80%;
    margin-bottom: 50px;
  }

  .el-input {
    width: 30%;
    margin-top: 10px;
  }

  span {
    display: inline-block;
    width: 20%
  }

</style>
