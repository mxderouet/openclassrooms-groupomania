// ./components/PostDetail.vue
<script>
const axios = require("axios");
const token = localStorage.getItem("token");
export default {
  name: "PostDetail",
  data() {
    return {
      userInfos: {},
      userId: 0,
      post: {
        subject: "",
        text: ""
      },
      comments: [],
      userName: ""
    };
  },
  mounted() {
    axios
      .get('http://localhost:3000/user/infos', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.userInfos = response.data;
      })
    const userId = localStorage.getItem("userId");
    this.userId = userId;
    const id = this.$route.params.id;
    // set an id that will be used to associate a post and its reply
    localStorage.setItem("commentId", id);
    const url = `http://localhost:3000/post/get/${id}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.post = response.data.post;
        this.comments = response.data.comments;
        this.userName = response.data.userName;
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.status === 401) {
          this.$router.push({ name: "Login" });
        }
      });
  },
};
</script>

<template>
  <div>
    <h1>{{ post.subject }}</h1>
    <p>
      {{ post.text }}
    </p>
    <img :src="post.image" alt="post image">
    <p>
      Post <strong>#{{ post.id }}</strong>
      <br>
      Written by: {{ userName || "anonymous user" }}
      <br>
      Created at: {{ post.createdAt }}
    </p>
    <button><router-link to="/create">Reply to post</router-link></button>
		<br>
    <button v-if="userInfos.isAdmin || userId === post.userId"><router-link :to="'/post/edit/' + post.id">Edit post</router-link></button>
		<br>
    <button v-if="userInfos.isAdmin || userId === post.userId"><router-link :to="'/post/delete/' + post.id">Delete post</router-link></button>
    <div v-for="comment in comments" :key="comment.id">
      <h2>
        {{ comment.subject }}
      </h2>
      <p>
        {{ comment.text }} 
      </p>
      <img :src="comment.image" alt="comment image">
        <p>
          Reply by: {{ comment.userId }}
          <br>
          Created at: {{ comment.createdAt }}
        </p>
    </div>
  </div>
</template>

<style>
a {
  text-decoration: none;
}
</style>
