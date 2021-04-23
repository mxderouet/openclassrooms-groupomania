<script>
    const axios = require('axios');
    export default {
      name: 'CreatePost',
        data() { 
        return { 
          form: {
              subject: '',
              text: '',
              image: ''
          }
        }
      },
      methods: {
        createPost(){
          axios.post('http://localhost:3000/post/create', this.form)
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error) })
            .finally(() => { 
              console.log('Post created!')
              this.$router.push({ name: 'Posts' })
            });
        }
      }
    }
</script>

<template>
  <div class="create-post">
    <h1>Create your post here</h1>
    <p>
        Feel free to share with the community what is on your mind to day
    </p>
        <form v-on:submit.prevent="createPost">
        <div class="form-group">
          <label for="subject">Subject: </label>
          <input v-model="subject" type="text" name="subject" id="subject" required>   
        </div>
        <div class="form-group">
          <label for="text">Text: </label>
          <input v-model="text" type="text" name="text" id="text" required>  
        </div>
        <div class="form-group">
          <label for="image">Image: </label>
          <input type="file" name="image" id="image" required>
        </div>
        <input type="submit" value="Submit post">
    </form>
  </div>
</template>