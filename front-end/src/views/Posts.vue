// ./components/Posts.vue
<script>
const axios = require("axios");
export default {
  name: "PostDetail",

  data() {
    return { posts: [] };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/post/get/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error.message)
        if (error.response.status === 401) {
          this.$router.push({ name: "Login" });
        }
      });
  },
};
</script>

<template>
  <div>
    <div class="posts">
      <h1>See the latest posts from the community</h1>
      <button><router-link to="/create">Create your post</router-link></button>
    </div>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.subject }}</h2>
      <p>
        {{ post.text }}
      </p>
      <img :src="post.image" />
      <p>
        Post <strong>#{{ post.post_id }}</strong>
        <br />
        Written by: {{ post.userId }}
        <br />
        Created at: {{ post.createdAt }}
      </p>
      <router-link :to="'/post/get/' + post.id">See post details</router-link>
    </div>
  </div>
</template>
