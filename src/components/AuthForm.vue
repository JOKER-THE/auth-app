<template>
  <div class="auth">
    <form @submit.prevent="login">
        <h1>Авторизация</h1>
        <input required v-model="username" type="text" placeholder="Логин"/><br>
        <input required v-model="password" type="password" placeholder="Пароль"/><br>
        <button type="submit">Войти</button>
    </form>
    <div> Data: {{ user }} </div>
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
      user: ''
    }
  },
  methods: {
    async login () {
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
          query GetUser($userName: String!) {
            getUser(username: $userName) {
              username
              password
            }
          }`
        ,
        variables: {
          userName: this.username
        }
      })
      this.user = res.data.data.getUser
    }
  }
};

</script>