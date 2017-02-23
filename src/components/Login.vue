<template lang="pug">
.login.mt-3
  form(@submit.prevent='getToken({ email, password })')
    .form-group
      label(for='emailInput') Email
      input#emailInput.form-control(
        type='text'
        v-model='email'
        placeholder='name@domain.com'
      )

    .form-group
      label(for='passwordInput') Password
      input#passwordInput.form-control(type='password' v-model='password' placeholder='Password')

    button.btn.btn-primary.pull-right Submit
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: window.localStorage.getItem('email') || '',
      password: ''
    }
  },
  watch: {
    email: function (newEmail) {
      window.localStorage.setItem('email', newEmail)
    }
  },
  methods: mapActions([
    'getToken'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
