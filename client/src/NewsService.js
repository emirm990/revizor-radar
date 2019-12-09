import axios from "axios";

const url = "api/news";

class NewsService {
  static getNews() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(news => ({
            ...news,
            dateUpdated: new Date(news.dateUpdated)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  static postNews(dateUpdated, id, name, revizori, updatedBy) {
    return axios.post(url, {
      dateUpdated,
      id,
      name,
      revizori,
      updatedBy
    });
  }
}
export default NewsService;
