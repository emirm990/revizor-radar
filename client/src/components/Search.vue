<template>
  <input
    type="text"
    name="search"
    id="search"
    v-model="searchFilter"
    @input="$emit('searchUpdate', searchFilter)"
  />
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchFilter: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
input {
  padding: 10px 20px;
  width: 50%;
}
</style>
