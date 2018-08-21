<template>
  <div class="articleCate border-r">
    <div class="cateTitle">最热文章</div>
    <ul>
      <li v-for="list in hotList"><a @click="toDetail(list.id)">{{list.title}}</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        hotList:[]
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init (){
        this.hotList = JSON.parse(sessionStorage.getItem('hotList'));
      },
      toDetail (id) {
        this.$router.push({path:"/ArticleDetail",query:{id:id}});
      }
    }
  }
</script>
</script>

<style lang="less">
  .articleCate{
      padding: 20px 30px;
      background: #fff;
      margin-bottom:20px;
      .cateTitle{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      ul li {
        font-size: 14px;
        line-height: 26px;
        a{
          text-decoration: underline;
        }
      }
    }
</style>