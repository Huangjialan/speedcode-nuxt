<template>
  <div class="articleList-div">
    <div class="articleList border-r">
      <div v-for="(art,i) in articleList" class="articleBox">
        <h2><a class="title" v-text="art.title" @click="toDetail(art.id)"></a></h2>
        <small>{{art.time}} by {{art.author.name}} 阅读{{art.view}}次</small>
        <div class="articleContent" v-html="art.desc" v-highlight></div>
        <span class="readAll" @click="toDetail(art.id)">阅读全文...</span>
        <p>标签：{{art.key}} | 评论({{art.comment}})</p>
      </div>
      <div class="pagination-box" v-show="!!articleList.length">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="currentChange"
          :total="totalCount">
        </el-pagination>
      </div>
      <el-alert
        title="该类下暂时还没有添加文章"
        type="info"
        :closable="false"
        show-icon v-show="!articleList.length">
      </el-alert>
    </div>
    <div class="right-box">
      <personNote/>
      <SearchByKey/>
      <HotArticle ref="hotArticle"/>
      <Category ref="category"/>
      <!--<BlogRoll/>-->
    </div>
 </div>  
</template>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?33c7371447c5e73fcea8446eb44d7b8d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

<script>
  import personNote from '@/components/ui/personNote/personNote.vue';
  import HotArticle from '@/components/ui/HotArticle/HotArticle.vue';
  import Category from '@/components/ui/Category/Category.vue';
  import SearchByKey from '@/components/ui/SearchByKey/SearchByKey.vue';
  import BlogRoll from '@/components/ui/BlogRoll/BlogRoll.vue';
  
  import axios from 'axios'
  export default {
    scrollToTop: true,
    async asyncData ({params,query}) {
      return axios.get(`http://api.speedcode.cn/api/article`)
      .then((res) => {
        return {articleList : res.data.data,totalCount: res.data.count }
      })
    },
    data () {
      return {
        articleList: [],
        totalCount: 1,
        currentPage:1,
        categoryId:this.$route.query.categoryId || '',
        wordkey:this.$route.query.wordkey || '',
      }
    },
    components: {
      personNote,
      HotArticle,
      Category,
      SearchByKey,
      BlogRoll
    },
    mounted (){
      this.init();   //这里再加载是为了更新最热文章列表
    },
    watch: {
      "$route"() {
        this.categoryId = this.$route.query.categoryId || '';
        this.wordkey = this.$route.query.wordkey || '';
        this.init();
      },
    },
    methods: {
      init (){
        axios.get(`http://api.speedcode.cn/api/article?p=${this.currentPage}&t=${this.categoryId}&k=${this.wordkey}`).then((res)=>{
          if (!!res) {
            this.articleList = res.data.data;
            this.totalCount = res.data.count;
            if (!sessionStorage.getItem('hotList')){
              sessionStorage.setItem('hotList',JSON.stringify(res.data.hot));
              this.$refs.hotArticle.init();
            }
          }
        });
      },
      toDetail (id) {
        this.$router.push({path:"/ArticleDetail",query:{id:id}});
      },
      currentChange (page){
        this.currentPage = page;
        this.init();
      }
    }
  }
</script>

<style lang="less">
  .articleList-div{
    display: flex;
    .articleList{
      flex: 1;
      padding: 20px 30px;
      margin-right: 20px;
      background: #fff;
      margin-bottom:20px;
      .articleBox{
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px dashed #DCDFE6;
      }
      .title{
        font-size: 24px;
        color: #527ED1;
        cursor: pointer;
      }
      small{
        margin-top: 10px;
      }
      .articleContent{
        font-size: 14px;
        padding-top: 10px;
        padding-bottom: 5px;
      }
      .pagination-box{
        text-align: center;
      }
      .readAll{
        font-size: 14px;
        color: #34538b;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 10px;
        display: inline-block;
      }
      .title:hover,.readAll:hover{
        text-decoration: underline;
      }
    }
    .right-box{
      width: 300px;
    }
  }
  @media (max-width: 1000px) {
    .articleList-div {
      display: block;
      .articleList{
        margin-right: 0;
      }
      .right-box{
        width: 100%;
      }
    }
  }
</style>