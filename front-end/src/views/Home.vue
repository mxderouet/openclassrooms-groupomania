<template>
  <div class="home">
    <h1>Welcome to Groupomania Network</h1>
    <button><router-link to="/login">Login</router-link></button>
    <br>
    <button><router-link to="/signup">Sign Up</router-link></button>
  </div>
</template>

<script>

export default {
  metaInfo() {
    return { title: 'Groupomania - Welcome to Groumpomania network' }
  },
  name: 'Home',
  components: {
  }
}
</script>
