<template>
  <div class="aboutme border-r">
      <h2 class="ab_title">关于我</h2>
      <div class="avatar"><img src="../../../assets/img/photo.png"></div>
      <div class="ab_con">
        <p>网名：皇家蓝 | 伊笑倾城 | 黑羽</p>
        <p>职业：Web前端工程师、业余小说家</p>
        <p>籍贯：山东省—青岛市</p>
        <p>邮箱：chilong1@126.com</p>
      </div>
    </div>
</template>

<script>
</script>

<style lang="less">
  .aboutme {
    background: #FFF;
    margin-bottom: 20px;
    overflow: hidden;
    .ab_title{
      text-align: center;
      position: relative;
      margin: 20px;
    }
    .avatar{
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50px;
      margin: auto;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .ab_con{
      line-height: 30px;
      padding: 10px;
    }
    .ab_con p {
      background: #f6f6f6;
      margin: 5px 0;
      padding-left: 10px;
      border-radius: 5px;
      text-shadow: rgba(255, 255, 255, 0.3) 0px 1px 0px;
    }
  }
  
  
</style>