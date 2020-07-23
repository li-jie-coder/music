import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import home from '../components/tabbar/home'
import playing from '../components/tabbar/playing'
import communication from '../components/tabbar/communication'
import login from '../components/tabbar/login'
import my from '../components/tabbar/my'
import search from '../components/searchbar/search'
import musiclist from '../components/musiclist/musiclist'
import recommendlist from '../components/redball/recommendlist'
import allmusiclist from '../components/redball/allmusiclist'
import sort from '../components/redball/sort'
import radiostation from '../components/redball/radiostation'
import mv from '../components/mv/mv'

Vue.use(Router)

export default new Router({
  path: '/',
  component: App,
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/playing', component: playing },
    { path: '/playing/:id', component: playing },
    { path: '/musiclist/:id', component: musiclist },
    { path: '/communication', component: communication },
    { path: '/login', component: login },
    { path: '/mv/:id', component: mv },
    { path: '/my/:id', component: my },
    { path: '/search', component: search },
    { path: '/recommendlist', component: recommendlist },
    { path: '/allmusiclist', component: allmusiclist },
    { path: '/sort', component: sort },
    { path: '/radiostation', component: radiostation }


  ]
})
