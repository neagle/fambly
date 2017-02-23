<template lang="pug">
div#app
  nav.navbar.navbar-inverse.bg-primary.flex-row
    transition(name='back-button')
      form.form-inline.mr-2.back-button(v-show='selectedList')
        button.btn.btn-secondary.btn-sm(@click.prevent='unSelectList()')
          i.fa.fa-arrow-left
    a.navbar-brand.mr-auto(href='#') Fambly
      transition(name='list-name')
        span(v-if='selectedList')
          =' '
          | &rarr; {{ selectedList.name }}

    form.form-inline(v-if='loggedIn')
      button.btn.btn-secondary.btn-sm(
        @click.prevent='toggleEditMode(!editMode)'
      )
        | {{ editMode ? 'Stop Editing' : 'Edit' }}


  .section
    .container-fluid
      .row
        .col-lg-12
          login(v-if='!loggedIn')

      transition(name='slide-left')
        .row.mt-2(v-if='loggedIn && !selectedList')
          .col-lg-12
            createList.mb-2(v-show='editMode')
            lists

      transition(name='slide-right')
        .row.mt-2(v-if='loggedIn && selectedList')
          .col-lg-12
            createItem.mb-2
            list
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Sortable from 'vue-sortable'
import Login from './Login.vue'
import Lists from './Lists.vue'
import List from './List.vue'
import CreateList from './CreateList.vue'
import CreateItem from './CreateItem.vue'
import * as types from '../store/mutation-types'

Vue.use(Sortable)

export default {
  name: 'App',
  components: { Login, Lists, List, CreateList, CreateItem },
  computed: {
    loggedIn () {
      return Boolean(this.token)
    },
    ...mapState(['token', 'selectedList', 'editMode'])
  },
  methods: {
    ...mapMutations({
      selectList: types.SELECT_LIST,
      unSelectList: types.UNSELECT_LIST,
      toggleEditMode: types.TOGGLE_EDIT_MODE
    })
  }
}
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Rubik');
$fa-font-path: '~font-awesome/fonts';
@import '~font-awesome/scss/font-awesome';
@import '~bootstrap/scss/bootstrap';

.back-button {
  max-width: 40px;
  position: relative;
  left: 0;
}
.back-button-enter-active, .back-button-leave-active {
  transition: all 0.5s;
}
.back-button-enter, .back-button-leave-to {
  max-width: 0;
  margin-right: 0 !important;
  left: -100px;
}

.list-name-enter-active, .list-name-leave-active {
  transition: all 0.5s;
}

.list-name-enter, .list-name-leave-to {
    opacity: 0;
}

.slide-left-enter-active, .slide-left-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.5s;
}
.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-enter-active, .slide-right-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.5s;
}
.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
