<template>
  <div id="messageBoard" class="container messageBoard-box border-r" @click="clickEvent">
    <div class="leave">
      <!--DIV输入框-->
      <div class="editor" v-html="msgcontent" @keyup="setContent($event)" contenteditable="true" v-if="showEdit"></div>
      <span class="pcl" v-show="pclShow">{{pcl}}</span>
      <div class="tools">
        <i @click="setB" class="iconfont">&#xe6fe;</i>
        <i @click="setURL" class="iconfont">&#xe63e;</i>
        <i @click="setFACE" class="iconfont">&#xe659;</i>
        <i @click="setREFER" class="iconfont">&#xe65d;</i>
        <ul v-show="showFACE" class="qqbq">
          <li v-for="(i,index) in qqbq" :key="index" ><img @click="inpFACE(i)" :src="'/img/qqbq/'+(i)+'.gif'" /></li>
        </ul>
        <i @click="setIMG" class="iconfont">&#xe791;</i>
        <i @click="setCODE" class="iconfont">&#xe6b9;</i>
        <el-button @click="showInfo" class="fr">提交留言</el-button>
      </div>
    </div>
    <div class="leave-content">
      <ul class="fl">
        <li v-for="(vo,index) in messageList" :key="index">
          <div class="fl img">
            <a :href="vo.url" target="_blank"><img src="/img/head.jpg" /></a>
          </div>
          <div class="fl content">
            <h4><a :href="vo.url" target="_blank">{{vo.name}}</a></h4>
            <p v-html="vo.content"></p>
            <span>{{vo.time|timeReturn}}<a class="fr pointer" @click="replyBtn(vo.id,vo.name)">回复</a></span>
            <div class="reply" v-for="zo in vo.list">
              <a :href="zo.url" target="_blank"><img src="/img/head.jpg" /></a>
              <h4><a :href="zo.url" target="_blank">{{zo.name}}</a> 回复: <a :href="vo.url" target="_blank">{{vo.name}}</a></h4>
              <p v-html="zo.content"></p>
              <span>{{zo.time | timeReturn}}
                <a class="fr pointer" @click="replyBtn(zo.id,zo.name)">回复</a>
              </span>
              <div class="reply" v-for="zzo in zo.list">
                <a :href="zzo.url" target="_blank"><img src="/img/head.jpg" /></a>
                <h4><a :href="zzo.url" target="_blank">{{zzo.name}}</a> 回复: <a :href="zo.url" target="_blank">{{zo.name}}</a></h4>
                <p v-html="zo.content"></p>
                <span>{{zzo.time|timeReturn}} 
                  <!--<a class="fr" @click="replyBtn(zzo.id,zzo.name)" href="#">回复</a>-->
                  <!--<i class="iconfont">&#xe61a;</i>{{zzo.region || "未知地点"}} {{zzo.os}} {{zzo.browser}}-->
                </span>
              </div>
            </div>
          </div>
        </li>
        <el-alert v-show="messageList.length==0" title="还没有人评论呢，赶紧来抢沙发吧" type="info" description=" " :closable="false" show-icon></el-alert>
      </ul>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="currentChange"
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="page.size"
      :total="page.count">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="博客地址" >
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="postLeave('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        show: false,
        page: {
          count: 0,
          size: 10
        },
        form: {
          name:'',
          email:'',
          url:'',
          qq:''
        },
        article_id: this.$route.query.id,
        msgcontent: "",
        content2: "",
        pid: 0,
        pcl: "在这里输入您的留言吧",
        pclShow: true,
        showFACE: false,
        qqbq: [],
        messageList: [],
        currentPage: 1,
        dialogTableVisible: false,
        showEdit:true,
        rules: {
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
        }
      }
    },
    created() {
      for(var i = 1; i <= 74; i++) {
        this.qqbq.push(i);
      }
    },
    mounted (){
      this.init();
    },
    watch: {
      "$route"() {
        // 获取当前路径
        this.article_id = this.$route.query.id;
        this.init();
      }
    },
    methods: {
      init () {
        this.form = JSON.parse(localStorage.getItem('userInfo')) || this.form;
        axios.get(`http://api.speedcode.cn/api/leave/comment.html?p=${this.currentPage}&article_id=${this.article_id}`).then((res)=>{
          this.page.count = res.data.count;
          this.messageList = res.data.list;
        });
      },
//    inputkey (e){
//      this.msgcontent = this.content2 = e;
//      if(this.msgcontent.length <= 0) {
//        this.pclShow = true;
//      } else {
//        this.pclShow = false;
//      }
//    },
      setContent: function($e) { //模拟双向绑定
        this.content2 = $e.target.innerHTML;
        if(this.content2.length <= 0) {
          this.pclShow = true;
        } else {
          this.pclShow = false;
        }
      },
      clickEvent (e) {
        var target  = e.target.className;
        if(target !== 'qqbq' && target !== 'iconfont'){
          this.showFACE = false;
        }　　
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      //加粗
      setB: function() {
        this.$prompt('请输入加粗文字', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        }).then(({
          value
        }) => {
          this.msgcontent = this.content2 = this.content2 + "<b>" + value + "</b>";
        });
      },
      //连接
      setURL: function() {
        this.$prompt('请输入URL', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        }).then(({
          value
        }) => {
          var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
          if(!reg.test(value)) {
            this.$message.error('URL错误');
            return;
          }
          this.msgcontent = this.content2 = this.content2 + '<a href="' + value + '">' + value + '</a>';
        });

      },
      //显示表情
      setFACE: function() {
        this.showFACE = !this.showFACE;
      },
      //表情
      inpFACE: function(i) {
        this.msgcontent = this.content2 = this.content2 + "<img src='/img/qqbq/" + i + ".gif'>";
      },
      //引用
      setREFER: function() {
        this.$prompt('请输入引用内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: "textarea",
          showClose: false
        }).then(({
          value
        }) => {
          this.msgcontent = this.content2 = this.content2 + "<blockquote>" + value + "</blockquote>";
        });
      },
      //图片
      setIMG: function() {
        this.$prompt('请输入图片地址', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        }).then(({
          value
        }) => {
          var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
          if(!reg.test(value)) {
            this.$message.error('URL错误');
            return;
          }
          this.msgcontent = this.content2 = this.content2 + '<img src="' + value + '" />';
        });
      },
      //code
      setCODE: function() {
        this.$prompt('请输入代码内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: "textarea",
          showClose: false
        }).then(({
          value
        }) => {
          this.msgcontent = this.content2 = this.content2 + "<pre>" + value + "</pre>";
        });
      },
      //回复
      replyBtn (id,name){
        this.pid=id;
        this.pcl='回复'+(name || '匿名')+':';
        this.pclShow = true;
        this.clearInfo();
        document.querySelector("#messageBoard").scrollIntoView(true);
      },
      clearInfo (){
        //清除留言板内容
        this.showEdit = false;
        this.$nextTick(() => {
          this.showEdit=true;          
        });
        this.msgcontent = this.content2 = " ";
      },
      //弹出用户信息框
      showInfo (){
//      this.msgcontent = this.content2 = " ";
        var self = this;
        if(this.content2.length < 8) {
          this.$message.error('留言内容不得少于8个字');
          return;
        }
        this.dialogTableVisible = true;
      },
      //缺少http的url手动加上http
      addHttps (url){
        if (url.indexOf("http") === -1){
          url = "http://"+url;
        } 
        return url;
      },
      //提交信息
      postLeave (formName){
        var self = this;
        let status = 0;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            status = 1;
            return false;
          }
        });
        if (status == 1){
          return;
        }
        
        this.form.url = this.addHttps(this.form.url);
        window.localStorage.setItem('userInfo',JSON.stringify(this.form));
        let params = {
          content: this.content2,
          qq: this.form.qq,
          pid: this.pid,
          article_id:this.article_id,
          name:this.form.name,
          email:this.form.email,
          url:this.form.url
        };
        axios.post('http://api.speedcode.cn/api/leave/add.html',params).then((res)=>{
          if(res.data.code == 1) {
            this.clearInfo();
            self.pid = 0;
            self.$message.success("留言成功");
            this.dialogTableVisible = false;
            self.init();
          } else {
            self.$message.error(e.data.msg);
            this.dialogTableVisible = false;
          }
        });

      },
      getQqInfo: function(e) {
        var self = this;
        this.$emit("gets", {
          url: '/api/user/qqinfo.html?qq=' + e,
          success: function(e) {
            self.user.name = e.data.name;
            self.user.email = e.data.email;
            self.user.url = e.data.url;
          }
        });
      },
      currentChange (page){
        this.currentPage = page;
        this.init();
      }
    }
  }
</script>

<style>
  .messageBoard-box{
    padding: 20px 30px;
    background: #fff;
    margin-bottom:20px;
  }
  .userInfo .form{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    background-color: #FFF;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
  }
  .userInfo .form h3{
    margin-bottom: 20px;
  }
  .pcl{
    position: absolute;
    color: #CCC;
    margin-top: -155px;
    margin-left: 10px;
  }
</style>