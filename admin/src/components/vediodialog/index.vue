<template>
    <div>
 <!-- 弹出框***************************************************** -->
    <el-dialog :before-close="handleClose" title="预览" :visible.sync="dialogFormVisible" center>
       
         <video-player v-cloak class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
      ></video-player>

    </el-dialog>
  
    </div>
</template>

<script>
import VideoPlayer from "vue-video-player";

export default {
  props: {
    vedioUrl: String
  },
  computed: {
    playerOptions() {
      var vm = this;
      return {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: vm.vedioUrl //url地址
          }
        ],
        poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      };
    }
  },
  data() {
    var vm = this;
    console.log("vm.vedioUrl", vm.url);
    return {
      dialogFormVisible: false
    };
  },
  methods: {
    noshow() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleClose(done) {
     console.log('关闭了')
     document.getElementsByTagName('video')[0].pause()
     //TODO vue中一般不直接做dom操作，此处不规范，后期想办法优化
     done()
    }
  },
  mounted() {}
};
</script>

<style scoped>
.dialog-form {
  /* border: 1px solid #000; */
  text-align: center;
}
</style>