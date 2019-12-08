<template>
  <div class="stops-container">
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
      let newsArray = await NewsService.getNews();
      this.news = newsArray.reverse();
      this.stopsData.stopsIlidza = await StopsService.getStops("ilidza");
      this.stopsData.stopsBascarsija = await StopsService.getStops(
        "bascarsija"
      );
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
      search: ""
    };
  },
  methods: {
    handleSearchUpdate(searchFilter) {
      this.search = searchFilter;
    },
    async updateNews(news) {
      await NewsService.postNews(
        news.dateUpdated,
        news.id,
        news.name,
        news.revizori
        //this.news[news.length - 1].direction
      );
    },
    async changeDirection() {
      this.ilidza = !this.ilidza;
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
    },
    async handleNews(value) {
      await this.updateNews(value);
      let newsArray = await NewsService.getNews();
      this.news = newsArray.reverse();
      /*if (this.news.length > 4) {
        this.news.shift();
      }
      this.news.push(value);
      this.updateNews(value);*/
      if (this.ilidza) {
        //eslint-disable-next-line no-console
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

      //eslint-disable-next-line no-console
      //console.log(value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.stops-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
