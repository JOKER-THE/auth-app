<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AuthForm/>
    <hr>
    <h3>Example 1</h3>
    <div>
      Data: {{ example }}
    </div>
    <button @click="getHello">Get</button>
  </div>
</template>

<script>
import axios from 'axios'
import AuthForm from './components/AuthForm.vue'

export default {
  name: 'App',
  data () {
    return {
      example: ''
    }
  },
  methods: {
    async getHello () {
      try {
        const res = await axios.post(
          'http://localhost:4000/graphql', {
            query: '{ hello }'
          }
        )
        this.example = res.data.data.hello
      } catch (e) {
        console.log('err', e)
      }
    }
  },
  components: {
    AuthForm
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
