// ./components/PostDetail.vue
<script>
const axios = require("axios");
export default {
  name: "PostDetail",
  data() {
    return {
      isAdmin: 0,
      userId: 0,
      post: {
        subject: "",
        text: "",
      },
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.userId = userId;
    const id = this.$route.params.id;
    const url = `http://localhost:3000/post/get/${id}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.post = response.data;
      })
      .catch((error) => {
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
    <img :src="post.image" />
    <p>
      Post <strong>#{{ post.post_id }}</strong>
      <br>
      Written by: {{ post.userId }}
      <br>
      Created at: {{ post.createdAt }}
    </p>
    <button><router-link to="/create">Reply to post</router-link></button>
		<br>
    <button v-if="isAdmin === 1 || userId === post.userId"><router-link :to="'/post/edit/' + post.id">Edit post</router-link></button>
		<br>
    <button v-if="isAdmin === 1 || userId === post.userId"><router-link :to="'/post/delete/' + post.id">Delete post</router-link></button>
  </div>
</template>

<style>
a {
  text-decoration: none;
}
</style>
