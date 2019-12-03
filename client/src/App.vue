<template>
  <main id="app">
    <Header />
    <HelloWorld msg="Adina konjo <3" />
    <Search />
    <StopsContainer />
  </main>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import StopsContainer from "./components/StopsContainer.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    Header,
    Search,
    StopsContainer
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
  margin-top: 60px;
}
</style>
