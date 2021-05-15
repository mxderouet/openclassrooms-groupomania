// ./components/DeletePost.vue
<script>
const axios = require('axios');
const token = localStorage.getItem("token");
export default {
  name: "DeletePost",
  methods: {
    async deletePost(){
      console.log(this.$route.params.id);
      try {
        const res = await axios.delete(`http://localhost:3000/post/delete/${this.$route.params.id}`, { 
          headers: { Authorization: `Bearer: ${token}` },
        });
        console.log("Post deleted, status:", res.status);
        this.$router.push({ name: "Posts"});
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
</script>

<template>
  <div class="delete-post">
    <h1>Are you sure you want to delete this post?</h1>
    <p>This action is irreversible</p>
    <button><router-link to="/posts">No, go back to posts</router-link></button>
    <br>
    <button v-on:click.prevent="deletePost">
      Yes, delete posts
    </button>
  </div>
</template>