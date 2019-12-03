import axios from "axios";

const ilidzaUrl = "api/stopsilidza";
const bascarsijaUrl = "api/stopsbascarsija";

let url = ilidzaUrl;
class StopsService {
  //get stops
  static getStops(direction) {
    return new Promise(async (resolve, reject) => {
      try {
        if (direction == "ilidza") {
          url = ilidzaUrl;
        } else if (direction == "bascarsija") {
          url = bascarsijaUrl;
        }
        const res = await axios.get(url);
        const data = res.data;

        resolve(
          data.map(blog => ({
            ...blog,
            createdAt: new Date(blog.createdAt)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static updateStop(direction, id, revizori, dateUpdated) {
    if (direction == "ilidza") {
      url = ilidzaUrl;
    } else if (direction == "bascarsija") {
      url = bascarsijaUrl;
    }
    return axios.post(url, {
      id,
      revizori,
      dateUpdated
    });
  }
}
export default StopsService;
