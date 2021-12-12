<template>
  <div class="full-width content-center">
    <img src="static/img/logo.png" style="width: 220px" />
    <WelcomeMessage name="World" />

    <div class="tac" style="width: 100%">
      <p>
        <span class="btn" @click="plus">点我+1</span>
        <br />
        <br />
        <span>{{ number }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import WelcomeMessage from 'components/Home/WelcomeMessage'

export default {
  data() {
    return {
      number: 0
    }
  },

  components: {
    WelcomeMessage
  },

  methods: {
    plus() {
      this.number++
    }
  }
}
</script>

<style lang="scss" scoped>
.content-center {
  flex-wrap: wrap;
}
</style>
