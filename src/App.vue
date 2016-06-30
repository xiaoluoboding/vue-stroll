<script>
  import VueStroll from './vue-stroll.vue'

  export default {
    data() {
      return {
        msg: 'Vue.js + Stroll.js.',
        el: "#app ul",
        effects: [
          'grow', 'cards', 'curl', 'wave', 'flip', 'fly', 'fly-simplified',
          'fly-reverse', 'skew', 'fan', 'papercut', 'helix', 'twirl', 'tilt',
          'zipper', 'fade'
        ],
        collection: [
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
          'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
        ]
      }
    },

    components: {
      VueStroll
    }
  }
</script>

<template>
  <div id="app">
    <header>
      <h1>
        {{ msg }} Awesome CSS list scroll effects for Vue.js.
        See <a href="https://github.com/xiaoluoboding/vue-stroll" target="_blank">Doc</a>.
      </h1>
      <hr>
    </header>
    <article v-for="ef in effects | orderBy ef 1">
      <h2 class="title" v-text="ef"></h2>
      <vue-stroll el="#app ul" :collection="collection" :effect="ef"></vue-stroll>
    </article>
    <a class="github-fork-ribbon" href="https://github.com/xiaoluoboding/vue-stroll" title="Fork me on GitHub"></a>
  </div>
</template>

<style>
body {
  background: #333;
  font-family: Helvetica, sans-serif;
}

header {
  margin: 15px;
}

article {
  display: inline-block;
  margin: 10px;
}

#app h1 {
  color: #fff;
}

#app h1 a {
  color: #e74c3c;
}

#app h1 a:hover {
  color: #c0392b;
}

.title {
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
  text-transform: uppercase;
}
</style>
