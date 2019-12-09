<template>
  <div class="stop-container">
    <div class="name">
      <p>{{ stopInfo.name }}</p>
    </div>
    <form action="/updatestop">
      <div class="form-group">
        <label :for="stopInfo.id">Revizori?</label>
        <input
          type="checkbox"
          name="controlersThere"
          v-bind:id="stopInfo.id"
          v-model="stopInfo.revizori"
          @change="$emit('newsUpdate', info = new News(new Date(), stopInfo.name, stopInfo.id, stopInfo.revizori))"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Stop",
  props: {
    stopInfo: Object
  },
  methods: {
    News(dateUpdated, name, id, revizori) {
      this.dateUpdated = dateUpdated;
      this.name = name;
      this.id = id;
      this.revizori = revizori;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.stop-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
  .name {
    padding: 10px 5px;
    margin-right: 10px;
    width: 120px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
