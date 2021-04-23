// ./components/SignUp.vue
<script>
    const axios = require('axios');
    export default {
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
        // mounted() {
        //   console.log('mail:', this.email)
        // },
        submitForm(submitEvent){
          // problème pour récupérer champs du formulaire
          // https://5balloons.info/post-form-data-to-api-using-axios-in-vuejs/
          // this.form.first_name = submitEvent.target.elements.name.first_name
          this.form.last_name = this.last_name
          this.form.password = this.password
          this.form.email = this.email
          console.log('form:', this.form)
          
          console.log('submitEvent:', submitEvent)
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
    <div>
            <h2> Contact US </h2>
            <form v-on:submit.prevent="submitForm">
                <div class="form-group">
                    <label for="firstname">Firstname: </label>
                    <input type="text" class="form-control" id="first" placeholder="Your firstname" v-model="form.first_name">
                </div>
                <div class="form-group">
                    <label for="nlastame">Lastname: </label>
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

