// ./components/CreatePost.vue
<script>
    const axios = require('axios');
    export default {
      metaInfo() {
        return { title: 'Groupomania - Create post' }
      },
      name: 'CreatePost',
        data() { 
        return { 
          form: {
              subject: '',
              text: ''
          }
        }
      },
      methods: {
        createPost(){
          var formData = new FormData();
          const token = localStorage.getItem("token");
          const commentId = localStorage.getItem("commentId");
          // use commentId if it's a reply or set it to 0 if it's an original post
          formData.append("post_id", commentId ? commentId : 0);
          formData.append("subject", this.form.subject);
          formData.append("text", this.form.text);
          formData.append("image", this.$refs.userfile.files[0]);
          axios({
            method: "post",
            url: 'http://localhost:3000/post/create',
            data: formData,
            headers: { 
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
            }
          })
              .then(() => { 
                this.$router.push({ name: 'Posts' })
                console.log('Post created!')
                localStorage.removeItem("commentId");
              })
            .catch((error) => { console.log(error.message) })
        }
      }
    }
</script>

<template>
  <div class="create-post">
    <h1>Create a post or a reply here</h1>
    <p>
        Feel free to share with the community what is on your mind today
    </p>
        <form v-on:submit.prevent="createPost" enctype="multipart/form-data">
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