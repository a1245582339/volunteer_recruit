<template>
  <div style="min-height: 100%">
    <div style="min-height: 100%" v-if="$store.state.isLogin">
      <el-container>
        <el-aside style="padding: 20px" width="40%">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
            </div>
            <div>
              <user-card :user_info="$store.state.user_info" />
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <div class="index-bg">

          </div>
        </el-main>
      </el-container>
    </div>
    <div v-else>
      <el-container>
        <el-aside style="padding: 20px" width="40%">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>登录</span>
            </div>
            <el-form :model="log" ref="log" label-width="20%" status-icon :rules="checkLog">

              <el-form-item label="用户名" prop="logUserName">
                <el-input v-model="log.user_name" auto-complete="off" placeholder="请输入用户名"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="logPass">
                <el-input type="password" v-model="log.password" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>

              <el-form-item label="自动登录">
                <el-switch v-model="log.autoLogin"></el-switch>
              </el-form-item>
            </el-form>
            <div class="footer">
              <el-button @click="loginVisible = false">取 消</el-button>
              <el-button type="primary" @click="logSubmit('log')">确 定</el-button>
            </div>
          </el-card>

        </el-aside>
        <el-main>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>注册</span>
            </div>
            <el-form :model="reg" ref="reg" label-width="15%" status-icon :rules="checkReg">

              <el-form-item label="用户名" prop='regUserName'>
                <el-input v-model="reg.user_name" auto-complete="off" placeholder="请输入用户名"></el-input>
                <el-button :disabled="checkNameDisabled" style="margin-top:10px" type="primary" @click="checkNameIfExist">验证用户名</el-button>

                <span v-if="nameCanReg==1" style="color:#67C23A">
                  <span class="el-icon-circle-check-outline"></span> 恭喜您，该用户名可以注册</span>
                <span v-if="nameCanReg==2" style="color:#F56C6C">
                  <span class="el-icon-circle-close-outline"></span> 很抱歉，该用户名已被注册</span>
              </el-form-item>

              <el-form-item label="密码" prop="regPass">
                <el-input type="password" v-model="reg.password" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="reg.checkPass" auto-complete="off" placeholder="请重新输入密码"></el-input>
              </el-form-item>

              <el-form-item label="手机号" prop="tel">
                <el-input v-model="reg.tel" auto-complete="off" placeholder="请输入您的手机号"></el-input>
              </el-form-item>

              <el-form-item label="性别" prop="sex">
                <el-select v-model="reg.sex" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>

            </el-form>
            <div class="footer">
              <el-button @click="regVisible = false">取 消</el-button>
              <el-button type="primary" @click="regSubmit('reg')">确 定</el-button>
            </div>
          </el-card>

        </el-main>
      </el-container>
    </div>
  </div>

</template>

<script>
  import {
    checkNameExist,
    register,
    login,
    getInfo,
    checkIfSigned,
    signIn
  } from '@/api/loginAndReg'
import {
    setToken,
    removeToken,
    getToken
  } from '@/utils/auth'
import userCard from '@/components/userCard/index'
  export default {
    name: 'index',
    components: {
      userCard
    },
    data() {
      var vm = this
      var validateRegUserName = (rule, value, callback) => {
        var value = vm.reg.user_name
        if (value === '') {
          vm.checkNameDisabled = true
          callback(new Error('请输入用户名'))
        } else if (value.length > 16 || value.length < 4) {
          vm.checkNameDisabled = true
          callback(new Error('用户名长度应在5-16字符之间'))
        } else if (!/^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9].{3,14}$/.test(value)) {
          vm.checkNameDisabled = true
          callback(new Error('用户名只能以汉字、字母开头'))
        } else {
          vm.checkNameDisabled = false
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        var value = vm.reg.password
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
          callback(
            new Error(
              '密码须以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
            )
          )
        } else {
          if (this.reg.checkPass !== '') {
            this.$refs.reg.validateField('checkPass')
          }
          callback()
        }
      }
      var validatelogUserName = (rule, value, callback) => {
        var value = vm.log.user_name
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      var validatelogPass = (rule, value, callback) => {
        var value = vm.log.password
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
          callback(
            new Error(
              '密码须以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
            )
          )
        } else {
          if (this.reg.checkPass !== '') {
            this.$refs.reg.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        var value = vm.reg.checkPass
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.reg.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var validateTel = (rule, value, callback) => {
        var value = vm.reg.tel
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          value
        )) {
          // 手机号码正则匹配更新到2018.1，支持166网段
          callback(new Error('请输入正确手机号码!'))
        } else {
          callback()
        }
      }
      return {
        isLogin: false,
        log: {
          user_name: '',
          password: '',
          autoLogin: false
        },
        reg: {
          user_name: '',
          password: '',
          checkPass: '',
          sex: '',
          tel: '',
          avatar: ''
        },
        checkLog: {
          logUserName: [{
            required: true,
            validator: validatelogUserName,
            trigger: 'blur'
          }],
          logPass: [{
            required: true,
            validator: validatelogPass,
            trigger: 'blur'
          }]
        },
        checkReg: {
          regPass: [{
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }],
          tel: [{
            required: true,
            validator: validateTel,
            trigger: 'blur'
          }],
          regUserName: [{
            required: true,
            validator: validateRegUserName,
            trigger: 'change'
          }],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }]
        },
        user_name: '', // 当前用户名
        nameCanReg: 0, // 输入的用户名是否已注册,1是可以注册，2是已被占用
        checkNameDisabled: true, // 检查用户名按钮，没填东西不能点
        loginDisable: true // 登录按钮，没填完信息不能点
      }
  },
    computed: {},
    created() {
      this.$emit('listenActiveIndex', 'index')
    },
    methods: {
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y + M + D + h + m + s
      },
      checkNameIfExist() {
        var vm = this
        checkNameExist({
          name: this.reg.user_name
        }).then(response => {
          vm.nameCanReg = response.data
        })
      },
      logSubmit(formName) {
        var vm = this
        this.$refs[formName].validate(valid => {
          if (valid) {
            login(vm.log)
              .then(response => {
                var token = response.data.token
                if (vm.log.autoLogin) {
                  setToken(token)
                }
                getInfo({
                  token: token
                }).then(res => {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  vm.loginVisible = false
                  vm.$store.commit('toLogin', res.data[0])
                // checkIfSigned({
                //   stu_id: res.data[0].id
                // }).then(response => {
                //   vm.haveSign = response.data.haveSign
                // })
                })
              })
              .catch(err => {
                this.$message.error('用户名或密码错误，请重试')
              })
          } else {
            this.$message.error('请正确填写登录信息！')
            return false
          }
        })
      },
      regSubmit(formName) {
        var vm = this
        if (this.nameCanReg != 1) {
          this.$message({
            message: '请先通过用户名检验！',
            type: 'warning'
          })
          return false
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            register(vm.reg)
              .then(response => {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                vm.regVisible = false
              })
              .catch(err => {
                this.$message.error('手慢了哦，该用户名已被占用，换一个试试吧')
              })
          } else {
            this.$message.error('请正确填写注册信息！')
            return false
          }
        })
      }
    },
    mounted() {}
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .index-bg{
    background-image: url('../../assets/index_bg.jpg');
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .el-col-offset-2 {
    margin-left: 65px
  }

  .footer {
    text-align: center
  }

</style>
