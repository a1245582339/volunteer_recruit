<template>
    <div>
 <!-- 弹出框***************************************************** -->
    <el-dialog @open="open" @close="close" title="编辑" :visible.sync="dialogFormVisible" center>
       <el-form :model="form" label-width="30px" class="dialog-form" :rules="rules" ref="dialogForm">
         <!-- <el-form-item label="修改模块" :label-width="formLabelWidth">
           <el-input v-model="form.oldname" auto-complete="off" :disabled="true"></el-input>
         </el-form-item> -->
         <!-- ***********************头像****************************** -->
         <el-form-item v-if="label.avatar" :label="label.avatar" :label-width="formLabelWidth">
           <el-upload
              class="avatar-uploader"
              ref="image"
              :auto-upload="false"
              :action="actionUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="AvatarChange">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-form-item>
         <!-- ***********************名字****************************** -->
         <el-form-item v-if="label.moduleName" :label="label.moduleName" :label-width="formLabelWidth" prop="name">
           <el-input v-model="form.name" auto-complete="off"></el-input>
         </el-form-item>
          <!-- ***********************详情****************************** -->
         <el-form-item   v-if="label.moduleDesp || label.showDesp" :label="label.moduleDesp || label.showDesp" :label-width="formLabelWidth" prop="desp">
           <el-input type="textarea" autosize  v-model="form.desp" auto-complete="off"></el-input>
         </el-form-item>
           <!-- ***********************地址****************************** -->
         <el-form-item   v-if="label.moudleAddress" :label="label.moudleAddress" :label-width="formLabelWidth" prop="address">
           <el-input type="textarea" autosize  v-model="form.address" auto-complete="off"></el-input>
         </el-form-item>
          <!-- ***********************价格****************************** -->
         <el-form-item v-if="label.moudlePrice" :label="label.moudlePrice" :label-width="formLabelWidth" prop="price">
           <el-input v-model="form.price" auto-complete="off"></el-input>
         </el-form-item>
          <!-- ***********************类型选择****************************** -->
         <el-form-item v-if="label.moudleType" :label="label.moudleType" :label-width="formLabelWidth" prop="moudleType">
           <el-select style="float: left" v-if="!isMe" @change="changeType" v-model="typeValue" auto-complete="off">
             <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>  
           </el-select>
         </el-form-item>
          <!-- ***********************省份选择****************************** -->
         <el-form-item v-if="label.moudleProvince" :label="label.moudleProvince" :label-width="formLabelWidth" prop="moudleType">
           <el-select v-if="!isMe" @change="changePro" v-model="province" auto-complete="off" style="float: left">
             <el-option v-for="item in provienceArr" :key="item.id" :label="item" :value="item"></el-option>  
           </el-select>
         </el-form-item>
         <!-- ***********************系数****************************** -->
         <el-form-item v-if="label.moudleCoefficient" :label="label.moudleCoefficient" :label-width="formLabelWidth" prop="coefficient">
           <el-input v-model="form.coefficient" auto-complete="off"></el-input>
         </el-form-item>
         <!-- ***********************电话****************************** -->
         <el-form-item v-if="label.moudleTel" :label="label.moudleTel" :label-width="formLabelWidth" prop="tel">
           <el-input v-model="form.tel" auto-complete="off"></el-input>
         </el-form-item>
         <!-- ***********************密码****************************** -->
          <el-form-item v-if="label.moudlePassword" :label="label.moudlePassword" :label-width="formLabelWidth" prop="password">
           <el-input v-model="form.password" auto-complete="off"></el-input>
         </el-form-item>
          <!-- ***********************图片墙****************************** -->
          <el-form-item v-if="imgUploadList" label="原始图片" :label-width="formLabelWidth">
           <div v-if="form.photos.length">
             <ul class="photos">
               <li v-for="(item,key) in form.photos" :key='key'>
                 <img :src="item" alt=""><i @click="removePhoto(key)" class="el-icon-error"></i></li>
             </ul>
           </div>
           <div style="text-align: left" v-else>无图片</div>
         </el-form-item>
        <!-- ***********************富文本编辑器****************************** -->
        
          <el-form-item v-if="label.content" :label="label.content" :label-width="formLabelWidth">
            <div v-html="form.content"></div>
           <tinymce :height="300" v-model="form.content"></tinymce>
         </el-form-item>
         <!-- ***********************上传视频****************************** -->
          <el-form-item v-if="label.vedio" :label="label.vedio" :label-width="formLabelWidth">
            <el-upload
            class="vedio-uploader"
            ref="vedio"
            :auto-upload="false"
            :show-file-list="true"
            :on-success="VedioSuccess"
            :on-change="vedioChangeCallback"
            :limit="1"
            action="http://127.0.0.1:3000/updateCourseVedio">
              <el-button size="small" type="primary">点击上传视频</el-button>
              <div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
            </el-upload>
          </el-form-item>
          <!-- ***********************上传图片列表****************************** -->
          <el-upload
            v-if="imgUploadList"
            action="http://127.0.0.1:3000/updateHostelPhotos"
            :on-change="chooseImg"
            :on-success="imgListUpSucc"
            :auto-upload="false"
            :file-list="imgList"
             ref="imageList">
            <el-button size="small" type="primary">点击选择图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>



       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noshow()">取 消</el-button>
        <el-button type="primary" @click="commitForm()" :disabled="isdisabled">确 定</el-button>
      </div>
    </el-dialog>
  
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  props: {
    form: Object,
    label: Object,
    type: Array,
    list: Array,
    isMe: Boolean,
    actionUrl: String,
    imgUploadList: Boolean
  },

  data() {
    var vm = this
    const checkName = (rule, value, callback) => {
      if (!value) {
        vm.isdisabled = true
        return callback(new Error('模块名不能为空'))
      } else {
        vm.isdisabled = false
        callback()
      }
    }
    const checkDesp = (rule, value, callback) => {
      if (!value) {
        vm.isdisabled = true
        return callback(new Error('模块描述不能为空'))
      } else {
        vm.isdisabled = false
        callback()
      }
    }
    const checkCoefficicent = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('系数不能为空'))
      }
      setTimeout(() => {
        if (Number.isNaN(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 0) {
            callback(new Error('必须为正数'))
          } else {
            callback()
          }
        }
      }, 100)
    }
    const checkPrice = (rule, value, callback) => {
      var r = /^\+?[1-9][0-9]*$/
      if (!value && value !== 0) {
        vm.isdisabled = true
        return callback(new Error('价格不能为空'))
      } else if (!r.test(value)) {
        vm.isdisabled = true
        callback(new Error('请输入数字值'))
      } else if (value < 0) {
        vm.isdisabled = true
        callback(new Error('必须为正数'))
      } else {
        vm.isdisabled = false
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      typeValue: '',
      isdisabled: true,
      imageUrl: '',
      imageChange: false,
      imgListChange: false,
      province: '',
      provienceArr: ['北京', '天津', '上海', '重庆', '南京', '广州', '深圳', '河北', '山西', '内蒙古自治区', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '西藏自治区', '陕西', '甘肃', '宁夏回族自治区', '青海', '新疆维吾尔族自治区', '香港特别行政区', '澳门特别行政区', '台湾', '其他'],
      imgList: [],
      returnCount: 0,
      rules: {
        name: [{ validator: checkName, trigger: 'change' }],
        desp: [{ validator: checkDesp, trigger: 'change' }],
        price: [{ validator: checkPrice, trigger: 'change' }],
        coefficient: [{ /* validator: checkCoefficicent,*/ trigger: 'change' }]
      }
    }
  },
  methods: {
    noshow() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    commitForm() {
      // console.log(JSON.stringify(this.form))

      if (this.imageChange) {
        this.$refs.image.submit() // 如果图片有更改，则在上传成功的回调中
      } else if (this.imgListChange) {
        this.$refs.imageList.submit()
      } else {
        this.$emit('commitform')
      }
    },
    changeType() {
      this.form.type = this.typeValue
      this.isdisabled = false
    },
    changePro() {
      this.form.province = this.province
      this.isdisabled = false
    },
    open() {
      this.typeValue = this.form.type
      this.province = this.form.province
      this.imageUrl = this.form.avatar
      this.imageChange = false // 打开dialog，回到false
      this.imgListChange = false
    },
    close() {
      this.$refs.dialogForm.resetFields()
    },
    chooseImg(file) {
      const name = file.name
      const isJPG = (name.indexOf('.jpg') > -1) || (name.indexOf('.jpeg') > -1) || (name.indexOf('.JPEG') > -1) || (name.indexOf('.JPG') > -1)
      const isPNG = (name.indexOf('.png') > -1) || (name.indexOf('.PNG') > -1)
      const isGIF = (name.indexOf('.gif') > -1) || (name.indexOf('.GIF') > -1)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error('上传图片只能是 JPG,GIF,PNG 格式!')
        return isJPG
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return isLt2M
      }

      this.imageUrl = file.url
      // console.log(this)

      this.imgListChange = true // 如果图片发生更改，将它改为true
      this.isdisabled = false
    },
    removePhoto(key) {
      this.form.photos.splice(key, 1)
      this.isdisabled = false
      this.$forceUpdate()
    },
    AvatarChange(file) {
      const name = file.name
      const isJPG = (name.indexOf('.jpg') > -1) || (name.indexOf('.jpeg') > -1) || (name.indexOf('.JPEG') > -1) || (name.indexOf('.JPG') > -1)
      const isPNG = (name.indexOf('.png') > -1) || (name.indexOf('.PNG') > -1)
      const isGIF = (name.indexOf('.gif') > -1) || (name.indexOf('.GIF') > -1)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error('上传头像图片只能是 JPG,GIF,PNG 格式!')
        return isJPG
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return isLt2M
      }
      this.imageUrl = file.url
      this.imageChange = true // 如果图片发生更改，将它改为true
    },
    imgListUpSucc(res, file, fileList) {
      var path = res.data.path
      this.returnCount += 1
      this.form.photos.push(path)
      if (this.returnCount != fileList.length) {
        return false
      }
      // console.log('eeeeeee>>>' + JSON.stringify(this.form))
      this.$emit('commitform')
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data.path
      if (this.vedioChange) {
        this.$refs.vedio.submit()
      } else {
        this.$emit('commitform')
      }
    },
    vedioChangeCallback(file) {
      const name = file.name
      const isMP4 = (name.indexOf('.mp4') > -1) || (name.indexOf('.MP4') > -1)
      const isLt10M = file.size / 1024 / 1024 < 30

      if (!isMP4) {
        this.$message.error('上传视频只能是 MP4 格式!')
        return isMP4
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过 10MB!')
        return isLt10M
      }
      this.vedioChange = true
    },
    VedioSuccess(res, file) {
      this.form.url = res.data.path
      this.$emit('commitform')
      this.$refs.vedio.clearFiles()
    }

  }
}
</script>
<style lang="scss" scope>
.dialog-form {
  /* border: 1px solid #000; */
  text-align: center;
}
.avatar-uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
.photos {
    list-style: none;
    width: 100%;
    overflow: hidden;
    li{
      float: left;
      overflow: hidden;
      margin-right: 5px;
      position: relative;
      img{
      width: 80px;
      height: 80px;
      }
      i{
        position: absolute;
        top: 5px;
        right: 5px;
        color: #F56C6C;
        cursor: pointer;
      }
    }
}
</style>