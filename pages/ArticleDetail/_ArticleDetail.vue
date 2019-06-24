<template>
  <div class="articleDetail-div">
    <div class="left-box">
      <div class="articleDetail border-r">
        <div>
          <h1 class="title" v-text="articleList.title"></h1>
          <small>{{articleList.time}} by {{articleList.author.name}} 阅读{{articleList.view}}次</small>
          <div class="articleContent" v-html="articleList.body" v-highlight></div>
          <div class="title-box">
            <div class="pre_title" v-if="articleList.pre_id>0" @click="gotoPage(articleList.pre_id)">上一篇：{{articleList.pre_title}}</div>
            <div class="next_title" v-if="articleList.next_id>0" @click="gotoPage(articleList.next_id)">下一篇：{{articleList.next_title}}</div>
          </div>
        </div>
      </div>
      <MessageBoard :articleId="id" />
    </div>    
    <div class="right-box">
      <personNote/>
      <HotArticle/>
      <Category/>
    </div>
  </div>
</template>
<script>
  import 'highlight.js/styles/solarized-light.css' //highlight样式文件
  import axios from 'axios'
  import personNote from '@/components/ui/personNote/personNote.vue';
  import Category from '@/components/ui/Category/Category.vue';
  import HotArticle from '@/components/ui/HotArticle/HotArticle.vue';
  import MessageBoard from '@/components/ui/MessageBoard/MessageBoard.vue';
  export default {
    scrollToTop: true,
    head() {
      return this.$seo(this.articleList.title);
    },
    async asyncData ({params,query}) {
      return axios.get(`http://api.speedcode.cn/api/article/content?id=${query.id}`)
      .then((res) => {
        return {articleList : res.data}
      })
    },
    data (){
      return {
        articleList: {
          author:{},
        },
        id : this.$route.query.id
      }
    },
    watchQuery: ['id'],
    components: {
      personNote,
      Category,
      MessageBoard,
      HotArticle
    },
    mounted () {
//    this.init();
    },
    watch: {
      "$route"() {
        this.id = this.$route.query.id;
        this.init();
      },
    },
    methods: {
      init () {
        axios.get('http://api.speedcode.cn/api/article/content?id='+this.id).then((res)=>{
          if (!!res) {
            this.articleList = res.data;
          }
        });
      },
      gotoPage (id) {
        this.$router.push({path:"/ArticleDetail",query:{id:id}});
      }
    }
  }
</script>

<style lang="less">
  .articleDetail-div{
    display: flex;
    .left-box{
      flex: 1;
      margin-right: 20px;
      overflow: hidden;
    }
    .articleDetail{
      padding: 20px 30px;
      background: #fff;
      margin-bottom:20px;
      .title{
        font-size: 24px;
      }
      small{
        margin-top: 10px;
      }
      .articleContent{
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 20px;
        pre,p,span{
          white-space: pre-wrap;
          word-wrap: break-word;
          word-break: break-word;
        }
      }
      .pagination-box{
        text-align: center;
      }
      .title-box {
        margin-bottom: 50px;
        font-size: 16px;
        color: #527ED1;
      }
      .pre_title {
        float: left;
        cursor: pointer;
      }
      .next_title {
        float: right;
        cursor: pointer;
      }
    }
    .right-box{
      width: 300px;
      overflow: hidden;
    }
  }
  @media (max-width: 1000px) {
    .articleDetail-div {
      display: block;
      .left-box{
        margin-right: 0;
      }
      .right-box{
        width: 100%;
      }
    }
    
  }
</style>