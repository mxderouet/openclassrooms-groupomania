// ./components/Login.vue
<script>
    const axios = require('axios');
    export default {
      metaInfo() {
        return { title: 'Groupomania - Login' }
      },
      name: 'Login',
        data() { 
        return { 
          form: {
              email: '',
              password: ''
          }
        }
      },
      methods: {
        login(){
          localStorage.clear();
          axios.post('http://localhost:3000/login', this.form)
            .then((res) => {
              this.$router.push({ name: 'Posts' })
              this.$router.token = res.data.token
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('userId', res.data.userId)
              console.log('Logged in!')
              })
            .catch((error) => { console.log(error.message) })
        }
      }
    }
</script>

<template>
  <div class="login">
    <h1>Please login to use Groupomonia Network</h1>
    <form v-on:submit.prevent="login">
        <div class="form-group">
            <label for="email">Email: </label>
            <input v-model="form.email" type="text" name="email" id="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password: </label>
            <input v-model="form.password" type="password" name="password" id="password" required>
        </div>
        <input type="submit" value="Login">
    </form>
  </div>
</template>
