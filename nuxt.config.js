const axios = require('axios');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '极速代码-技术博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'js, vue, h5, web前端, 个人博客, 极速代码, 刘曦'},
      { hid: 'description', name: 'description', content: '极速代码-技术博客，专注于前端技术分享的个人博客' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
     {src: 'https://hm.baidu.com/hm.js?33c7371447c5e73fcea8446eb44d7b8d'},/*引入百度统计的js*/
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: {
      allChunks: true
    },
    vendor: ['~/plugins/axios.js', '~/plugins/elementUI.js', '~/plugins/highLight.js'],
  },
  modules: [
   '@nuxtjs/sitemap'
  ],
  sitemap: {
    exclude: [
      '/exclude'
    ],
    generate: true,
    gzip: false,
    hostname: 'http://www.speedcode.cn',
    routes: function () {
      return axios.get('http://api.speedcode.cn/api/article/articleids')
      .then((res) => {
        return res.data.map((user) => {
          return '/ArticleDetail?id=' + user.id
        })
      })
    }
  },
  plugins: [
   {src: '~/plugins/elementUI.js'},
   {src: '~/plugins/highLight.js'},
   {src: '~/plugins/filter.js'},
   {src: '~/plugins/ga.js'},
   {src: '~/plugins/globalTitle.js'},
  ],
  css : [
    '~assets/styles/default.css',
    '~assets/styles/style.css',
  ],
//router: {
//  middleware: 'auth'
//}  
}
