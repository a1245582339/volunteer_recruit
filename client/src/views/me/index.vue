<template>
<div v-loading.body="listLoading">
  <el-form :model="reg" ref="changeInfo" label-width="30px" status-icon :rules="checkReg">

    <el-form-item label="用户头像" :label-width="formLabelWidth">
           <el-upload
              class="avatar-uploader"
              ref="image"
              :auto-upload="true"
              action="http://localhost:3000/updateStuAvatar"
              :show-file-list="false"
              :on-success="AvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img :src="userInfo.avatar" class="avatar">
            </el-upload>
            <span>点击头像更换</span><span style="color:#F56C6C;margin-left:20px" v-if="userInfo.avatar=='http://localhost:3000/stu_avatar/默认.jpg'">首次修改头像，可以获得100积分！</span>
  </el-form-item>


    <el-form-item label="用户名" :label-width="formLabelWidth">
        <span>{{userInfo.stu_name}}</span>
    </el-form-item>

    <el-form-item label="审核状态" :label-width="formLabelWidth">
        <span style="color:#67C23A" v-if="userInfo.ischecked">已审核</span>
        <span style="color:#F56C6C" v-else>待审核<span style="margin-left:30px">通过审核后可获得100积分！</span></span>
    </el-form-item>

    <el-form-item label="当前积分" :label-width="formLabelWidth">
        <span>{{userInfo.balance}}</span>
    </el-form-item>

    <el-form-item label="性别" :label-width="formLabelWidth">
        <span>{{userInfo.sex}}</span>
    </el-form-item>

    <el-form-item label="修改密码" :label-width="formLabelWidth" prop="chanegPass">
      <el-input type="password" v-model="reg.currentPass" auto-complete="off" placeholder="若要修改密码，请输入正确当前密码"></el-input>
      <el-button style="margin-top:10px;" @click="checkCurrentPass">修改密码</el-button>
    </el-form-item>

    <el-form-item label="手机号" :label-width="formLabelWidth" prop="tel">
      <span>{{userInfo.tel}}</span>
      <el-input v-model="reg.tel" auto-complete="off" placeholder="请输入您的新手机号"></el-input>
    </el-form-item>
    <el-button style="margin-left:79px;" @click="changetel">修改号码</el-button>
  </el-form>
  

  <el-dialog width="500px" title="注册" :visible.sync="changePassModelVisiable" center @close="regClose">
      <el-form :model="reg" ref="reg" label-width="30px" status-icon :rules="checkReg">
        <el-form-item label="密码" :label-width="formLabelWidth" prop="regPass">
          <el-input type="password" v-model="reg.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="reg.checkPass" auto-complete="off" placeholder="请重新输入密码"></el-input>
        </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="regVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPass('reg')">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import {
  checkCurrentPassApi,
  updatePassword,
  updateAvatar,
  updateTel
} from "@/api/me";
export default {
  data() {
    var vm = this;
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
      } else if (
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          value
        )
      ) {
        // 手机号码正则匹配更新到2018.1，支持166网段
        callback(new Error("请输入正确手机号码!"));
      } else {
        callback();
      }
    };
    return {
      nameCanReg: 0, // 输入的用户名是否已注册,1是可以注册，2是已被占用
      checkNameDisabled: true, // 检查用户名按钮，没填东西不能点
      formLabelWidth: "80px",
      changePassModelVisiable: false,
      listLoading: false,
      reg: {
        id: this.$store.state.user_info.id,
        password: "",
        checkPass: "",
        tel: "",
        currentPass: ""
      },
      checkReg: {
        regPass: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        tel: [
          {
            validator: validateTel,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    var vm = this
    this.$emit("listenActiveIndex", "me");
    this.listLoading = true;
    setTimeout(function() {
      vm.checkLogin();
    }, 1000);
  },
  computed: {
    userInfo() {
      return this.$store.state.user_info;
    }
  },
  watch: {},
  methods: {
    checkLogin() {
      if(!this.$store.state.isLogin){
        this.$alert('请先登录，点击确定返回首页', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({name:"index"})
          }
        });
      }else{
        console.log(111)
        this.listLoading = false;
      }
    },
    // 转换时间戳
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    checkCurrentPass() {
      var vm = this;

      checkCurrentPassApi({
        id: vm.userInfo.stu_id,
        password: vm.reg.currentPass
      })
        .then(response => {
          vm.changePassModelVisiable = true;
        })
        .catch(err => {
          this.$message.error("密码错误");
        });
    },
    submitPass(formName) {
      var vm = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          updatePassword({ id: vm.userInfo.stu_id, password: vm.reg.password })
            .then(response => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              vm.changePassModelVisiable = false;
            })
            .catch(err => {
              this.$message.error("修改失败");
            });
        } else {
          this.$message.error("请正确填写密码！");
          return false;
        }
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
    beforeAvatarUpload(file) {
      const name = file.name;
      const isJPG =
        name.indexOf(".jpg") > -1 ||
        name.indexOf(".jpeg") > -1 ||
        name.indexOf(".JPEG") > -1 ||
        name.indexOf(".JPG") > -1;
      const isPNG = name.indexOf(".png") > -1 || name.indexOf(".PNG") > -1;
      const isGIF = name.indexOf(".gif") > -1 || name.indexOf(".GIF") > -1;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传头像图片只能是 JPG,GIF,PNG 格式!");
        return isJPG;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }
    },
    AvatarSuccess(res, file) {
      updateAvatar({ id: this.userInfo.stu_id, avatar: res.data.path }).then(
        response => {
          this.$store.commit("changeAvatar", res.data.path);
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }
      );
    },
    changetel() {
      var value = this.reg.tel;
      if (
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          value
        )
      ) {
        this.$message({
          message: "请输入正确手机号",
          type: "error"
        });
        return false;
      } else {
        updateTel({ id: this.userInfo.stu_id, tel: value }).then(response => {
          this.$message({
            message: "手机号修改成功",
            type: "success"
          });
        });
      }

      //this.$refs[formName].validateField('tel')
    }
  }
};
</script>
<style scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader img {
  width: 100px;
  height: 100px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
