<script>
  export default {
    props: [
      'el',
      'effect',
      'collection'
    ],

    ready() {
      var self = this;

      window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      var Stroll = {
        bind: function(element) {
          var items = Array.prototype.slice.apply(element.children);

          // caching some heights so we don't need to go back to the DOM so much
          var listHeight = element.offsetHeight;

          // one loop to get the offsets from the DOM
          for (var i = 0, len = items.length; i < len; i++) {
            items[i]._offsetTop = items[i].offsetTop
            items[i]._offsetHeight = items[i].offsetHeight
          }

          return (function() {
            (function animloop() {
              window.requestAnimFrame(animloop);
              update();
            })();

            // Apply past/future classes to list items outside of the viewport
            function update() {
              var scrollTop = element.pageYOffset || element.scrollTop,
                scrollBottom = scrollTop + listHeight;

              // Quit if nothing changed.
              if (scrollTop == element.lastTop) return;

              element.lastTop = scrollTop;

              // One loop to make our changes to the DOM
              for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];

                // Above list viewport
                if (item._offsetTop + item._offsetHeight < scrollTop) {
                  item.classList.add('past');
                } else if (item._offsetTop > scrollBottom) {
                  item.classList.add('future');
                } else {
                  item.classList.remove('past');
                  item.classList.remove('future');
                }
              }
            }
          })();
        }
      };

      var lists = document.querySelectorAll(self.el);

      for (var i = 0; i < lists.length; i++) {
        Stroll.bind(lists[i]);
      }
    }
  }
</script>

<template>
  <ul id="vue-stroll" class="vue-stroll" :class="effect">
    <li v-for="col in collection" track-by="$index">
      <span v-text="col"></span>
    </li>
  </ul>
</template>

<style scoped>
ul {
  position: relative;
  width: 200px;
  height: 320px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  margin: 0;
}

ul li {
  list-style: none;
  position: relative;
  padding: 6px;
  background: #fff;
  color: #252525;
  font-size: 16px;
  z-index: 2;
}

ul li:nth-child(odd) {
  background: #eee;
}

@media (max-width: 750px) {
  ul {
    min-width: 216px;
    height: 320px;
  }
}

@media (max-width: 480px) {
  ul {
    min-width: 280px;
    height: 320px;
  }
}
</style>
