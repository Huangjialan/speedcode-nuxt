import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _665655da = () => import('..\\pages\\LeaveNote\\LeaveNote.vue' /* webpackChunkName: "pages_LeaveNote_LeaveNote" */).then(m => m.default || m)
const _019f93b3 = () => import('..\\pages\\ArticleList\\ArticleList.vue' /* webpackChunkName: "pages_ArticleList_ArticleList" */).then(m => m.default || m)
const _375eff13 = () => import('..\\pages\\About\\About.vue' /* webpackChunkName: "pages_About_About" */).then(m => m.default || m)
const _49e6d0ec = () => import('..\\pages\\ArticleDetail\\_ArticleDetail.vue' /* webpackChunkName: "pages_ArticleDetail__ArticleDetail" */).then(m => m.default || m)
const _474a23a2 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/LeaveNote/LeaveNote",
			component: _665655da,
			name: "LeaveNote-LeaveNote"
		},
		{
			path: "/ArticleList/ArticleList",
			component: _019f93b3,
			name: "ArticleList-ArticleList"
		},
		{
			path: "/About/About",
			component: _375eff13,
			name: "About-About"
		},
		{
			path: "/ArticleDetail/:ArticleDetail?",
			component: _49e6d0ec,
			name: "ArticleDetail-ArticleDetail"
		},
		{
			path: "/",
			component: _474a23a2,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
