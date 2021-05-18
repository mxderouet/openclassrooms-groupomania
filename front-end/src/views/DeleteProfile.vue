// ./components/DeleteProfile.vue
<script>
const axios = require('axios');
const token = localStorage.getItem("token");
export default {
  name: "DeleteProfile",
  methods: {
    async deleteProfile(){
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.delete(`http://localhost:3000/user/delete/${userId}`, { 
          headers: { Authorization: `Bearer: ${token}` },
        });
        console.log("Profile deleted, status:", res.status);
        localStorage.clear();
        this.$router.push({ name: "Home"});
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
</script>

<template>
  <div class="delete-post">
    <h1>Are you sure you want to delete your profile?</h1>
    <p>This action is irreversible</p>
    <button><router-link to="/posts">No</router-link></button>
    <br>
    <button v-on:click.prevent="deleteProfile">
      Yes
    </button>
  </div>
</template>