// ./components/SignUp.vue
<script>
    const axios = require('axios');
    export default {
      name: 'SignUp',
        data() { 
        return { 
          form: {
              firstname: '',
              lastname: '',
              email: '',
              password: ''
          }
        }
      },
      methods: {
        submitForm(){
          axios.post('http://localhost:3000/signup', this.form)
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error) })
            .finally(() => { 
              console.log('User created!')
              this.$router.push({ name: 'Posts' })
            });
        }
      }
    }
</script>

<template>
  <div class="signup">
    <h1>Welcome to Groupomonia Network</h1>
    <p>
      Please sign up to use our services 
    </p>
        <form v-on:submit.prevent="submitForm" class="form-signup">
        <!-- <form action="" method="post" class="form-signup"> -->
        <label for="firstname">Firstname: </label>
        <input type="text" name="firstname" id="firstname" required>   

        <label for="lastname">Lastname: </label>
        <input type="text" name="lastname" id="lastname" required>  

        <label for="email">Email: </label>
        <input type="email" name="email" id="email" required>

        <label for="password">Password: </label>
        <input type="password" name="password" id="password" required>

        <input type="submit" value="Sign up">
    </form>
  </div>
</template>
