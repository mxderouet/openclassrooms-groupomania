<script>
    const axios = require('axios');
    export default {
        name: 'PostDetail',
        data() { return { posts: [] }
        },
        mounted() {
        axios
            .get('http://localhost:3000/post/get/')
            .then(response => { 
                console.log(response.data) 
                this.posts = response.data
            })
        },
    }
</script>

<template>
    <div>  
        <div class="posts">
            <h1>See the latest posts from the community</h1>
            <button><router-link to="/create">Create your post</router-link></button>
        </div>
        <div v-for="post in posts" :key="post.id">
            <h2>{{ post.subject }} </h2>
            <p>
                {{ post.text }}
            </p>
            <img :src="post.image">
            <p>
                Post <strong>#{{ post.post_id }}</strong>
                <br>
                Written by: {{ post.userId }}
                <br>
                Created at: {{ post.createdAt.slice(0, -5) }}
            </p>
            <router-link :to="'/post/get/' + post.id ">See post details</router-link>
        </div>
    </div>
</template>
