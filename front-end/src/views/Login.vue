// ./components/Login.vue
// use reponse.data
// same for sign up with POST
// modify header with auth KEY
<script>
    const axios = require('axios');
    export default {
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
          axios.post('http://localhost:3000/login', this.form)
            .then(() => {
              // store TOKEN puis ajouter middleware auth 
              this.$router.push({ name: 'Posts' })
              console.log('Logged in!')
              })
            .catch((error) => { console.log(error) })
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
