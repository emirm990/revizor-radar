<template>
  <button>{{ buttonText }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonText: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
button {
  max-height: 50px;
  height: 50px;
  margin-left: 10px;
  width: 100px;
  font-weight: bold;
  color: #333;
  border: 1px solid blue;
  background-color: #acffff;
}
</style>
