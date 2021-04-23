import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import PostDetail from '../views/PostDetail.vue'
import Posts from '../views/Posts.vue'
import CreatePost from '../views/CreatePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/post/get/:id',
    name: 'PostDetail',
    component: PostDetail
    },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost
  }
]

const router = new VueRouter({
  routes
})

export default router
