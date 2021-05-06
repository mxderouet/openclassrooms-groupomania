// ./components/PostDetail.vue
<script>
const axios = require("axios");
export default {
  name: "PostDetail",
  data() {
    return {
      post: {
        subject: "",
        text: "",
      },
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    const id = this.$route.params.id;
    const url = `http://localhost:3000/post/get/${id}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.post = response.data;
        console.log(this.post);
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
      Created at: {{ post.createdAt.slice(0, -5) }}
    </p>
    <button><router-link to="/create">Reply to post</router-link></button>
		<br>
    <button><router-link to="/edit">Edit post</router-link></button>
		<br>
    <button><router-link to="/delete">Delete post</router-link></button>
  </div>
</template>

<style>
a {
  text-decoration: none;
}
</style>
