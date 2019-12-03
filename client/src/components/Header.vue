<template>
  <div class="header">
    <div class="logo-container">
      <img src="https://picsum.photos/seed/picsum/200/50" />
    </div>
    <div>
      <Auth />
    </div>
  </div>
</template>

<script>
import Auth from "./Auth";
export default {
  name: "Header",
  components: {
    Auth
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo-container {
    width: 200px;
    max-width: 200px;
  }
}
</style>
