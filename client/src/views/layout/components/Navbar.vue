<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <!-- 侧边栏折叠按钮 -->
      <div style="width:1126px;margin:0 auto">
        <!-- ****************LOGO**************** -->
        <img style="height:40px;width:40px" :src="logo" alt="">
        <!-- ****************右侧下拉**************** -->
        <el-dropdown v-if="isLogin" class="avatar-container" trigger="hover">
          <div class="avatar-wrapper">
            <span style="color:#fff;font-size:20px;padding-right:10px;float:left">{{userInfo.stu_name}}</span>

            <img class="user-avatar" :src="userInfo.avatar">
          </div>

          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <img :src="userInfo.avatar">
            <span class="username">{{userInfo.stu_name}}</span>
            <!-- <el-button style="position:relative;top:-13px;left:10px" type="warning" icon="el-icon-star-off" size="mini" @click="toFav" round>收藏夹</el-button> -->
            <div class="userinfo-table">
              <el-form label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item class="table-item" label="积分">
                  <span>{{userInfo.balance}}</span>
                </el-form-item>
                <el-form-item class="table-item" label="审核状态">
                  <span style="color:#67C23A" v-if="userInfo.ischecked">已审核</span>
                  <span style="color:#F56C6C" v-else>待审核</span>
                </el-form-item>
              </el-form>
            </div>

  <!-- <el-button v-if="!haveSign" style="display:block;margin:0 auto" type="warning" @click="sign">每日签到</el-button>
   <el-button v-else style="display:block;margin:0 auto" type="info" disabled>今日已签到</el-button> -->
            <!-- 按钮组 -->
            <el-button-group style="margin-left:30px;margin-top:5px">
              <el-button @click="toMe">个人中心</el-button>
              <el-button @click="logout">退出登录</el-button>
            </el-button-group>
          </el-dropdown-menu>

        </el-dropdown>

        <div v-else class="avatar-container">
          <div style="margin-top:0" class="avatar-wrapper">
            <span style="margin-right: 20px" @click="login">登录</span>
            <span style="margin-right: 20px" @click="register">注册</span>

          </div>
        </div>
      </div>

    </el-menu>

    <!-- ****************登陆框**************** -->
    <el-dialog width="500px" title="登录" :visible.sync="loginVisible" center @close="logClose">
      <el-form :model="log" ref="log" label-width="30px" status-icon :rules="checkLog">

        <el-form-item label="用户名" :label-width="formLabelWidth" prop="logUserName">
          <el-input v-model="log.user_name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth" prop="logPass">
          <el-input type="password" v-model="log.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="自动登录" :label-width="formLabelWidth">
          <el-switch v-model="log.autoLogin"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginVisible = false">取 消</el-button>
        <el-button type="primary" @click="logSubmit('log')">确 定</el-button>
      </div>
    </el-dialog>



    <!-- ****************注册框**************** -->
    <el-dialog width="500px" title="注册" :visible.sync="regVisible" center @close="regClose">
      <el-form :model="reg" ref="reg" label-width="30px" status-icon :rules="checkReg">

        <el-form-item label="用户名" :label-width="formLabelWidth" prop='regUserName'>
          <el-input v-model="reg.user_name" auto-complete="off" placeholder="请输入用户名"></el-input>
          <el-button :disabled="checkNameDisabled" style="margin-top:10px" type="primary" @click="checkNameIfExist">验证用户名</el-button>

          <span v-if="nameCanReg==1" style="color:#67C23A">
            <span class="el-icon-circle-check-outline"></span> 恭喜您，该用户名可以注册</span>
          <span v-if="nameCanReg==2" style="color:#F56C6C">
            <span class="el-icon-circle-close-outline"></span> 很抱歉，该用户名已被注册</span>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth" prop="regPass">
          <el-input type="password" v-model="reg.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="reg.checkPass" auto-complete="off" placeholder="请重新输入密码"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="reg.tel" auto-complete="off" placeholder="请输入您的手机号"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="reg.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="regVisible = false">取 消</el-button>
        <el-button type="primary" @click="regSubmit('reg')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import logo from "@/assets/vue.png";
  import {
    checkNameExist,
    register,
    login,
    getInfo,
    checkIfSigned,
    signIn
  } from "@/api/loginAndReg";
  import {
    setToken,
    removeToken,
    getToken
  } from "@/utils/auth";
  export default {
    data() {
      var vm = this;
      var validateRegUserName = (rule, value, callback) => {
        var value = vm.reg.user_name;
        if (value === "") {
          vm.checkNameDisabled = true;
          callback(new Error("请输入用户名"));
        } else if (value.length > 16 || value.length < 4) {
          vm.checkNameDisabled = true;
          callback(new Error("用户名长度应在5-16字符之间"));
        } else if (!/^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9].{3,14}$/.test(value)) {
          vm.checkNameDisabled = true;
          callback(new Error("用户名只能以汉字、字母开头"));
        } else {
          vm.checkNameDisabled = false;
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        var value = vm.reg.password;
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
          callback(
            new Error(
              "密码须以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
            )
          );
        } else {
          if (this.reg.checkPass !== "") {
            this.$refs.reg.validateField("checkPass");
          }
          callback();
        }
      };
      var validatelogUserName = (rule, value, callback) => {
        var value = vm.log.user_name;
        if (value === "") {
          vm.checkNameDisabled = true;
          callback(new Error("请输入用户名"));
        } else if (value.length > 16 || value.length < 4) {
          vm.checkNameDisabled = true;
          callback(new Error("用户名长度应在5-16字符之间"));
        } else if (!/^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9].{3,14}$/.test(value)) {
          vm.checkNameDisabled = true;
          callback(new Error("用户名只能以汉字、字母开头"));
        } else {
          vm.checkNameDisabled = false;
          callback();
        }
      };
      var validatelogPass = (rule, value, callback) => {
        var value = vm.log.password;
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
          callback(
            new Error(
              "密码须以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
            )
          );
        } else {
          if (this.reg.checkPass !== "") {
            this.$refs.reg.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        var value = vm.reg.checkPass;
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.reg.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      var validateTel = (rule, value, callback) => {
        var value = vm.reg.tel;
        if (value === "") {
          callback(new Error("请输入手机号码"));
        } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
            value
          )) {
          // 手机号码正则匹配更新到2018.1，支持166网段
          callback(new Error("请输入正确手机号码!"));
        } else {
          callback();
        }
      };
      return {
        logo, // 顶部logo
        loginVisible: false, // login模态框
        regVisible: false, // 注册模态框
        //isLogin: this.$store.state.isLogin, // 是否为已登录状态
        user_name: "", // 当前用户名
        nameCanReg: 0, // 输入的用户名是否已注册,1是可以注册，2是已被占用
        checkNameDisabled: true, // 检查用户名按钮，没填东西不能点
        loginDisable: true, // 登录按钮，没填完信息不能点
        haveSign:false,
        log: {
          user_name: "",
          password: "",
          autoLogin: false
        },
        reg: {
          user_name: "",
          password: "",
          checkPass: "",
          sex: "",
          tel: "",
          avatar: ""
        },
        formLabelWidth: "80px",
        checkLog: {
          logUserName: [{
            required: true,
            validator: validatelogUserName,
            trigger: "blur"
          }],
          logPass: [{
            required: true,
            validator: validatelogPass,
            trigger: "blur"
          }]
        },
        checkReg: {
          regPass: [{
            required: true,
            validator: validatePass,
            trigger: "blur"
          }],
          checkPass: [{
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }],
          tel: [{
            required: true,
            validator: validateTel,
            trigger: "blur"
          }],
          regUserName: [{
            required: true,
            validator: validateRegUserName,
            trigger: "change"
          }],
          sex: [{
            required: true,
            message: "请选择性别",
            trigger: "change"
          }]
        }
      };
    },
    components: {},
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      },
      userInfo() {
        return this.$store.state.user_info;
      }
    },
    created() {
      var token = getToken();

      var vm = this;
      if (token) {
        getInfo({
          token: token
        }).then(res => {
          this.$message({
            message: "自动登录",
            type: "success"
          });
          vm.loginVisible = false;
          vm.$store.commit("toLogin", res.data[0]);
          checkIfSigned({stu_id:res.data[0].id}).then(response=>{
            vm.haveSign = response.data.haveSign
          })
        });
      }
    },
    methods: {
      checkNameIfExist() {
        var vm = this;
        checkNameExist({
          name: this.reg.user_name
        }).then(response => {
          vm.nameCanReg = response.data;
        });
      },
      regClose() {
        this.checkNameDisabled = true; // 关闭之后把验证用户名的按钮禁止，内容清空，状态清空
        var obj = this.reg;
        for (var key in obj) {
          obj[key] = "";
        }
        this.$refs["reg"].resetFields(); //elementUI中提供此方法清空表单，但是不知道为什么只能清空验证状态，无法清空内容
      },
      logClose() {
        var obj = this.log;
        for (var key in obj) {
          obj[key] = "";
        }
        this.$refs["log"].resetFields(); //elementUI中提供此方法清空表单，但是不知道为什么只能清空验证状态，无法清空内容
      },
      logSubmit(formName) {
        var vm = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            login(vm.log)
              .then(response => {
                var token = response.data.token;
                if (vm.log.autoLogin) {
                  setToken(token);
                }
                getInfo({
                  token: token
                }).then(res => {
                  this.$message({
                    message: "登录成功",
                    type: "success"
                  });
                  vm.loginVisible = false;
                  vm.$store.commit("toLogin", res.data[0]);
                  checkIfSigned({stu_id:res.data[0].id}).then(response=>{
                    vm.haveSign = response.data.haveSign
                  })
                });
              })
              .catch(err => {
                this.$message.error("用户名或密码错误，请重试");
              });
          } else {
            this.$message.error("请正确填写登录信息！");
            return false;
          }
        });
      },
      regSubmit(formName) {
        var vm = this;
        if (this.nameCanReg != 1) {
          this.$message({
            message: "请先通过用户名检验！",
            type: "warning"
          });
          return false;
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            register(vm.reg)
              .then(response => {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
                vm.regVisible = false;
              })
              .catch(err => {
                this.$message.error("手慢了哦，该用户名已被占用，换一个试试吧");
              });
          } else {
            this.$message.error("请正确填写注册信息！");
            return false;
          }
        });
      },
      toMe(){
        this.$router.push({name:'me'})
      },
      toFav(){
        this.$router.push({name:'favorite'})
      },
      logout() {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      },
      login() {
        this.loginVisible = true;
      },
      register() {
        this.regVisible = true;
      },
      sign(){
        var vm = this
        signIn({stu_id:vm.userInfo.stu_id}).then(response=>{
          vm.haveSign = true
          vm.$store.commit('changebalance',50)
          this.$message({
          message: '签到成功！  积分+50',
          type: 'success'
        });
        })
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color: #60626b;
    color: #fff;
    .avatar-container {
      height: 50px;
      float: right;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .user-dropdown {
    width: 300px;
    padding: 20px;
    img {
      border-radius: 50%;
      -moz-box-shadow: 1px 0px 7px #333333;
      -webkit-box-shadow: 1px 0px 7px #333333;
      box-shadow: 1px 0px 7px #333333;
      width: 50px;
      height: 50px;
    }
    .username {
      display: inline-block;
      font-size: 20px;
      margin-left: 15px;
      height: 30px;
      line-height: 30px;
      vertical-align: 30%;
      color: #60626b;
    }
    .userinfo-table {
      width: 100%;
      margin-left: 70px;
      .table-item {
        height: 20px;
        margin-bottom: 20px;
        color: #60626b;
      }
    }
  }

</style>
