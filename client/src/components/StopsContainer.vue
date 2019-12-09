<template>
  <div class="stops-container">
    <div class="loader" v-bind:class="{loaderActive: loading}"></div>
    <Search @searchUpdate="handleSearchUpdate" />
    <div class="change-direction" @click="changeDirection">
      <p>Smijer:</p>
      <p v-if="ilidza">Ilidža - Baščaršija</p>
      <p v-else>Baščaršija - Ilidža</p>
    </div>
    <News v-bind:news="news" />
    <ul v-for="stop in filteredList" v-bind:key="stop.id">
      <Stop @newsUpdate="handleNews" :stopInfo="stop" />
    </ul>
  </div>
</template>

<script>
import Stop from "./Stop";
import StopsService from "../StopsService";
import NewsService from "../NewsService";
import News from "./News";
import Search from "./Search.vue";

export default {
  name: "StopsContainer",
  components: {
    Stop,
    News,
    Search
  },
  async created() {
    try {
      this.loading = true;
      let newsArray = await NewsService.getNews();
      this.news = newsArray.reverse();
      this.stopsData.stopsIlidza = await StopsService.getStops("ilidza");
      this.stopsData.stopsBascarsija = await StopsService.getStops(
        "bascarsija"
      );
      this.loading = false;
    } catch (err) {
      this.error = err.message;
    }
  },
  computed: {
    filteredList() {
      if (this.ilidza) {
        return this.stopsData.stopsIlidza.filter(stop => {
          return stop.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return this.stopsData.stopsBascarsija.filter(stop => {
          return stop.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  data() {
    return {
      ilidza: true,
      stopsData: {
        stopsIlidza: [],
        stopsBascarsija: []
      },
      news: [],
      search: "",
      loading: false
    };
  },
  props: {
    updatedBy: String
  },
  methods: {
    handleSearchUpdate(searchFilter) {
      this.search = searchFilter;
    },
    async updateNews(news) {
      this.loading = true;
      await NewsService.postNews(
        news.dateUpdated,
        news.id,
        news.name,
        news.revizori,
        this.updatedBy
        //this.news[news.length - 1].direction
      );
      this.loading = false;
    },
    async changeDirection() {
      this.ilidza = !this.ilidza;
      this.loading = true;
      try {
        if (this.ilidza) {
          this.stopsData.stopsIlidza = await StopsService.getStops("ilidza");
        } else {
          this.stopsData.stopsBascarsija = await StopsService.getStops(
            "bascarsija"
          );
        }
      } catch (err) {
        this.error = err.message;
      }
      this.loading = false;
    },
    async handleNews(value) {
      await this.updateNews(value);

      let newsArray = await NewsService.getNews();
      this.news = newsArray.reverse();
      if (this.ilidza) {
        await StopsService.updateStop(
          "ilidza",
          value.id,
          value.revizori,
          value.dateUpdated
        );
        this.stopsData.stopsIlidza.find(obj => {
          if (obj.id === value.id) {
            obj.dateUpdated = value.dateUpdated;
          }
        });
      } else {
        await StopsService.updateStop(
          "bascarsija",
          value.id,
          value.revizori,
          value.dateUpdated
        );
        this.stopsData.stopsBascarsija.find(obj => {
          if (obj.id === value.id) {
            obj.dateUpdated = value.dateUpdated;
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@keyframes loader {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.stops-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .loader {
    display: none;
    position: fixed;
    left: 50%;
    top: 50vh;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #acffff;
    animation-duration: 0.5s;
    animation-name: loader;
    animation-iteration-count: infinite;
    &::before {
      width: 25px;
      height: 25px;
      position: absolute;
      right: 100%;
      top: 25%;
      border-radius: 50%;
      content: "";
      display: inline-block;
      background-color: blue;
      animation-duration: 0.5s;
      animation-name: loader;
      animation-iteration-count: infinite;
      animation-delay: 0.1s;
    }
    &::after {
      width: 25px;
      height: 25px;
      position: absolute;
      left: 100%;
      top: 25%;
      border-radius: 50%;
      content: "";
      display: inline-block;
      background-color: blue;
      animation-delay: 0.1s;
      animation-duration: 0.5s;
      animation-name: loader;
      animation-iteration-count: infinite;
    }
  }
  .loaderActive {
    display: block;
  }
  ul {
    list-style: none;
    padding-left: 0;
    flex-basis: 49%;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
  }
  #search {
    margin: 0 auto;
  }
}
.change-direction {
  cursor: pointer;
  flex-basis: 100%;
}
</style>
