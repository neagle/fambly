import Vue from 'vue'

const Expand = Vue.component('expand', {
  functional: true,
  render (createElement, { children }) {
    const data = {
      props: {
        name: 'expand'
      },
      on: {
        enter (el) {
          const height = el.offsetHeight
          el.style.height = 0
          setTimeout(() => {
            el.style.height = height + 'px'
          })
        },
        afterEnter (el) {
          el.style.height = 'auto'
        },
        beforeLeave (el) {
          el.style.height = el.offsetHeight + 'px'
          setTimeout(() => {
            el.style.height = 0
          })
        },
        afterLeave (el) {
          el.style.height = 'auto'
        }
      }
    }
    return createElement('transition', data, children)
  }
})

export default Expand
