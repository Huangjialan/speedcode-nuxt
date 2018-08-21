<template>
  <header class="web-header">
    <div class="mod-progress"></div>
    <div class="navBar">
      <h1><img class="logo" src="../../../assets/font/153267561738953.png" alt="极速代码" @click="gotoHome" /></h1>
      <ul class="navbar-pc">
        <li v-for="(nav,index) in navList" :class="{'isalive':index===navindex}" @click="toNav(nav.url,index)">
          {{nav.name}}
        </li>
      </ul>
      <img class="navbar-icon" src="../../../assets/img/logo.png" @click="showMenu">
      <transition name="el-zoom-in-top">
        <div class="navbar-phone" v-show="phoneMenu">
          <ul>
            <li v-for="(nav,index) in navList" :class="{'isalive':index===navindex}" @click="toNav(nav.url,index)">
              {{nav.name}}
            </li>
          </ul>
        </div>
      </transition>

    </div>
    <div class="shadePage" v-show="blackPage"></div>
  </header>
</template>

<script>
  import HotArticle from '@/components/ui/HotArticle/HotArticle.vue';
  import * as Methods from '@/components/core/registerMethods';
  export default {
    data() {
      return {
        navList: [{
            name: "首页",
            url: "/"
          },
          {
            name: "技术文档",
            url: "/ArticleList/ArticleList"
          },
          {
            name: "留言板",
            url: "/LeaveNote/LeaveNote"
          },
          {
            name: "关于",
            url: "/About/About"
          },
        ],
        navindex: 0,
        phoneMenu: false,
      }
    },
    components: {},
    computed: {
      blackPage: function() {
        return this.phoneMenu;
      },
    },
    created(){
      //刷新页面后，可以拿到当前路由
      let path = this.$route.path;
      this.navindex = this.navList.findIndex((item) => item.url === path);
      if(path.indexOf('ArticleDetail') != -1){
        this.navindex = 1;
      }
    },
    watch: {
      "$route" () {
        // 获取当前路径
        let path = this.$route.path;
        this.navindex = this.navList.findIndex((item) => item.url === path);
        if(path.indexOf('ArticleDetail') != -1){
          this.navindex = 1;
        }
      },
      phoneMenu: function(val) {
        if(!!val) {
          Methods.OpenShade.afterOpen();
        } else {
          Methods.OpenShade.beforeClose();
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      showMenu() {
        this.phoneMenu = !this.phoneMenu;
      },
      toNav(url, index) {
        this.navindex = index;
        this.$router.push(url);
        this.phoneMenu = false;
      },
      gotoHome(id) {
        this.$router.push({
          path: "/"
        });
      },
      init() {
        //解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
      }
    },

  }
</script>

<style lang="less">
  .web-header {
    width: 100%;
    position: relative;
    background: #fff;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#d4d7db');
    background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#d4d7db));
    background: -moz-linear-gradient(top, #fff, #d4d7db);
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
    .header-bg {
      width: 100%;
      height: 100px;
      img {
        width: 100%;
      }
    }
    .mod-progress {
      width: 100%;
      height: 2px;
      background: #29d;
      -webkit-animation: hue 20s infinite linear;
    }
    .navBar {
      font-size: 20px;
      margin: 0 auto;
      position: relative;
      height: 64px;
      .logo {
        cursor: pointer;
      }
      h1 {
        display: inline-block;
      }
      h1 img {
        height: 60px;
      }
      ul.navbar-pc {
        display: inline-block;
        float: right;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 36px;
        line-height: 37px;
      }
      ul li.isalive {
        border-bottom: 2px solid #0038ffa1;
      }
      ul.navbar-pc li {
        float: left;
        font-size: 14px;
        padding: 0 20px;
        cursor: pointer;
      }
      ul.navbar-pc li:hover {
        color: #0038ffa1;
      }
      .navbar-icon {
        width: 30px;
        display: none;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 101;
        cursor: pointer;
      }
      .navbar-phone {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /*width: 50%;*/
        z-index: 100;
        font-size: 14px;
        background-color: #fff;
        overflow: hidden;
        -webkit-transform: translateX(40%);
        transform: translateX(40%);
        /*-webkit-transition-duration: 400ms;
        transition-duration: 400ms;*/
        ul {
          right: 20px;
          top: 50px;
          margin-top: 60px;
        }
        ul li {
          float: none;
          width: 100%;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          padding-left: 20px;
        }
        ul li.isalive {
          background: #333333;
          color: #fff;
        }
        ul li:not(.isalive):hover {
          background: #eee;
        }
      }
    }
    @media (max-width: 768px) {
      .navbar-icon {
        display: inline-block !important;
      }
      .navbar-pc {
        display: none !important;
      }
    }
    @media (min-width: 768px) {
      .navBar {
        width: 750px;
      }
      .navbar-pc {
        display: inline-block !important;
      }
    }
    @media (min-width: 1000px) {
      .navBar {
        width: 960px;
      }
    }
    @media (min-width: 1200px) {
      .navBar {
        width: 1100px;
      }
    }
  }
</style>