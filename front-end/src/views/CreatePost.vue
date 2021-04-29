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
          console.log(this.$refs.userfile)
          var formData = new FormData();

        formData.append("subject", this.form.subject);
        formData.append("text", this.form.text);
        // fichier HTML choisi par l'utilisateur
        // ajouter multer côté BACK
        formData.append("userfile", this.$refs.userfile.files[0]);
          axios.post('http://localhost:3000/post/create', formData)
            .then((res) => { 
              console.log(res) 
              this.$router.push({ name: 'Posts' })
              console.log('Post created!')
            })
            .catch((error) => { console.log(error) })
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
        <form v-on:submit.prevent="createPost" enctype="multipart/form-data">
        // faire form multipart avec axios
        // https://developer.mozilla.org/fr/docs/Web/API/FormData/Using_FormData_Objects
        <div class="form-group">
          <label for="subject">Subject: </label>
          <input v-model="form.subject" type="text" name="subject" id="subject" required>   
        </div>
        <div class="form-group">
          <label for="text">Text: </label>
          <input v-model="form.text" type="text" name="text" id="text" required>  
        </div>
        <div class="form-group">
          <label for="image">Image: </label>
          <input type="file" name="image" id="image" ref="userfile" required>
        </div>
        <input type="submit" value="Submit post">
    </form>
  </div>
</template>