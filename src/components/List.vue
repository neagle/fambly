
<template lang="pug">
.list
  .display(v-show='!editMode').mb-3
    transition-group(name='list' tag='div').list-group
      a.list-group-item.list-group-item-action.d-flex.list-item(
        v-for='item in items'
        href='#'
        v-bind:key='item._id'
        @click='selectItem(item._id)'
      )
        .list-group-item-content.mr-auto
          .name {{ item.name }}
          expand
            .meta.text-muted.small(v-show='selectedItemId === item._id')
              | Added
              =' '
              time {{ relativeDate(item.createdAt) }}
              =' '
              | by {{ item.createdBy.name ? item.createdBy.name : item.createdBy.email }}

        .right
          button.check.btn.btn-success.btn-sm.ml-2(
            :disabled='item.completed'
            @click.once.stop='checkItem(item)'
          )
            i.fa.fa-check
  .edit(v-show='editMode').mb-3
    draggable(
      v-bind:list='editableItems'
      v-bind:options='draggableOptions'
      @end='onSortEnd'
    )
      transition-group(name='list' tag='div').list-group
        .list-group-item.justify-content-between(
          v-for='(item, index) in editableItems'
          href='#'
          v-bind:key='item._id'
        )
          i.fa.fa-bars.handle.mr-3
          form.form-inline.edit-item-name.mr-2
            input.form-control(v-model='item.name' @change='updateItem(item)')

          .right
            button.btn.btn-danger.btn-sm.ml-2(@click='deleteItem(item)')
              i.fa.fa-trash
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Draggable from 'vuedraggable'
import moment from 'moment'
import Expand from './transitions/Expand.js'
import _ from 'lodash'

export default {
  name: 'List',
  components: { Draggable, Expand },
  data () {
    return {
      selectedItemId: null,
      draggableOptions: {
        clonse: false,
        handle: '.handle',
        animation: 150,
        ghostClass: 'active'
      }
    }
  },
  computed: {
    editableItems: {
      get () {
        return _.cloneDeep(this.items)
      },
      set (newValue) {
        this.updateItems(newValue)
      }
    },
    ...mapState({
      editMode: state => state.editMode,
      items: state => state.items.data
    })
  },
  methods: {
    onSortEnd () {
      this.editableItems = this.editableItems.map((item, i) => {
        item.index = (this.editableItems.length - 1) - i
        return item
      })
      this.updateItems(this.editableItems)
    },
    checkItem (item) {
      this.updateItem({ _id: item._id, completed: true })
    },
    relativeDate (date) {
      return moment(date).fromNow()
    },
    selectItem (id) {
      if (this.selectedItemId === id) {
        this.selectedItemId = null
      } else {
        this.selectedItemId = id
      }
    },
    ...mapActions('items', ['deleteItem', 'updateItems', 'updateItem'])
  }
}
</script>

<style lang="scss" scoped>
.check {
  cursor: pointer;
}

.edit-item-name {
  flex: 1 1 auto;
}

.list-group-item-content {
  flex: 1 1 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  // outline: 1px solid green;
  transition: all 0.3s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  // outline: 1px solid red;
  opacity: 0;
  transform: translateX(30px);
}

.meta {
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.measure-height {
  height: auto;
  transition: none;
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s;
}
.expand-enter, .expand-leave-to {
  // height: 0;
  opacity: 0;
  // overflow: hidden;
}

</style>
