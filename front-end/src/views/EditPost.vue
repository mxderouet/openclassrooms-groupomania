// ./components/EditPost.vue
<script>
    const axios = require('axios');
    export default {
      name: 'EditPost',
        data() { 
        return { 
          form: {
              subject: '',
              text: ''
          }
        }
      },
      methods: {
        editPost(){
          var formData = new FormData();
          const token = localStorage.getItem('token');
          formData.append("subject", this.form.subject);
          formData.append("text", this.form.text);
          formData.append("image", this.$refs.userfile.files[0]);
          axios({
            method: "put",
            url: `http://localhost:3000/post/edit/${this.$route.params.id}`,
            data: formData,
            headers: { 
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
            }
          })
              .then(() => { 
                this.$router.push({ name: 'Posts' })
                console.log('Post updated!')
              })
            .catch((error) => { console.log(error.message) })
        }
      }
    }
</script>

<template>
  <div class="edit-post">
    <h1>Edit your post here</h1>
    <p>
        You can edit your post on this page
    </p>
        <form v-on:submit.prevent="editPost" enctype="multipart/form-data">
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
        <input type="submit" value="Edit post">
    </form>
  </div>
</template>