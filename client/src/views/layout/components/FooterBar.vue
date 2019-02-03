<template>
<div>
<footer class="foot">
	<div class="sub-foot">
		<div class="foot-nav">
			<div class="foot-link">
				<dl>
					<dt>同类网站</dt>
					<dd>
						<a href="https://www.imooc.com/">慕课网</a>
					</dd>
					<dd>
						<a href="http://edu.51cto.com/">51CTO学院</a>
					</dd>
					<dd>
						<a href="http://www.xuetangx.com/">学堂在线</a>
					</dd>
				</dl>
				<dl>
					<dt>技术文档</dt>
					<dd>
						<a href="https://cn.vuejs.org/">Vue.js</a>
					</dd>
					<dd>
						<a href="https://www.webpackjs.com/">Webpack</a>
					</dd>
					<dd>
						<a href="http://element-cn.eleme.io/#/zh-CN">Element UI</a>
					</dd>
					<dd>
						<a href="http://www.expressjs.com.cn/">Express</a>
					</dd>
					<dd>
						<a href="https://www.mysql.com/">MySQL</a>
					</dd>
				</dl>
				<dl>
					<dt>开发者博客</dt>
					<dd>
						<a href="https://a1245582339.github.io/">喵萌</a>
					</dd>
				</dl>
				<dl>
					<dt>开发者社交</dt>
					<dd>
						<a href="https://weibo.com/u/5210290149?refer_flag=1001030201_">新浪微博</a>
					</dd>
                    <dd>
						<a href="http://1245582339.qzone.qq.com">QQ空间</a>
					</dd>
				</dl>
				<dl>
					<dt>友情链接</dt>
					<dd>
						<a href="http://www.birdshome.top/">小鸟依家</a>
					</dd>
					<dd>
						<a href="https://hyxiaopangzhi.github.io/">Hy小胖纸</a>
					</dd>
				</dl>
                <dl>
					<dt>GitHub</dt>
					<dd>
						<a href="https://github.com/a1245582339/vue-wangxiaoguanli">vue网校管理</a>
					</dd>
				</dl>
				<dl>
					<dt>公司详情</dt>
					<dd>
						<a href="https://www.minxing365.com/web/">公司官网</a>
					</dd>
				</dl>
			</div>
			<div style="position: relative;height: 128px;width: 50px;float: left;border-left:1px solid #707070 ;">
				<img style="position: absolute;top: 37px;left: 74px;width:100px;height:100px" :src="QR_Code" />
			</div>
		</div>
	</div>
	<div class="foot-bottom">
		<div style="width: 1126px;margin: 36px auto 0;" class="">
			<div class="foot-bottom-left">
				<h5>联系我们</h5>
				<p>
					地址：天津市河西区泗水道天津财经大学 <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天津市河西区南京路39号国际贸易中心写字楼B座2704-2707
					<br /> 电话：13512877130 <br /> 邮箱：lizhipeng19960216@foxmail.com
				</p>
			</div>
			<div class="foot-bottom-right">
				<h4>热线电话：13512877130</h4>
				<p>网校管理系统 <br /> Copyright 2014 Dehui Network Co.,Ltd. All rights reserved. 京ICP备14012220号-1</p>
			</div>
		</div>
	</div>
</footer>
</div>
</template>

<script>
import QR_Code from '@/assets/QR_Code.png'
export default {
  data() {
    return {
        activeIndex: '1',
        QR_Code
    };
  },
  components: {
      
  },
  computed: {

  },
  methods: {

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
*{
    margin: 0
}
.foot {
    height: 298px;
    background: #333;
    .sub-foot {
        display: block;
        height: 271px;
        width: 100%;
        border-bottom: 1px solid #424242;
        .foot-nav {
            width: 1126px;
            margin: 0 auto;
            padding-top: 50px;
            .foot-link {
                width: 1126px;
            }
            dl {
                float: left;
                width: 100px;
                margin: 0 10px;
                dt {
                    color: #999999;
                    font-size: 12px;
                    margin-bottom: 20px;
                }
                dd {
                    a:link,
                    a:visited {
                        line-height: 20px;
                        color: #707070;
                        font-size: 12px;
                    }
                }
            }
            span {
                a {
                    display: inline-block;
                    padding-right: 7px;
                    font-size: 14px;
                    color: #999;
                    margin: 0 4px 0 5px;
                    height: 13px;
                    line-height: 13px;
                    border-right: 1px solid #999;
                }
                /* a:last-child{
                    border-right: none;;
                }*/
                a:hover {
                    color: #fff;
                }
            }
            span:nth-child(7) a {
                border-right: none;
            }
            .foot-companyName {
                padding-top: 22px;
                font-size: 15px;
                color: #707070;
                text-align: center;
            }
        }
        .foot-copyright {
            padding-top: 50px;
            font-size: 13px;
            color: #6d6d6d;
            text-align: center;
        }
        i {
            display: block;
            margin: 0 auto;
            width: 40px;
            height: 14px;
            border-bottom: 2px solid #2e93e3;
            float: none;
            /*margin-top: 18px;*/
        }
    }
    .foot-bottom {
        width: 100%;
        height: 208px;
        border-top: 1px solid #1a1a1a;
        background: #333;
        .foot-bottom-left {
            float: left;
            h5 {
                font-weight: normal;
                color: #999999;
                font-size: 12px;
                margin-bottom: 20px;
            }
            p {
                line-height: 20px;
                color: #707070;
                font-size: 12px;
            }
        }
        .foot-bottom-right{
            float: right;
            margin-right: 25px;
            margin-top: 25px;
            h4{
                font-weight: normal;
                font-size: 22px;
                color: #999999;
                margin-bottom: 25px;
            }
            p{
                line-height: 20px;
                color: #707070;
                font-size: 12px;
            }
        }
    }
}
</style>

