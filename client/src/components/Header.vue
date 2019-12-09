<template>
  <div class="header">
    <div class="logo-container">
      <img src="https://picsum.photos/seed/picsum/200/50" />
    </div>
    <div>
      <Auth @authChange="handleAuthChange" />
    </div>
  </div>
</template>

<script>
import Auth from "./Auth";
export default {
  name: "Header",
  components: {
    Auth
  },
  data() {
    return {
      name: "",
      auth: false
    };
  },
  methods: {
    handleAuthChange(value) {
      // eslint-disable-next-line no-console
      console.log(value);
      this.name = value.name;
      this.auth = value.auth;
    }
  },
  watch: {
    name: function() {
      this.$emit("authChange", { name: this.name, auth: this.auth });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo-container {
    width: 200px;
    max-width: 200px;
  }
}
</style>
