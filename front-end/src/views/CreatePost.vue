<template>
  <div class="create-post">
    <h1>Create your post here</h1>
    <p>
        Feel free to share with the community what is on your mind to day
    </p>
        <form action="" method="post" class="form-post">
        <label for="subject">Subject: </label>
        <input type="text" name="subject" id="subject" required>   

        <label for="text">Text: </label>
        <input type="text" name="text" id="text" required>  

        <label for="image">Image: </label>
        <input type="file" name="image" id="image" required>

        <input type="submit" value="Submit post">
    </form>
  </div>
</template>