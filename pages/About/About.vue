<template>
  <div class="about-box border-r">
    <p class="title">关于网站：</p>
    <p>本站正式发布于2018年8月17日，已经运行了 <span class="time">{{timeStr}}</span></p>
    <p>前端采用：VUE+Nuxt+ElementUI ,后端采用：thinkPHP5+mysql</p>
    <p>托管于阿里云</p>
    <p>2018-7-20,博客初版跑通</p>
    <p>2018-8-17,nuxt进行第一版重构</p>
    <p class="title">关于我</p>
    <p>刘曦，就职于美团-屏芯，坐标青岛，前端工程师</p>
    <p>本博客由PHP大神刘海亮友情支援(就职于北京九九乐动)，共同完成。</p>
    <p>本博客想颠覆下个人博客的概念，启用团队博客的方式，让团队里的兄弟一起维护更新，快速建立知识库</p>
    <p class="title">联系我</p>
    <p>blog：<a href="http://www.speedcode.cn">www.speedcode.cn</a></p>
    <p>github: https://github.com/Huangjialan</p>
    <p>邮箱：chilong1@126.com</p>
  </div>
</template>

<script>
  export default {
    data (){
      return {
        timeStr : ""
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init (){
        let timestamp1 = (new Date('2018-08-17 00:00:00')).valueOf();
        let timestamp2 = (new Date()).valueOf();
        let time = (timestamp2-timestamp1)/1000;
        this.getTime(time);
      },
      getTime (times){
        var timer=null;
        let _this = this;
        timer=setInterval(function(){
           let year=0,
            month = 0,
            day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
          if(times > 0){
            year = Math.floor(times / (60 * 60 * 24 * 365));
            day = Math.floor(times / (60 * 60 * 24)) - (year * 365) ;
            hour = Math.floor(times / (60 * 60)) - (year * 365 * 24) - (day * 24);
            minute = Math.floor(times / 60) - (year * 365 * 24 * 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (year* 365 * 24 * 60 * 60) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          //
          _this.timeStr = (year > 0 ? year+" 年：" : '') +day+" 天："+hour+" 时："+minute+" 分："+second+" 秒";
          times++;
        },1000);
      }
    }
  }
</script>

<style lang="less">
  .about-box{
    padding: 20px 30px;
    margin-right: 20px;
    background: #fff;
    margin-bottom:20px;
    font-size: 14px;
    min-height: 600px;
    .title{
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 5px;
    }
    .time {
      font-weight: bold;
      color: #90CAF9;
    }
  }
  @media (max-width: 1000px) {
    .about-box{
      margin-right: 0;
    }
  }
</style>