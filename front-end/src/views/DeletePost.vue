// ./components/DeletePost.vue
<script>
const axios = require('axios');
export default {
  methods: {
    async deletePost(res){
      try {
        const res = await axios.delete('http://localhost:3000/post/delete/:id');
        console.log(res.status);
      } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
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
    <br />
    <button v-on:click.prevent="deletePost">
      <router-link to="/posts">Yes, delete posts</router-link>
    </button>
  </div>
</template>