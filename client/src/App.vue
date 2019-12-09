<template>
  <main id="app">
    <Header @authChange="handleAuthChange" />
    <Title msg="Revizor Radar" />
    <StopsContainer v-bind:updatedBy="name" />
  </main>
</template>

<script>
import Title from "./components/Title.vue";
import Header from "./components/Header.vue";
import StopsContainer from "./components/StopsContainer.vue";

export default {
  name: "app",
  components: {
    Title,
    Header,
    StopsContainer
  },
  data() {
    return {
      name: "",
      auth: false
    };
  },
  methods: {
    handleAuthChange(value) {
      this.name = value.name;
      this.auth = value.auth;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 768px;
  margin: 0 auto;
  margin-top: 60px;
}
</style>
