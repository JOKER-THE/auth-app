<template>
  <div class="auth">
    <form @submit.prevent="login">
        <h1>Авторизация</h1>
        <input required v-model="username" type="text" placeholder="Логин"/><br>
        <input required v-model="password" type="password" placeholder="Пароль"/><br>
        <button type="submit">Войти</button>
    </form>
    <div>
      Data: 
      <div v-for="user in users" :key="user.username">
        {{ user }}
      </div>
    </div>
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
      users: []
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(
          'http://localhost:4000/graphql', {
            query: `{ 
              getUsers {
                username
                password
              }
            }`
          }
        )
        this.users = res.data.data
      } catch (e) {
        console.log('err', e)
      }
    }
  }
};

</script>