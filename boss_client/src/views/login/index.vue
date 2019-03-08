<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form" style="margin:120px 0 120px 50%">
      <h3 class="title">登录</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
      </div>
    </el-form>


    <el-form autoComplete="on" :model="regForm" :rules="regRules" ref="regForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">注册</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="regForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" v-model="regForm.password" autoComplete="on" placeholder="password"></el-input>
      </el-form-item>
      <el-form-item type="number" prop="tel">
        <span class="svg-container">
          <i class="el-icon-phone"></i>
        </span>
        <el-input name="tel" v-model="regForm.tel" autoComplete="on" placeholder="telephone"></el-input>

      </el-form-item>
      <el-form-item prop="sex">
        <el-select class="sex-select" v-model="regForm.sex" placeholder="请选择">
          <el-option v-for="(item, index) in sexArr" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="regloading" @click.native.prevent="handleReg">
          注册
        </el-button>
      </el-form-item>
      <div class="tips">
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    isvalidUsername
  } from '@/utils/validate'
  import { register } from '@/api/user'
  export default {
    name: 'login',
    data() {
      var vm = this
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
  
      const validatePass = (rule, value, callback) => {
        var value = vm.regForm.password
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
          callback(
            new Error(
              '密码须以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
            )
          )
        } else {
          callback()
        }
      }
      const validateTel = (rule, value, callback) => {
        var value = vm.regForm.tel
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (
          !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
            value
          )
        ) {
        // 手机号码正则匹配更新到2018.1，支持166网段
          callback(new Error('请输入正确手机号码!'))
        } else {
          callback()
        }
      }
      return {
        sexArr: ['男', '女'],
        loginForm: {
          username: '测试boss1',
          password: 'aaaaaa'
        },
        regForm: {
          username: '',
          password: '',
          tel: '',
          sex: ''
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur'
          }],
          password: [{
            required: true,
            trigger: 'blur'
          }]
        },
        regRules: {
          username: [{
            required: true,
            trigger: 'blur',
            min: 5,
            max: 15,
            message: '长度在 5 到 15 个字符'
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }],
          tel: [{
            required: true,
            trigger: 'blur',
            validator: validateTel
          }]
        },
        loading: false,
        regloading: false,
        pwdType: 'password'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({
                path: '/'
              })
            }).catch(() => {
              this.$router.push({
                path: '/'
              })
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleReg() {
        var vm = this
        this.$refs.regForm.validate(valid => {
          if (valid) {
            this.regloading = true
            register(vm.regForm).then(res => {
              this.regloading = false
              this.$message({
                showClose: true,
                message: '注册成功，请等待管理员审核后登录',
                type: 'success'
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 30%;
      padding: 35px 35px 15px 35px;
      margin: 120px;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }

  .sex-select {
    width: 110%;
  }

</style>
