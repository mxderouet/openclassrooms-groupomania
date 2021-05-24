// ./components/SignUp.vue
<script>
    const axios = require('axios');
    export default {
      metaInfo() {
        return { title: 'Groupomania - Sign up' }
      },
      name: 'SignUp',
        data() { 
        return { 
          form: {
              first_name: '',
              last_name: '',
              email: '',
              password: ''
          }
        }
      },
      methods: {
        submitForm(submitEvent){
          console.log('submitEvent:', submitEvent)
          axios.post('http://localhost:3000/signup', this.form)
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error) })
            .finally(() => { 
              console.log('User created!')
              this.$router.push({ name: 'Login' })
            });
        }
      }
    }
</script>

<template>
    <div>
      <h2> Create your account</h2>
      <form v-on:submit.prevent="submitForm">
          <div class="form-group">
              <label for="firstname">Firstname: </label>
              <input type="text" class="form-control" id="first" placeholder="Your firstname" v-model="form.first_name">
          </div>
          <div class="form-group">
              <label for="lastname">Lastname: </label>
              <input type="text" class="form-control" id="lastname" placeholder="Your lastname" v-model="form.last_name">
          </div>
          <div class="form-group">
              <label for="email">Email address: </label>
              <input type="email" class="form-control" id="email" placeholder="name@example.com"
                  v-model="form.email">
          </div>
          <div class="form-group">
              <label for="password">Password: </label>
              <input type="password" class="form-control" id="password" placeholder="xxxxxxxx"
                  v-model="form.password">
          </div>
          <div class="form-group">
              <button class="btn btn-primary">Submit</button>
          </div>
      </form>
    </div>
</template>

