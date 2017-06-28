# vue-stroll
[![Travis Build Status](https://travis-ci.org/xiaoluoboding/vue-stroll.svg?branch=master)](https://travis-ci.org/xiaoluoboding/vue-stroll)
[![npm](https://img.shields.io/npm/v/vue-stroll.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/vue-stroll)
![Download](https://img.shields.io/npm/dt/vue-stroll.svg?style=flat-square)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/xiaoluoboding/vue-stroll/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/xiaoluoboding/vue-stroll.svg?style=flat-square)](https://github.com/xiaoluoboding/vue-stroll/stargazers)

Vue.js + Stroll.js. Awesome CSS list scroll effects for Vue2.x. See [Demo](https://xiaoluoboding.github.io/vue-stroll)

[![NPM](https://nodei.co/npm/vue-stroll.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-stroll/)


# Installation

```bash
npm i vue-stroll -S
```

# CDN

### Use this URL for development
https://rawgit.com/xiaoluoboding/vue-stroll/master/dist/vue-stroll.min.js

### Use this URL in production
https://cdn.rawgit.com/xiaoluoboding/vue-stroll/master/dist/vue-stroll.min.js

# Import

**ES6**
```javascript
import VueStroll from 'vue-stroll'
```

**CommonJS**

```javascript
var VueStroll = require('vue-stroll');
```

**script**

```javascript
<script type="text/javascript" src="vue/dist/vue.min.js"></script>
<script type="text/javascript" src="vue-stroll/dist/vue-stroll.min.js"></script>
<script type="text/javascript">
    var VueStroll = window['vue-stroll'];
</script>
```

# Usage

**script**

```javascript
new Vue({
  el: 'body',
  data: {
    el: '#app ul',
    effect: 'cards',
    collection: [
      'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
    ]
  },
  components: { VueStroll }
});
```

**html**

```html
<!-- Dynamic props -->
<vue-stroll :el="el" :collection="collection" :effect="effect"></vue-stroll>
```

# Props

| Name  | Type | Desc  | Example  |
| :-------- | :--------:|:--------:|:--------:|
| el | String  | The element you will bind | "#app ul" |
| collection | Array  | The list you will render | ['One', 'Two', 'Three', 'Four', 'Five'] |
| effect | String  | The awesome effects style | `wave` See [Demo](https://xiaoluoboding.github.io/vue-stroll) |

# License

MIT
