<template>
  <div class="stops-container">
    <div class="change-direction" @click="changeDirection">
      <p>Smijer:</p>
      <p v-if="ilidza">Ilidža - Baščaršija</p>
      <p v-else>Baščaršija - Ilidža</p>
    </div>
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
            {{ item.revizori ? " ima" : " nema" }} revizora. {{ item.date }}
          </p>
        </li>
      </ul>
    </div>
    <ul
      v-for="stop in ilidza ? stopsData.stopsIlidza : stopsData.stopsBascarsija"
      v-bind:key="stop.id"
    >
      <Stop @newsUpdate="handleNews" :stopInfo="stop" />
    </ul>
  </div>
</template>

<script>
import Stop from "./Stop";
import StopsService from "../StopsService";
import NewsService from "../NewsService";

export default {
  name: "StopsContainer",
  components: {
    Stop
  },
  async created() {
    try {
      this.news = await NewsService.getNews();
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
  data() {
    return {
      ilidza: true,
      stopsData: {
        stopsIlidza: [],
        stopsBascarsija: []
      },
      news: []
    };
  },
  methods: {
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
      this.news = await NewsService.getNews();
      if (this.news.length > 4) {
        this.news.shift();
      }
      this.news.push(value);
      this.updateNews(value);
      if (this.ilidza) {
        //eslint-disable-next-line no-console
        console.log(value);
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
}
.change-direction {
  cursor: pointer;
  flex-basis: 100%;
}
.news-container {
  flex-basis: 100%;
}
</style>
