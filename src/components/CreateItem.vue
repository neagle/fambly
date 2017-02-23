<template lang="pug">
.create-list
  .input-group
    input.form-control(placeholder='New Item' v-model='name' @keyup.enter='create()')
    .input-group-btn
      button.btn.btn-primary(:disabled='!name' @click='createList()')
        i.fa.fa-check
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateItem',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    create () {
      this.createItem(this.name)
      // Reset input
      this.name = ''
    },
    ...mapActions('items', ['createItem'])
  }
}
</script>

<style lang="scss" scoped>
</style>
