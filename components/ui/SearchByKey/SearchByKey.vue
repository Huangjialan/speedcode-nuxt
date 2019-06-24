<template>
  <div class="search-box border-r">
    <el-input placeholder="请输入内容" id="searchKey" class="search-input" prefix-icon="el-icon-search" @keyup.enter.native="onSubmit" v-model="wordkey"></el-input>
    <span class="search-text" @click="search">搜索</span>
  </div>
</template>

<script>
  export default{ 
    data(){
      return {
        wordkey:""
      }
    },
    methods:{
      search (){
        this.$router.push({path:"/ArticleList/ArticleList",query:{wordkey:this.wordkey}});
      },
      onSubmit (event){
        if(event.keyCode == 13){
          this.search();
        }
      }
    }
  }
</script>

<style lang="less">
  .search-box {
    background: #FFF;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    .search-input{
      width: 70% !important;
      height: 40px;
      vertical-align: middle;
    }
    .search-text {
      width: 30%;
      height: 40px;
      border: solid 1px #ddd;
      display: inline-block;
      vertical-align: middle;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      margin-left: -4px;
    }
  } 
</style>