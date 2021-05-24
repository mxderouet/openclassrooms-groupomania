// ./components/Profile.vue
<script>
const axios = require('axios');
const token = localStorage.getItem("token");
export default {
  metaInfo() {
    return { title: 'Groupomania - Your profile' }
  },
  name: "Profile",
  data() {
    return {
      userInfos: {},
      userId: 0
    };
  },
  mounted() {
    axios
      .get('http://localhost:3000/user/infos', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.userInfos = response.data;
        const userId = localStorage.getItem("userId");
        this.userId = userId;
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.status === 401) {
          this.$router.push({ name: "Login" });
        }
      });
  }
};
</script>

<template>
  <div class="profile">
    <h1>Your profile information:</h1>
    <p>
      Firstname: {{ userInfos.first_name }}
      <br>
      Lastname: {{ userInfos.last_name }}
      <br>
      Email: {{ userInfos.email }}
    </p>
    <button><router-link to="/profile/delete">Delete profile</router-link></button>
  </div>
</template>