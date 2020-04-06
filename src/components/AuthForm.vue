<template>
  <div class="auth">
    <div v-if="id"><p style="color: green">Вы авторизованы, {{ id.username }}</p></div>
    <div v-else><p style="color: red">Вы не вошли</p></div>
    <form @submit.prevent="login">
        <h1>Авторизация</h1>
        <input required v-model="username" type="text" placeholder="Логин"/><br>
        <input required v-model="password" type="password" placeholder="Пароль"/><br>
        <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AuthForm',
  data() {
    return {
      username: '',
      password: '',
      user: '',
      id: ''
    }
  },
  methods: {
    async login () {
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
          query GetUser($userName: String!, $pass: String!) {
            getUser(username: $userName, password: $pass) {
              token
            }
          }`
        ,
        variables: {
          userName: this.username,
          pass: this.password
        }
      })
      this.user = res.data.data.getUser
      document.cookie = 'token=' + this.user.token
      this.auth()
    },
    async auth () {
      var cookie = document.cookie
      cookie = cookie.split('token=')
      var token = cookie[1].split(';')
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
          query Auth($token: String!) {
            auth(token: $token) {
              id
              username
            }
          }`
        ,
        variables: {
          token: token[0]
        }
      })
      this.id = res.data.data.auth
    }
  },
  beforeMount() {
    this.auth()
  }
};

</script>