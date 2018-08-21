<template>
  <div id="app" @click="floating">
    <div class="main-body">
      <NavBar/>
      <div class="body-content">
        <!--<router-view/>-->
        <nuxt/>
      </div>
      <WebFooter/>
    </div>
    <GotoTop/>
    <!--点击特效-->
    <div class="floatig">
      <font v-for="(vo,index) in keys.list" :key="index" v-show="vo.show" :style="{top:vo.yy+'px',left:vo.xx+'px',opacity:vo.opacity,color:keys.color}">{{vo.name}}</font>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/ui/NavBar/NavBar.vue';
  import WebFooter from '@/components/ui/WebFooter/WebFooter.vue';
  import GotoTop from '@/components/ui/GotoTop/GotoTop.vue';
  export default {
    name: 'App',
    data () {
      return {
        keys:{
          list:[
            {name:"Html",show:false,yy:0,xx:0,opacity:1},
            {name:"CSS",show:false,yy:0,xx:0,opacity:1},
            {name:"Javascript",show:false,yy:0,xx:0,opacity:1},
            {name:"Vue",show:false,yy:0,xx:0,opacity:1},
            {name:"PHP",show:false,yy:0,xx:0,opacity:1},
            {name:"Wap",show:false,yy:0,xx:0,opacity:1},
          ],
          i:0,
          color:""
        },
      }
    },
    components: {
      NavBar,
      WebFooter,
      GotoTop,
    },
    methods: {
      //点击特效
      floating (e){
        //排除某些元素
//      if(e.target.nodeName=="A" || e.target.nodeName=="I"){
        if(e.target.className != "main-body"){
          return false;
        }
        var self = this;
        var n = self.keys.i;
        self.keys.list[n].yy = e.clientY;
        self.keys.list[n].xx = e.clientX;
        self.keys.list[n].show = true;
        self.keys.list[n].opacity = 1;
        this.color();
        setTimeout(function(){
          self.keys.list[n].opacity = 0.1;
          self.keys.list[n].yy = e.clientY-50;
        },10)

        setTimeout(function(){
          self.keys.list[n].show = false;
        },1000)

        self.keys.i = (self.keys.i==self.keys.list.length-1) ? 0 : ++self.keys.i;
      },
      color(){
        let colorAngle = Math.floor(Math.random()*360);
        this.keys.color = 'hsla('+ colorAngle +',100%,50%,1)';
      },
      randColor (){
        this.r = Math.floor(Math.random()*360);
        this.g = Math.floor(Math.random()*360);
        this.b = Math.floor(Math.random()*360);
        this.keys.color = 'rgba('+ this.r +','+ this.g +','+ this.b +',1)';
      },
      init(){
        
      }
    }
  }
</script>

<style lang="less">
  body{
    color: #434343;
    background: #dae3e7;
  }
  .body-content{
    margin-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  /*.blackPage{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }*/
  .floatig font{
    position: fixed;
    left: 0;
    top: 0;
    font-size: 16px;
    cursor:default;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
    not supported by any browser */
    transition:all 2s;
    -moz-transition:all 2s;
    -webkit-transition:all 2s;
    -o-transition:all 2s;
  }
  @media (max-width: 768px) {
    .body-content {
      width: 100%;
      padding:0;
      .border-r{
        border-radius: 0;
      }
    }
  }
  @media (min-width: 768px) {
    .body-content {
        width: 750px;
    }
  }
  @media (min-width: 1000px) {
    .body-content {
        width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .body-content {
        width: 1260px;
    }
  }
  
  
  
</style>
