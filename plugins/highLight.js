import Vue from 'vue'
import Hljs from 'highlight.js'
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre');
    blocks.forEach((block) => {
      Hljs.highlightBlock(block);
    })
  })
}
export default Highlight;

Vue.use(Highlight);