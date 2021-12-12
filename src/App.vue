<template>
  <div id="app" class="container">
    <div class="btnZone content-center">
      <router-link :class="{ active: click === 1 }" to="/home">
        <span @click="sc(1)">Home</span>
      </router-link>

      <router-link :class="{ active: click === 2 }" to="/secondPage">
        <span @click="sc(2)">SecondPage</span>
      </router-link>
    </div>

    <hr style="margin: 20px 0; border: 1px solid yellow" />

    <transition name="slide-fade" mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      click: null
    }
  },

  methods: {
    sc(val) {
      this.click = val
    }
  },

  created() {
    this.$setTitle(this.$route.meta.title)
  },

  mounted() {
    this.sc(1)
    console.log('process.env', process.env)
    console.log('$router', this.$router)
    console.log('$route', this.$route)
  }
}
</script>

<style lang="scss">
.container {
  overflow: hidden;
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(skyblue, black);
  color: #893332;

  .btnZone {
    height: 100px;

    a {
      display: inline-block;
      margin: 0 20px;

      &:hover {
        color: #ffa733;
      }
    }
  }

  .active {
    color: #ffa733;
  }
}
</style>
