<template lang="pug">
.create-list
  .input-group
    input.form-control(placeholder='New List' v-model='name' @keyup.enter='create()')
    .input-group-btn
      button.btn.btn-primary(:disabled='!name' @click='create()')
        i.fa.fa-check
</template>

<script>
import { mapActions } from 'Vuex'
export default {
  name: 'CreateList',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    create () {
      this.createList(this.name)
      // Reset input
      this.name = ''
    },
    ...mapActions('lists', ['createList'])
  }
}
</script>

<style lang="scss" scoped>
</style>
