<template>
  <div class="blogroll-box border-r">
    <p class="title">友情链接</p>
    <ul>
      <li v-for="(list,index) in rollList" :key="index">
        <a @click="gotoLink(list.url)">{{list.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        rollList :[
          {name: '虚位以待', url:""},
          {name: '虚位以待', url:""},
        ]
      }
    },
    methods: {
      gotoLink (url){
        if (!url){
          window.location = url;
        }
      }
    }
  }
</script>

<style lang="less">
  .blogroll-box {
    padding: 20px 30px;
    background: #fff;
    margin-bottom: 20px;
    .title {
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