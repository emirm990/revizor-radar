<template>
  <div v-if="news" class="news-container">
    <ul v-for="item in news" v-bind:key="item.date">
      <li>
        <p>
          <span>
            {{
            new Date(item.dateUpdated).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "medium",
            hour12: false
            })
            }}
          </span>
          - Stanica: {{ item.name }}
          {{ item.revizori ? " ima" : " nema" }} revizora. - {{ item.updatedBy || "anonymous"}}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "News",
  props: {
    news: Array
  }
};
</script>
<style lang="scss" scoped>
.news-container {
  flex-basis: 100%;
}
ul {
  list-style: none;
  padding-left: 0;
  flex-basis: 49%;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
}
</style>
