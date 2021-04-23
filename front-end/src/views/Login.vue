// AXIOS GET
// use reponse.data
// same for sign up with POST
// modify header with auth KEY

<template>
  <div class="login">
    <h1>Please login to use Groupomonia Network</h1>
    <form action="" method="get" class="form-login">
        <label for="email">Email: </label>
        <input type="text" name="email" id="email" required>

        <label for="password">Password: </label>
        <input type="password" name="password" id="password" required>

        <input type="submit" value="Submit">
    </form>
  </div>
</template>
