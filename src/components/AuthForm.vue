<template>
  <div class="auth">
    <form @submit.prevent="login">
        <h1>Авторизация</h1>
        <input required v-model="username" type="text" placeholder="Логин"/><br>
        <input required v-model="password" type="password" placeholder="Пароль"/><br>
        <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'AuthForm',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log(this.username, this.password)
    }
  }
};

</script>