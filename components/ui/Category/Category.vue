<template>
  <div class="articleCate border-r">
    <div class="cateTitle">文章分类</div>
    <ul>
      <li v-for="(list,index) in categoryList" :key="index" v-show="list.id>0 && list.count>0"><a @click="gotoCategory(list.id)">{{list.name}}({{list.count}})</a></li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        categoryList:[]
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init (){
        axios.get('http://api.speedcode.cn/api/article/category').then((res)=>{
          this.categoryList = res.data;
        })
      },
      gotoCategory (id) {
        this.$router.push({path:"/ArticleList/ArticleList",query:{categoryId:id}});
      }
    }
  }
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
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
</style>