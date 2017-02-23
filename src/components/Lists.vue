<template lang="pug">
.lists
  .display(v-show='!editMode')
    transition-group(name='list' tag='div' mode='out-in').list-group
      a.list-group-item.list-group-item-action.justify-content-between(
        v-for='list in lists'
        href='#'
        v-bind:key='list._id'
        @click.prevent='selectList(list)'
      )
        span.mr-auto {{ list.name }}
        .right
          .badge.badge-default.badge-pill(v-show='!editMode')
            | {{ list.items && list.items.length }}

  .edit(v-show='editMode')
    draggable(
      v-bind:list='editableLists'
      v-bind:options='draggableOptions'
      @end='onSortEnd'
    )
      transition-group(name='list' tag='div' mode='out-in').list-group
        .list-group-item.justify-content-between(
          v-for='list in editableLists'
          href='#'
          v-bind:key='list._id'
        )
          i.fa.fa-bars.handle.mr-3
          form.edit-list-name.mr-auto
            input.form-control(v-model='list.name' @change='updateLists(editableLists)')

          .right.ml-2
            button.delete.btn.btn-danger.btn-sm.ml-2(@click='deleteList(list)')
              i.fa.fa-trash
</template>

<script>
/* eslint no-unused-vars:0 */
import { mapState, mapMutations, mapActions } from 'vuex'
import * as types from '../store/mutation-types'
import _ from 'lodash'
import Draggable from 'vuedraggable'

export default {

  name: 'Lists',

  components: { Draggable },

  data () {
    return {
      draggableOptions: {
        clone: false,
        handle: '.handle',
        animation: 150,
        ghostClass: 'active'
      }
    }
  },

  computed: {
    editableLists: {
      get () {
        return _.cloneDeep(this.lists)
      },
      set (value) {
        this.updateLists(value)
      }
    },
    ...mapState({
      editMode: state => state.editMode,
      lists: state => state.lists.data
    })
  },

  created () {
    this.getLists()
  },

  methods: {
    onSortEnd () {
      this.editableLists = this.editableLists.map((list, i) => {
        // Order items in reverse, so that we can add items to the
        // top without changing indexes on every item in the list
        list.index = (this.editableLists.length - 1) - i
        return list
      })
    },
    ...mapActions(['selectList']),
    ...mapActions('lists', ['getLists', 'deleteList', 'updateLists'])
  }

}
</script>

<style lang="scss">
.edit-list-name {
  flex: 1 1 auto;
}

.list-group-item {
  transition: background-color 0.2s;
}
.list-enter-active, .list-leave-active {
  transition: all 0.2s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.handle {
  cursor: move;
}
</style>
